import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Snackbar } from 'react-native-paper';

import { appNotificationService } from '../services';

interface AppNotificationProps {
  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Application notification display.
 */
export function AppNotification(props: AppNotificationProps) {
  const { style } = props;
  const duration = appNotificationService.NOTIFICATION_DURATION;

  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [notificationKey, setNotificationKey] = useState('');

  appNotificationService.onNotification((newNotificationKey) => {
    setNotificationKey(newNotificationKey);
    setIsVisible(true);
  });

  function onDismiss() {
    setIsVisible(false);
  }

  return (
    <Snackbar
      style={[styles.snackbar, style]}
      visible={isVisible}
      onDismiss={onDismiss}
      duration={duration}
    >
      {t(notificationKey)}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    bottom: 50,
  },
});
