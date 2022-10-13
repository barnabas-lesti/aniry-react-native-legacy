import React from 'react';
import { Appbar } from 'react-native-paper';

import { AppLayoutProgressBar } from './AppLayoutProgressBar';

interface AppLayoutHeaderProps {
  title: string;
  goBack?: () => void;
}

export function AppLayoutHeader(props: AppLayoutHeaderProps) {
  const { title, goBack } = props;

  return (
    <>
      <Appbar.Header>
        {goBack && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content title={title} />
      </Appbar.Header>
      <AppLayoutProgressBar />
    </>
  );
}
