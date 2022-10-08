import { AppItem } from './AppItem';
import { AppItemBase } from './AppItemBase';
import { AppNutrients } from './AppNutrients';
import { AppServing } from './AppServing';

interface AppItemProxyProps<T extends AppItem> {
  item: T;
  serving: AppServing;
}

export class AppItemProxy<T extends AppItem> extends AppItemBase implements AppItem {
  item: T;
  serving: AppServing;

  constructor({ item, serving }: AppItemProxyProps<T>) {
    super();

    this.item = item;
    this.serving = serving;
  }

  get id() {
    return this.item.id;
  }

  get name() {
    return this.item.name;
  }

  get icon() {
    return this.item.icon;
  }

  get color() {
    return this.item.color;
  }

  get calories(): number {
    const { calories, servings } = this.item;
    const { value } = servings?.filter(({ unit }) => unit === this.serving.unit)[0] || this.item.serving;
    return (calories / value) * this.serving.value;
  }

  get nutrients(): AppNutrients {
    const {
      nutrients: { carbs, protein, fat },
      servings,
    } = this.item;
    const { value } = servings?.filter(({ unit }) => unit === this.serving.unit)[0] || this.item.serving;
    return {
      carbs: (carbs / value) * this.serving.value,
      protein: (protein / value) * this.serving.value,
      fat: (fat / value) * this.serving.value,
    };
  }

  static getCaloriesFromItemProxies<T extends AppItem>(itemProxies: AppItemProxy<T>[]): number {
    return itemProxies.reduce((calories, itemProxy) => calories + itemProxy.calories, 0);
  }

  static getNutrientsFromItemProxies<T extends AppItem>(itemProxies: AppItemProxy<T>[]): AppNutrients {
    return itemProxies.reduce(
      (nutrients, itemProxy) => ({
        carbs: nutrients.carbs + itemProxy.nutrients.carbs,
        protein: nutrients.protein + itemProxy.nutrients.protein,
        fat: nutrients.fat + itemProxy.nutrients.fat,
      }),
      {
        carbs: 0,
        protein: 0,
        fat: 0,
      }
    );
  }

  static mapItemsToProxies<T extends AppItem>(items: T[], existingProxies: AppItemProxy<T>[] = []): AppItemProxy<T>[] {
    return [
      ...items.map((item) => {
        const existingProxy = existingProxies.filter(({ item: { id } }) => item.id === id)[0];
        return new AppItemProxy<T>({
          item,
          serving: existingProxy?.serving || item.serving,
        });
      }),
    ];
  }

  static mapProxiesToItems<T extends AppItem>(itemProxies: AppItemProxy<T>[]): T[] {
    return itemProxies.map(({ item }) => item);
  }
}
