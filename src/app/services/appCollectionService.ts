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

  /**
   * Loads all items from the given collection.
   * @param collection Name of the collection.
   * @returns List of items.
   */
  async getAll<T extends AppCollectionItem>(collection: AppCollection): Promise<T[]> {
    const jsonString = await AsyncStorage.getItem(collection);
    const items: Array<T> = jsonString != null ? JSON.parse(jsonString) : [];
    return items;
  }

  /**
   * Creates the given item in the collection.
   * @param collection Name of the collection.
   * @param item Item to save in storage.
   * @returns The stored item.
   */
  async createOne<T extends AppCollectionItem>(collection: AppCollection, item: T): Promise<T> {
    const items = await this.getAll<T>(collection);
    const newItem = { ...item, id: item.id || uuid() };
    await this._storeCollection<T>(collection, [...items, newItem]);
    return newItem;
  }

  /**
   * Updates the given item in the collection.
   * Creates a new item in the list if item ID is not found.
   * @param collection Name of the collection.
   * @param item Item to save in storage.
   * @returns The stored item.
   */
  async updateOne<T extends AppCollectionItem>(collection: AppCollection, item: T): Promise<T> {
    const items = await this.getAll<T>(collection);

    if (item.id && items.find(({ id }) => id === item.id)) {
      await this._storeCollection<T>(collection, [
        ...items.map((existingItem) => (existingItem.id === item.id ? item : existingItem)),
      ]);
      return item;
    }

    return await this.createOne(collection, item);
  }

  /**
   * Updates multiple items in the collection.
   * @param collection Name of the collection.
   * @param itemsToUpdate Item to update in the collection.
   */
  async updateMany<T extends AppCollectionItem>(collection: AppCollection, itemsToUpdate: T[]): Promise<void> {
    const existingItems = await this.getAll<T>(collection);
    const updatedItems = existingItems.map(
      (existingItem) => itemsToUpdate.filter((itemToUpdate) => itemToUpdate.id === existingItem.id)[0] || existingItem
    );
    await this._storeCollection(collection, updatedItems);
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

  /**
   * Stores the given items in the collection.
   * @param collection Name of the collection.
   * @param items Items to store.
   */
  private async _storeCollection<T extends AppCollectionItem>(
    collection: AppCollection,
    items: Array<T>
  ): Promise<void> {
    await AsyncStorage.setItem(collection, JSON.stringify(items));
  }
}

/**
 * Application collection storage service.
 */
export const appCollectionService = new AppCollectionService();
