import { AppItem } from './AppItem';
import { AppNutrients } from './AppNutrients';
import { AppServing } from './AppServing';

interface AppItemProxyProps<T extends AppItem> {
  item: T;
  serving: AppServing;
}

export class AppItemProxy<T extends AppItem> implements AppItem {
  item: T;
  serving: AppServing;

  constructor({ item, serving }: AppItemProxyProps<T>) {
    this.item = item;
    this.serving = serving;
  }

  get id() {
    return this.item.id;
  }

  get name() {
    return this.item.name;
  }

  get nutrients(): AppNutrients {
    const {
      nutrients: { calories, carbs, protein, fat },
      servings,
    } = this.item;
    const { value } = servings?.filter(({ unit }) => unit === this.serving.unit)[0] || this.item.serving;
    return {
      calories: (calories / value) * this.serving.value,
      carbs: (carbs / value) * this.serving.value,
      protein: (protein / value) * this.serving.value,
      fat: (fat / value) * this.serving.value,
    };
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
}
