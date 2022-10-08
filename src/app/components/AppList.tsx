import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';
import { appState } from '../state';
import { appTheme } from '../theme';
import { AppItem } from '../models';
import { AppSearchBar } from './AppSearchBar';
import { AppScrollView } from './AppScrollView';
import { AppListItem } from './AppListItem';

interface AppListProps<T extends AppItem> {
  /**
   * Items to display.
   */
  items: Array<T>;

  /**
   * Initial search string.
   */
  initialSearchString?: string;

  /**
   * Key of text to display when no items are available.
   */
  noItemsTextKey?: string;

  /**
   * Selected items.
   */
  selectedItems?: Array<T>;

  /**
   * Is scroll disabled for the list.
   */
  scrollDisabled?: boolean;

  /**
   * Display checkbox for items.
   */
  withCheckboxes?: boolean;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On select event handler.
   */
  onSelect?: (item: T) => void;

  /**
   * Search event handler.
   */
  onSearch?: (searchString: string) => void;

  /**
   * Refresh event handler.
   */
  onRefresh?: () => Promise<void>;
}

/**
 * App item list component.
 */
export function AppList<T extends AppItem>(props: AppListProps<T>) {
  const {
    items,
    initialSearchString = '',
    noItemsTextKey,
    selectedItems = [],
    style,
    scrollDisabled,
    withCheckboxes,
    onSelect,
    onSearch,
    onRefresh,
  } = props;

  const { t } = useTranslation();
  const isAppLoading = appState.selectors.isAppLoading(useAppSelector((state) => state.app));
  const [searchString, setSearchString] = useState(initialSearchString);

  function isItemSelected(item: AppItem) {
    return !!selectedItems.filter(({ id }) => item.id === id).length;
  }

  return (
    <View style={[styles.container, style]}>
      {onSearch && (
        <AppSearchBar
          style={styles.searchInput}
          value={searchString}
          placeholder={t('app.appList.searchPlaceholder')}
          onChangeValue={setSearchString}
          onSearch={onSearch}
        />
      )}

      {!items.length ? (
        !isAppLoading && <Text style={styles.noItems}>{noItemsTextKey && t(noItemsTextKey)}</Text>
      ) : (
        <AppScrollView
          style={styles.scrollView}
          isDisabled={scrollDisabled}
          onRefresh={onRefresh}
        >
          {items.map((item) => (
            <AppListItem
              withIcon
              key={item.id}
              item={item}
              selected={isItemSelected(item)}
              withCheckbox={withCheckboxes}
              onPress={onSelect}
            />
          ))}
        </AppScrollView>
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
  noItems: {
    marginTop: appTheme.gaps.medium,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
});
