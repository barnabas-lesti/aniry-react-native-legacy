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
   * On button press event handler.
   */
  onPress: () => void;
}

/**
 * App button component.
 */
export function AppButton(props: AppButtonProps) {
  const { label, style, onPress } = props;

  // const color = default ? 'grey' : undefined;

  return (
    <View style={[styles.container, style]}>
      <Button title={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
