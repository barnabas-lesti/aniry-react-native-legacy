import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { appTheme } from '../theme';
import { AppScreenOptionsGroup } from '../models';
import { AppIcon } from './AppIcon';

interface AppNavbarBottomProps {
  groups: AppScreenOptionsGroup[];
  activeScreenName: string | null;
}

export function AppNavbarBottom(props: AppNavbarBottomProps) {
  const { groups, activeScreenName } = props;

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation();

  function isTabActive(groupName: string): boolean {
    return (activeScreenName || '').toLowerCase().includes(groupName.toLowerCase());
  }

  return (
    <Appbar
      style={styles.appbar}
      safeAreaInsets={{ bottom }}
    >
      {groups.map((group) => (
        <TouchableOpacity
          style={styles.tabWrapper}
          key={group.name}
          onPress={() => navigation.navigate(group.screens[0].name as never)}
        >
          <AppIcon
            icon={group.icon}
            color={isTabActive(group.name) ? group.color : appTheme.colors.inactive}
            size={26}
          />
          <Text style={styles.tabTitle}>{t(group.screens[0].titleKey)}</Text>
        </TouchableOpacity>
      ))}
    </Appbar>
  );
}

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: appTheme.colors.navbarBackground,
    height: 85,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    lineHeight: 10,
    fontSize: 10,
    color: appTheme.colors.inactive,
  },
});
