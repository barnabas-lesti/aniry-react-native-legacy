import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appStyles } from '../theme';
import { AppItem } from '../models';
import { AppButtonGroup } from './AppButtonGroup';
import { AppDialog } from './AppDialog';
import { AppList } from './AppList';

interface AppListItemOrderEditorDialogProps<T extends AppItem> {
  /**
   * Items to edit.
   */
  items: T[];

  /**
   * Primary color to use.
   */
  primaryColor: string;

  /**
   * Confirmation event handler.
   */
  onSave: (items: T[]) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;
}

/**
 * List item order editor dialog.
 */
export function AppListItemOrderEditorDialog<T extends AppItem>(props: AppListItemOrderEditorDialogProps<T>) {
  const { items, primaryColor, onSave, onDiscard } = props;

  const { t } = useTranslation();
  const [localItems, setLocalItems] = useState(items);

  return (
    <AppDialog
      onDismiss={onDiscard}
      large
    >
      <View style={appStyles.section}>
        <AppButtonGroup
          style={appStyles.sectionRow}
          buttons={[
            {
              label: t('app.labels.discard'),
              type: 'secondary',
              textColor: primaryColor,
              compact: true,
              onPress: onDiscard,
            },
            {
              label: t('app.labels.save'),
              backgroundColor: primaryColor,
              compact: true,
              onPress: () => onSave(localItems),
            },
          ]}
        />
      </View>

      <View style={[appStyles.section, appStyles.flex]}>
        <AppList
          draggable
          style={appStyles.sectionRow}
          items={localItems}
          setItems={setLocalItems}
        />
      </View>
    </AppDialog>
  );
}
