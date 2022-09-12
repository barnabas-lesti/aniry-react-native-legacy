import React from 'react';
import { StyleSheet, Button, View, StyleProp, TextStyle } from 'react-native';

interface CommonButtonProps {
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

export function CommonButton(props: CommonButtonProps) {
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
