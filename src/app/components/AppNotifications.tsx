import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Snackbar } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { appState } from '../state';

const NOTIFICATION_DURATION = 3000;

/**
 * Application notification display.
 */
export function AppNotifications() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.app);

  return (
    <Snackbar
      style={styles.snackbar}
      visible={!!notification}
      onDismiss={() => dispatch(appState.actions.clearNotification())}
      duration={NOTIFICATION_DURATION}
    >
      {notification && notification.textKey && t(notification.textKey)}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    bottom: 50,
  },
});
