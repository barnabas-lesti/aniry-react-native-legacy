import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppCollectionItem } from '../models';

const appCollections = ['ingredients', 'recipes'] as const;

type AppCollection = typeof appCollections[number];

type AppCollections = {
  [key in AppCollection]?: any;
};

class AppCollectionService {
  private readonly REQUEST_DELAY = 0;
  private cache: AppCollections = {};

  /**
   * Loads all items from the given collection.
   * @param collection Name of the collection.
   * @returns List of items.
   */
  async getAll<T extends AppCollectionItem>(collection: AppCollection): Promise<T[]> {
    await this._delayRequest();

    const cachedItems: Array<T> = this.cache[collection];
    if (cachedItems) return cachedItems;

    const jsonString = await AsyncStorage.getItem(collection);
    const items: Array<T> = jsonString != null ? JSON.parse(jsonString) : [];
    this.cache[collection] = items;
    return items;
  }

  /**
   * Returns a single item or null based on the given ID.
   * @param collection Name of the collection.
   * @param id ID of the item.
   * @returns Item of null.
   */
  async getOneById<T extends AppCollectionItem>(collection: AppCollection, id: string): Promise<T | null> {
    return (await this.getAll<T>(collection)).filter((item) => item.id === id)[0] || null;
  }

  /**
   * Saves the given item in the collection.
   * Creates a new item in the list if item ID is not found.
   * Updates an existing item if item ID is found.
   * @param collection Name of the collection.
   * @param item Item to save in storage.
   * @returns The stored item.
   */
  async saveOne<T extends AppCollectionItem>(collection: AppCollection, item: T): Promise<T> {
    const items = await this.getAll<T>(collection);

    if (item.id) {
      const indexOfItem = items.findIndex(({ id }) => id === item.id);
      if (indexOfItem !== -1) {
        items[indexOfItem] = item;
        await this._storeCollection<T>(collection, items);
        return item;
      }
    }

    const newItem = { ...item, id: item.id || uuid() };
    await this._storeCollection<T>(collection, [...items, newItem]);
    return newItem;
  }

  /**
   * Removes one item from the collection.
   * @param collection Name of the collection.
   * @param item Item to remove.
   */
  async deleteOne<T extends AppCollectionItem>(collection: AppCollection, item: T): Promise<void> {
    await this.deleteOneById(collection, item.id);
  }

  /**
   * Removes one item from the collection based on the provided ID.
   * @param collection Name of the collection.
   * @param id ID of the item to remove.
   */
  async deleteOneById<T extends AppCollectionItem>(collection: AppCollection, id: string): Promise<void> {
    const items = await this.getAll<T>(collection);
    const filteredItems = items.filter((item) => item.id !== id);

    await this._storeCollection<T>(collection, filteredItems);
  }

  /**
   * Exports all collection data.
   * @returns App collection data.
   */
  async getCollections(): Promise<AppCollections> {
    return await appCollections.reduce(async (data, collection) => {
      return { ...(await data), [collection]: await this.getAll(collection) };
    }, {});
  }

  /**
   * Updates all collections based on the provided data.
   * @param collections Collection data.
   */
  async setCollections(collections: AppCollections): Promise<void> {
    Promise.all(
      Object.keys(collections).map(async (collection) => {
        await this._storeCollection<AppCollectionItem>(
          collection as AppCollection,
          collections[collection as AppCollection]
        );
      })
    );
  }

  private async _storeCollection<T extends AppCollectionItem>(
    collection: AppCollection,
    items: Array<T>
  ): Promise<void> {
    await this._delayRequest();

    this.cache[collection] = items;
    await AsyncStorage.setItem(collection, JSON.stringify(items));
  }

  private async _delayRequest() {
    return new Promise((resolve) => setTimeout(resolve, this.REQUEST_DELAY));
  }
}

/**
 * Application collection storage service.
 */
export const appCollectionService = new AppCollectionService();
