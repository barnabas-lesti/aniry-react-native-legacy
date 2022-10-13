import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Divider } from 'react-native-paper';

import { AppButtonGroup, AppLayoutScreen, AppConfirmationDialog } from '../components';
import { appStyles, appTheme } from '../theme';
import { appCollectionService, appSettingsService } from '../services';
import { useAppDispatch } from '../store/hooks';
import { appState } from '../state';

export function AppSettingsScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [stagedImportData, setStagedImportData] = useState<any | null>(null);

  async function onExportButtonPress() {
    await appSettingsService.exportData();
  }

  async function onRestoreButtonPress() {
    setStagedImportData(await appSettingsService.importData());
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
          textKey: 'app.appSettingsScreen.data.restoreSuccessful',
        })
      );
    }
  }

  return (
    <AppLayoutScreen titleKey="settings.settingsScreen.title">
      <View style={appStyles.section}>
        <Text style={appStyles.sectionTitle}>{t('app.appSettingsScreen.data.title')}</Text>
        <Text style={appStyles.sectionDescription}>{t('app.appSettingsScreen.data.description')}</Text>
        <AppButtonGroup
          style={appStyles.sectionRow}
          buttons={[
            {
              label: t('app.appSettingsScreen.data.export'),
              backgroundColor: appTheme.colors.settingsPrimary,
              onPress: onExportButtonPress,
            },
            {
              label: t('app.appSettingsScreen.data.restore'),
              type: 'danger',
              onPress: onRestoreButtonPress,
            },
          ]}
        />
      </View>
      <Divider />

      {!!stagedImportData && (
        <AppConfirmationDialog
          text={t('app.appSettingsScreen.data.restoreConfirmation')}
          onConfirmation={onRestoreConfirmation}
          onCancel={onRestoreCancel}
        />
      )}
    </AppLayoutScreen>
  );
}
