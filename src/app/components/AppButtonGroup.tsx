import React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';

import { AppButton } from './AppButton';
import { appTheme } from 'app/theme';

interface AppButtonGroupButtonOptions {
  label: string;
  type?: 'primary' | 'secondary' | 'danger';
  textColor?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  onPress: () => void;
}

interface AppButtonGroupProps {
  /**
   * Button options.
   */
  buttons: AppButtonGroupButtonOptions[];

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;
}

export function AppButtonGroup(props: AppButtonGroupProps) {
  const { buttons, style } = props;

  return (
    <View style={[styles.buttons, style]}>
      {buttons.map((button) => {
        if (!button.isHidden)
          return (
            <AppButton
              key={button.label}
              label={button.label}
              type={button.type || 'primary'}
              textColor={button.textColor}
              backgroundColor={button.backgroundColor}
              isLoading={button.isLoading}
              isDisabled={button.isDisabled}
              onPress={button.onPress}
              style={styles.button}
            />
          );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginHorizontal: appTheme.gaps.small / -2,
  },
  button: {
    flexGrow: 1,
    flexBasis: 1,
    marginHorizontal: appTheme.gaps.small / 2,
  },
});
