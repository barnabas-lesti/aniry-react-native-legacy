import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataTable } from 'react-native-paper';

import { appTheme } from '../theme';
import { AppItem } from '../models';
import { AppSearchBar } from './AppSearchBar';
import { AppLoader } from './AppLoader';

interface AppItemListProps<T extends AppItem> {
  /**
   * Items to display.
   */
  items: Array<T>;

  /**
   * Selected items.
   */
  selectedItems?: Array<T>;

  /**
   * Text to display when no items are available.
   */
  noItemsText?: string;

  /**
   * Loading state indicator.
   */
  isLoading?: boolean;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Item select event handler.
   */
  onSelectItem?: (item: T) => void;

  /**
   * Search event handler.
   */
  onSearch?: (searchString: string) => void;
}

/**
 * App item list component.
 */
export function AppItemList<T extends AppItem>(props: AppItemListProps<T>) {
  const { items, selectedItems = [], noItemsText, isLoading, style, onSelectItem, onSearch } = props;

  const { t } = useTranslation();

  function isItemSelected(item: AppItem) {
    return !!selectedItems.filter(({ id }) => item.id === id).length;
  }

  return (
    <View style={[styles.container, style]}>
      {onSearch && (
        <AppSearchBar
          style={styles.searchInput}
          placeholder={t('app.appItemList.searchPlaceholder')}
          onSearch={onSearch}
        />
      )}

      {isLoading ? (
        <AppLoader style={styles.loader} />
      ) : (
        <>
          {!items.length ? (
            <Text style={styles.noItems}>{noItemsText || t('app.appItemList.noItems')}</Text>
          ) : (
            <ScrollView style={styles.scrollView}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>{t('app.labels.name')}</DataTable.Title>
                  <DataTable.Title numeric>{t('app.labels.calories')}</DataTable.Title>
                  <DataTable.Title numeric>{t('app.labels.serving')}</DataTable.Title>
                </DataTable.Header>

                {items.map((item) => {
                  const { id, name, nutrients, serving } = item;
                  return (
                    <DataTable.Row
                      style={[isItemSelected(item) && styles.selectedRow]}
                      key={id}
                      onPress={() => onSelectItem && onSelectItem(item)}
                    >
                      <DataTable.Cell>{name}</DataTable.Cell>
                      <DataTable.Cell numeric>{`${nutrients.calories} ${t('app.units.kcal')}`}</DataTable.Cell>
                      <DataTable.Cell numeric>{`${serving.value} ${serving.unit}`}</DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </ScrollView>
          )}
        </>
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
  scrollView: {
    flex: 1,
  },
  selectedRow: {
    backgroundColor: appTheme.colors.tableRowSelected,
  },
});
