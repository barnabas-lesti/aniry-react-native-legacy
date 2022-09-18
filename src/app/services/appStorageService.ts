import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppStorableItem {
  id: string;
}

interface AppCache {
  [key: string]: any;
}

class AppStorageService {
  private cache: AppCache = {};

  async getAll<T extends AppStorableItem>(collection: string) {
    const cachedCollection: Array<T> = this.cache[collection];

    if (cachedCollection) {
      return cachedCollection;
    }

    await this._debugDelayRequest();

    const jsonString = await AsyncStorage.getItem(collection);
    const items: Array<T> = jsonString != null ? JSON.parse(jsonString) : [];
    this.cache[collection] = items;

    return items;
  }

  /**
   * Saves the given item in the given collection.
   * Creates a new item in the list if item id is not found.
   * Updates an existing item if item id is found.
   * @param collection Name of the collection.
   * @param item Item to save in storage.
   * @returns The stored item.
   */
  async saveOne<T extends AppStorableItem>(collection: string, item: T) {
    const items = await this.getAll<T>(collection);

    if (item.id) {
      const indexOfItem = items.findIndex(({ id }) => id === item.id);
      if (indexOfItem !== -1) {
        items[indexOfItem] = item;
      } else {
        items.push(item);
      }
    } else {
      item.id = uuid();
      items.push(item);
    }

    await this._storeCollection<T>(collection, items);

    return item;
  }

  async deleteOne<T extends AppStorableItem>(collection: string, item: T) {
    return this.deleteOneById<T>(collection, item.id);
  }

  /**
   * Removes one item from the collection based on the provided id.
   * @param collection Name of the collection.
   * @param id Id of the item to remove.
   */
  async deleteOneById<T extends AppStorableItem>(collection: string, itemId: string) {
    const items = await this.getAll<T>(collection);
    const filteredItems = items.filter(({ id }) => id !== itemId);

    await this._storeCollection<T>(collection, filteredItems);
  }

  private async _storeCollection<T extends AppStorableItem>(collection: string, items: Array<T>) {
    await this._debugDelayRequest();

    this.cache[collection] = items;
    await AsyncStorage.setItem(collection, JSON.stringify(items));
    return items;
  }

  private async _debugDelayRequest() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}

/**
 * Application storage service.
 */
export const appStorageService = new AppStorageService();
