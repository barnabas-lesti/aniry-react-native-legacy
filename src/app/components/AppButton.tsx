import React from 'react';
import { StyleSheet, Button, View, StyleProp, TextStyle } from 'react-native';

interface AppButtonProps {
  /**
   * Label to display.
   */
  label: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Type of the button.
   */
  type?: 'default' | 'primary' | 'danger';

  /**
   * On button press event handler.
   */
  onPress: () => void;
}

/**
 * App button component.
 */
export function AppButton(props: AppButtonProps) {
  const { label, style, type, onPress } = props;

  function getColor() {
    switch (type) {
      case 'primary':
        return styles.buttonPrimary.color;
      case 'danger':
        return styles.buttonDanger.color;
      default:
        return styles.buttonDefault.color;
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Button
        title={label}
        onPress={onPress}
        color={getColor()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonDefault: {
    color: '#75797d',
  },
  buttonPrimary: {
    color: '#33bbff',
  },
  buttonDanger: {
    color: '#d2322d',
  },
});
