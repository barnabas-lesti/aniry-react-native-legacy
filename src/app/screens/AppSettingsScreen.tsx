import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Divider } from 'react-native-paper';

import { AppButtonGroup, AppScreen, AppConfirmationDialog } from '../components';
import { appTheme } from '../theme';
import { appCollectionService, appCommonService, appSettingsService } from '../services';

export function AppSettingsScreen() {
  const { t } = useTranslation();
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
      appCommonService.pushNotificationKey('app.appSettingsScreen.data.restoreSuccessful');
    }
  }

  return (
    <AppScreen>
      <View style={styles.row}>
        <Text style={styles.title}>{t('app.appSettingsScreen.data.title')}</Text>
        <Text style={styles.description}>{t('app.appSettingsScreen.data.description')}</Text>
        <AppButtonGroup
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
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: appTheme.gaps.medium,
  },
  title: {
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 22,
    marginBottom: appTheme.gaps.small,
  },
  description: {
    fontSize: 14,
    lineHeight: 14,
    marginBottom: appTheme.gaps.small,
  },
});
