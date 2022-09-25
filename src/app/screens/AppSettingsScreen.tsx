import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppScreen } from '../components';
import { appTheme } from '../theme';
// import { appCollectionService } from '../services';

export function AppSettingsScreen() {
  const { t } = useTranslation();

  async function onExportButtonPress() {
    console.log('export');
    // console.log(await appStorageService.exportData());
  }

  async function onImportButtonPress() {
    console.log('import');
    // console.log(await appStorageService.importData(''));
  }

  return (
    <AppScreen>
      <View style={styles.row}>
        <Text style={styles.hintText}>{t('app.appSettingsHomeScreen.importExportTitle')}</Text>
        <AppButtonGroup
          buttons={[
            {
              label: t('app.appSettingsHomeScreen.importData'),
              type: 'danger',
              onPress: onImportButtonPress,
            },
            {
              label: t('app.appSettingsHomeScreen.exportData'),
              backgroundColor: appTheme.colors.settingsPrimary,
              onPress: onExportButtonPress,
            },
          ]}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hintText: {
    marginBottom: appTheme.gaps.small,
  },
  row: {
    marginBottom: appTheme.gaps.medium,
  },
});
