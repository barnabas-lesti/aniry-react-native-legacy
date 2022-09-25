import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Snackbar } from 'react-native-paper';

import { appCommonService } from '../services';

/**
 * Application notification display.
 */
export function AppNotifications() {
  const duration = appCommonService.NOTIFICATION_DURATION;

  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState('');
  const [notificationKey, setNotificationKey] = useState('');

  appCommonService.onNotification(({ text, textKey }) => {
    text && setNotification(text);
    textKey && setNotificationKey(textKey);
    setIsVisible(true);
  });

  function onDismiss() {
    setIsVisible(false);
  }

  return (
    <Snackbar
      style={styles.snackbar}
      visible={isVisible}
      onDismiss={onDismiss}
      duration={duration}
    >
      {notification || t(notificationKey)}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    bottom: 50,
  },
});
