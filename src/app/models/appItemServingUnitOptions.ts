import { appItemServingUnits } from './appItemServingUnits';
import { AppSelectOption } from './AppSelectOption';

export const appServingUnitOptions: AppSelectOption[] = appItemServingUnits.map((unit) => ({
  value: unit,
  labelKey: `app.units.${unit}`,
}));
