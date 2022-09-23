import { AppItemNutrients } from './AppItemNutrients';
import { AppItemServing } from './AppItemServing';

export interface AppItem {
  id: string;
  name: string;
  serving: AppItemServing;
  nutrients: AppItemNutrients;
}
