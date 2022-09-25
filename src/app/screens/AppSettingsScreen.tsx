import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Divider } from 'react-native-paper';

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
        <Text style={styles.title}>{t('app.appSettingsScreen.data.title')}</Text>
        <Text style={styles.description}>{t('app.appSettingsScreen.data.description')}</Text>
        <AppButtonGroup
          buttons={[
            {
              label: t('app.appSettingsScreen.data.import'),
              type: 'danger',
              onPress: onImportButtonPress,
            },
            {
              label: t('app.appSettingsScreen.data.export'),
              backgroundColor: appTheme.colors.settingsPrimary,
              onPress: onExportButtonPress,
            },
          ]}
        />
      </View>
      <Divider />
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
