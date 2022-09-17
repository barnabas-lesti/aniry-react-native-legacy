import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppStorableItem {
  id: string;
}

class AppStorageService {
  /**
   * Saves the given item in the given collection.
   * Creates a new item in the list if item id is not found.
   * Updates an existing item if item id is found.
   * @param collection Name of the collection.
   * @param item Item to save in storage.
   * @returns The stored item.
   */
  async saveOne<T extends AppStorableItem>(collection: string, item: T) {
    const storedItems = await this.fetchMany<T>(collection);

    if (item.id) {
      const indexOfItem = storedItems.findIndex((storedItem) => storedItem.id === item.id);
      if (indexOfItem !== -1) {
        storedItems[indexOfItem] = item;
      } else {
        storedItems.push(item);
      }
    } else {
      item.id = uuid();
      storedItems.push(item);
    }

    await AsyncStorage.setItem(collection, JSON.stringify(storedItems));

    return item;
  }

  /**
   * Fetches items from the storage based on the provided collection.
   * @param collection Name of the collection.
   * @returns Array of items.
   */
  async fetchMany<T extends AppStorableItem>(collection: string) {
    const jsonString = await AsyncStorage.getItem(collection);
    const items: Array<T> = jsonString != null ? JSON.parse(jsonString) : [];
    return items;
  }

  /**
   * Removes one item from the collection based on the provided id.
   * @param collection Name of the collection.
   * @param id Id of the item to remove.
   */
  async deleteOneById<T extends AppStorableItem>(collection: string, id: string) {
    const storedItems = await this.fetchMany<T>(collection);
    const filteredItems = storedItems.filter((ingredient) => ingredient.id !== id);

    await AsyncStorage.setItem(collection, JSON.stringify(filteredItems));
  }
}

/**
 * Application storage service.
 */
export const appStorageService = new AppStorageService();
