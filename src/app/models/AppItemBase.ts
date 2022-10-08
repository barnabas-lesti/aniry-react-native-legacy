import { AppItem } from './AppItem';

export class AppItemBase {
  static serialize<T extends AppItem>(itemInstance: T): T {
    return JSON.parse(JSON.stringify(itemInstance));
  }

  static validateName(value: string): boolean {
    return !!value;
  }

  static validateServingValue(value: number): boolean {
    return value > 0;
  }

  static isStringInName(searchString: string, name: string) {
    return (
      AppItemBase.normalizeString(name)
        .toLowerCase()
        .indexOf(AppItemBase.normalizeString(searchString).toLowerCase()) !== -1
    );
  }

  static normalizeString(value: string): string {
    return value
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  serialize<T extends AppItem>(): T {
    return AppItemBase.serialize<T>(this as unknown as T);
  }
}
