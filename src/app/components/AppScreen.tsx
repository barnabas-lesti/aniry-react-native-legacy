import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appStyles } from '../theme';
import { AppLayoutHeader } from './AppLayoutHeader';
import { AppScrollView } from './AppScrollView';

interface AppScreenProps {
  titleKey: string;

  /**
   * Use scroll view or simple view flag.
   */
  isScrollable?: boolean;

  /**
   * Elements to be contained in the dialog popup.
   */
  children: React.ReactNode;

  goBack?: () => void;
}

export function AppScreen(props: AppScreenProps) {
  const { titleKey, isScrollable, children, goBack } = props;
  const { t } = useTranslation();

  return (
    <>
      <AppLayoutHeader
        title={t(titleKey)}
        goBack={goBack}
      />
      {isScrollable ? (
        <AppScrollView style={[appStyles.container, appStyles.flex]}>{children}</AppScrollView>
      ) : (
        <View style={[appStyles.container, appStyles.flex]}>{children}</View>
      )}
    </>
  );
}
