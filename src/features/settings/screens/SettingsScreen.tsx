import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Divider } from 'react-native-paper';

import { AppButtonGroup, AppScreen, AppConfirmationDialog } from 'app/components';
import { appStyles, appTheme } from 'app/theme';
import { appCollectionService } from 'app/services';
import { useAppDispatch } from 'app/store/hooks';
import { appState } from 'app/state';
import { settingsService } from '../services';

export function SettingsScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [stagedImportData, setStagedImportData] = useState<any | null>(null);

  async function onExportButtonPress() {
    await settingsService.exportData();
  }

  async function onRestoreButtonPress() {
    setStagedImportData(await settingsService.importData());
  }

  function onRestoreCancel() {
    setStagedImportData(null);
  }

  async function onRestoreConfirmation() {
    if (stagedImportData) {
      await appCollectionService.setCollections(stagedImportData.collections);
      setStagedImportData(null);
      dispatch(
        appState.actions.showNotification({
          textKey: 'settings.settingsScreen.data.restoreSuccessful',
        })
      );
    }
  }

  return (
    <AppScreen>
      <View style={appStyles.section}>
        <Text style={appStyles.sectionTitle}>{t('settings.settingsScreen.data.title')}</Text>
        <Text style={appStyles.sectionDescription}>{t('settings.settingsScreen.data.description')}</Text>
        <AppButtonGroup
          style={appStyles.sectionRow}
          buttons={[
            {
              label: t('settings.settingsScreen.data.export'),
              backgroundColor: appTheme.colors.settingsPrimary,
              onPress: onExportButtonPress,
            },
            {
              label: t('settings.settingsScreen.data.restore'),
              type: 'danger',
              onPress: onRestoreButtonPress,
            },
          ]}
        />
      </View>
      <Divider />

      {!!stagedImportData && (
        <AppConfirmationDialog
          text={t('settings.settingsScreen.data.restoreConfirmation')}
          onConfirmation={onRestoreConfirmation}
          onCancel={onRestoreCancel}
        />
      )}
    </AppScreen>
  );
}
