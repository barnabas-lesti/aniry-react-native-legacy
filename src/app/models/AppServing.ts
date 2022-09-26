import { AppServingUnit } from './AppServingUnit';

type AppServingProps = AppServingUnit | { unit: AppServingUnit; value?: number };

export class AppServing {
  unit: AppServingUnit;
  value: number;

  constructor(props: AppServingProps) {
    if (typeof props === 'string') {
      this.unit = props;
      this.value = 0;
    } else {
      this.unit = props.unit;
      this.value = props.value || 0;
    }
  }
}
