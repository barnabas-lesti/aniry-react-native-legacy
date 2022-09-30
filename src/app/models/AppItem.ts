import { AppCollectionItem } from './AppCollectionItem';
import { AppNutrients } from './AppNutrients';
import { AppServing } from './AppServing';

export interface AppItem extends AppCollectionItem {
  name: string;
  nutrients: AppNutrients;
  serving: AppServing;
  color: string;
  icon: string;
  servings?: AppServing[];
}
