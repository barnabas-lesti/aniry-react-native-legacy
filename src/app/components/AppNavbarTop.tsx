import React from 'react';
import { Appbar } from 'react-native-paper';

import { AppProgressBar } from './AppProgressBar';

interface AppNavbarTopProps {
  title: string;
}

export function AppNavbarTop(props: AppNavbarTopProps) {
  const { title } = props;

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={title} />
      </Appbar.Header>
      <AppProgressBar />
    </>
  );
}
