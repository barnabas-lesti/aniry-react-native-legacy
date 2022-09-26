import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native';

import { AppServing, AppServingUnit } from '../models';
import { appTheme } from '../theme';
import { AppNumberInput } from './AppNumberInput';
import { AppSelectInput } from './AppSelectInput';

interface AppServingInputProps {
  /**
   * Serving object.
   */
  serving: AppServing;

  /**
   * Serving unit options.
   */
  unitOptions: Array<AppServingUnit>;

  /**
   * Label override.
   */
  label?: string;

  /**
   * Validity flag.
   */
  isInvalid?: boolean;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On serving change handler.
   */
  onChangeServing: (serving: AppServing) => void;
}

/**
 * App serving input component.
 */
export function AppServingInput(props: AppServingInputProps) {
  const { serving, unitOptions, label, isInvalid, style, onChangeServing } = props;
  const { t } = useTranslation();

  const options = unitOptions.map((unitOption) => ({
    label: t(`app.units.${unitOption}`),
    value: unitOption,
  }));

  return (
    <View style={[styles.container, style]}>
      <AppNumberInput
        style={styles.value}
        label={label || t('app.labels.serving')}
        value={serving.value}
        isInvalid={isInvalid}
        onChangeValue={(value: number) => onChangeServing({ value, unit: serving.unit })}
      />
      <AppSelectInput
        style={styles.unit}
        options={options}
        value={serving.unit}
        onChangeValue={(unit: AppServingUnit) => onChangeServing({ value: serving.value, unit })}
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
