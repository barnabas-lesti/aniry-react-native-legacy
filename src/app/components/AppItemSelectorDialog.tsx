import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appTheme } from '../theme';
import { AppItem } from '../models';
import { AppButtonGroup } from './AppButtonGroup';
import { AppDialog } from './AppDialog';
import { AppItemList } from './AppItemList';

interface AppItemSelectorDialogProps<T extends AppItem> {
  /**
   * Items to display.
   */
  itemInstances: Array<T>;

  /**
   * Selected item instances.
   */
  selectedItemInstances: T[];

  /**
   * Initial search string.
   */
  initialSearchString?: string;

  /**
   * Key of text to display when no items are available.
   */
  noItemsTextKey?: string;

  /**
   * Confirmation event handler.
   */
  onSave: (itemInstances: T[]) => void;

  /**
   * Search event handler.
   */
  onSearch: (searchString: string) => Promise<void>;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;
}

/**
 * Item selector dialog component.
 */
export function AppItemSelectorDialog<T extends AppItem>(props: AppItemSelectorDialogProps<T>) {
  const { itemInstances, initialSearchString, noItemsTextKey, selectedItemInstances, onSave, onSearch, onDiscard } =
    props;

  const { t } = useTranslation();
  const [localSelectedItems, setLocalSelectedItems] = useState(selectedItemInstances);

  function onSelect(item: T) {
    if (isItemInSelectedItems(item)) {
      removeItemFromSelectedItems(item);
    } else {
      addItemToSelectedItems(item);
    }
  }

  function isItemInSelectedItems(item: T) {
    return !!localSelectedItems.filter(({ id }) => id === item.id).length;
  }

  function addItemToSelectedItems(item: T) {
    setLocalSelectedItems([...localSelectedItems, item]);
  }

  function removeItemFromSelectedItems(item: T) {
    setLocalSelectedItems([...localSelectedItems.filter(({ id }) => item.id !== id)]);
  }

  return (
    <AppDialog
      onDismiss={onDiscard}
      contentStyle={styles.dialogContent}
    >
      <AppButtonGroup
        style={styles.buttonGroup}
        buttons={[
          {
            label: t('app.labels.discard'),
            type: 'secondary',
            textColor: appTheme.colors.ingredientPrimary,
            onPress: onDiscard,
          },
          {
            label: t('app.labels.save'),
            backgroundColor: appTheme.colors.ingredientPrimary,
            onPress: () => onSave(localSelectedItems),
          },
        ]}
      />

      <AppItemList
        itemInstances={itemInstances}
        initialSearchString={initialSearchString}
        noItemsTextKey={noItemsTextKey}
        selectedItemInstances={localSelectedItems}
        onSearch={onSearch}
        onSelect={onSelect}
      />
    </AppDialog>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginBottom: appTheme.gaps.medium,
  },
  dialogContent: {
    height: '95%',
  },
});
