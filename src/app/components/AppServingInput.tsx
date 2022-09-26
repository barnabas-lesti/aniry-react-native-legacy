import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native';

import { AppServingUnit } from '../models';
import { appTheme } from '../theme';
import { AppNumberInput } from './AppNumberInput';
import { AppSelectInput } from './AppSelectInput';

interface AppServingInputProps {
  /**
   * Serving value.
   */
  value: number;

  /**
   * Serving unit.
   */
  unit: AppServingUnit;

  /**
   * Serving unit options.
   */
  unitOptions: Array<AppServingUnit>;

  /**
   * Validity flag.
   */
  isInvalid?: boolean;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On value change handler.
   */
  onChangeValue: (value: number) => void;

  /**
   * On unit change handler.
   */
  onChangeUnit: (unit: AppServingUnit) => void;
}

/**
 * App serving input component.
 */
export function AppServingInput(props: AppServingInputProps) {
  const { value, unit, unitOptions, isInvalid, style, onChangeValue, onChangeUnit } = props;
  const { t } = useTranslation();

  const options = unitOptions.map((unitOption) => ({
    label: t(`app.units.${unitOption}`),
    value: unitOption,
  }));

  return (
    <View style={[styles.container, style]}>
      <AppNumberInput
        style={styles.value}
        label={t('app.labels.serving')}
        value={value}
        isInvalid={isInvalid}
        onChangeValue={onChangeValue}
      />
      <AppSelectInput
        style={styles.unit}
        options={options}
        value={unit}
        onChangeValue={onChangeUnit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    marginRight: appTheme.gaps.small,
    flexGrow: 1,
  },
  unit: {
    minWidth: 70,
  },
});
