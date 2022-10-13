import React from 'react';
// import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

// import { appStyles } from '../theme';

interface AppLayoutHeaderProps {
  title: string;
  goBack?: () => void;
}

export function AppLayoutHeader(props: AppLayoutHeaderProps) {
  const { title, goBack } = props;

  return (
    <Appbar.Header>
      {goBack && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
