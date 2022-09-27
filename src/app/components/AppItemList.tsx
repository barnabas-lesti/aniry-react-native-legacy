import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { appTheme } from '../theme';
import { AppItem } from '../models';
import { AppSearchBar } from './AppSearchBar';
import { AppScrollView } from './AppScrollView';

interface AppItemListProps<T extends AppItem> {
  /**
   * Items to display.
   */
  itemInstances: Array<T>;

  /**
   * Initial search string.
   */
  initialSearchString?: string;

  /**
   * Selected items.
   */
  selectedItems?: Array<T>;

  /**
   * Is scroll disabled for the table.
   */
  isScrollDisabled?: boolean;

  /**
   * Display calories summary.
   */
  isCaloriesSummaryVisible?: boolean;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * itemInstance select event handler.
   */
  onSelectItem?: (itemInstance: T) => void;

  /**
   * Search event handler.
   */
  onSearch?: (searchString: string) => Promise<any>;
}

/**
 * App itemInstance list component.
 */
export function AppItemList<T extends AppItem>(props: AppItemListProps<T>) {
  const {
    itemInstances,
    initialSearchString = '',
    selectedItems = [],
    isScrollDisabled,
    style,
    isCaloriesSummaryVisible,
    onSelectItem,
    onSearch,
  } = props;

  const { t } = useTranslation();
  const [searchString, setSearchString] = useState(initialSearchString);

  function isItemSelected(itemInstance: AppItem) {
    return !!selectedItems.filter(({ id }) => itemInstance.id === id).length;
  }

  function calculateTotalCalories(): number {
    return itemInstances.reduce((total, itemInstance) => total + itemInstance.nutrients.calories, 0);
  }

  return (
    <View style={[styles.container, style]}>
      {onSearch && (
        <AppSearchBar
          style={styles.searchInput}
          value={searchString}
          placeholder={t('app.appItemList.searchPlaceholder')}
          onChangeValue={setSearchString}
          onSearch={onSearch}
        />
      )}

      {!!itemInstances.length && (
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
            <DataTable.Title numeric>{t('app.labels.calories')}</DataTable.Title>
          </DataTable.Header>

          <AppScrollView
            style={styles.scrollView}
            isDisabled={isScrollDisabled}
            onRefresh={onSearch && (async () => await onSearch(searchString))}
          >
            {itemInstances.map((itemInstance) => {
              const { id, name, nutrients, serving } = itemInstance;
              return (
                <DataTable.Row
                  style={[isItemSelected(itemInstance) && styles.selectedRow]}
                  key={id}
                  onPress={() => onSelectItem && onSelectItem(itemInstance)}
                >
                  <DataTable.Cell>{name}</DataTable.Cell>
                  <DataTable.Cell numeric>{`${serving.value} ${serving.unit}`}</DataTable.Cell>
                  <DataTable.Cell numeric>{`${nutrients.calories.toFixed()} ${t('app.units.kcal')}`}</DataTable.Cell>
                </DataTable.Row>
              );
            })}

            {isCaloriesSummaryVisible && (
              <DataTable.Row>
                <DataTable.Cell textStyle={styles.totalCaloriesText}>{t('app.labels.total')}</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell
                  numeric
                  textStyle={styles.totalCaloriesText}
                >{`${calculateTotalCalories().toFixed()} ${t('app.units.kcal')}`}</DataTable.Cell>
              </DataTable.Row>
            )}
          </AppScrollView>
        </DataTable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    marginBottom: appTheme.gaps.small,
  },
  loader: {
    marginTop: appTheme.gaps.medium,
  },
  noItems: {
    marginTop: appTheme.gaps.medium,
    textAlign: 'center',
  },
  table: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  selectedRow: {
    backgroundColor: appTheme.colors.tableRowSelected,
  },
  totalCaloriesText: {
    fontWeight: 'bold',
  },
});
