import { AppCollectionItem } from './AppCollectionItem';
import { AppItemNutrients } from './AppItemNutrients';
import { AppItemServing } from './AppItemServing';

export interface AppItem extends AppCollectionItem {
  name: string;
  serving: AppItemServing;
  nutrients: AppItemNutrients;
}
