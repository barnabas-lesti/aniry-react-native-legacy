import { AppItem } from './AppItem';

export class AppItemBase {
  static serialize<T extends AppItem>(itemInstance: T): T {
    return JSON.parse(JSON.stringify(itemInstance));
  }

  /**
   * Sorts the items by their name property.
   * @param items Items to sort.
   * @returns Sorted items array.
   */
  static sortByName<T extends AppItem>(items: T[]): T[] {
    return [
      ...items.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }),
    ];
  }

  static validateName(value: string): boolean {
    return !!value;
  }

  static validateServingValue(value: number): boolean {
    return value > 0;
  }

  serialize<T extends AppItem>(): T {
    return AppItemBase.serialize<T>(this as unknown as T);
  }
}
