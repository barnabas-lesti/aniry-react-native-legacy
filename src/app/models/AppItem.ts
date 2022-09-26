import { AppCollectionItem } from './AppCollectionItem';
import { AppNutrients } from './AppNutrients';
import { AppServing } from './AppServing';

export interface AppItem extends AppCollectionItem {
  name: string;
  serving: AppServing;
  nutrients: AppNutrients;
}
