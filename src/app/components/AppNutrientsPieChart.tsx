import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, ViewStyle, View, Text, useWindowDimensions } from 'react-native';
import { VictoryPie } from 'victory-native';

import { AppNutrients } from '../models';
import { appTheme } from '../theme';
import { AppIcon } from './AppIcon';

interface AppNutrientsPieChartProps {
  /**
   * Nutrients data to display.
   */
  nutrients: AppNutrients;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Application loader component.
 */
export function AppNutrientsPieChart(props: AppNutrientsPieChartProps) {
  const {
    nutrients: { carbs, protein, fat },
    style,
  } = props;
  const {
    colors: { nutrients: nutrientColors },
  } = appTheme;

  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const chartSize = (width / 4) * 3;
  const chartData = [
    {
      y: carbs,
      fill: nutrientColors.carbs,
    },
    {
      y: protein,
      fill: nutrientColors.protein,
    },
    {
      y: fat,
      fill: nutrientColors.fat,
    },
  ];
  const tableData = [
    {
      color: nutrientColors.carbs,
      label: t('app.labels.carbs'),
      value: carbs.toFixed(),
    },
    {
      color: nutrientColors.protein,
      label: t('app.labels.protein'),
      value: protein.toFixed(),
    },
    {
      color: nutrientColors.fat,
      label: t('app.labels.fat'),
      value: fat.toFixed(),
    },
  ];

  function canRenderChart() {
    return !!chartSize && !!(carbs || protein || fat);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.legend}>
        {tableData.map(({ color, label, value }) => (
          <View
            style={styles.legendItem}
            key={label}
          >
            <AppIcon
              icon={appTheme.icons.circle}
              color={color}
              size={14}
            />
            <Text style={styles.legendItemText}>{`${label} (${value} ${t('app.units.g')})`}</Text>
          </View>
        ))}
      </View>

      {canRenderChart() && (
        <VictoryPie
          data={chartData}
          width={chartSize}
          height={chartSize}
          padding={0}
          labels={() => ''}
          style={{
            data: { fill: ({ datum }) => datum.fill },
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legend: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: appTheme.gaps.medium,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  legendItemText: {
    fontSize: 12,
  },
});
