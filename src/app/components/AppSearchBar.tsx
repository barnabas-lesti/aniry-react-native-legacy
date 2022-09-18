import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface AppSearchBarProps {
  /**
   * Initial value.
   */
  value: string;

  /**
   * Placeholder text to display.
   */
  placeholder?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On value change handler.
   */
  onChangeValue?: (value: string) => void;

  /**
   * Delayed value change handler.
   */
  onThrottledChangeValue?: (value: string) => void;
}

const THROTTLE_DELAY = 300;
let throttleTimeout: NodeJS.Timeout | null;

/**
 * Application search bar component.
 */
export function AppSearchBar(props: AppSearchBarProps) {
  const { value, placeholder, style, onChangeValue, onThrottledChangeValue } = props;

  const [localValue, setLocalValue] = useState(value);

  function onBeforeChangeValue(newValue: string) {
    setLocalValue(newValue);
    onChangeValue && onChangeValue(newValue);

    if (onThrottledChangeValue) {
      throttleTimeout && clearTimeout(throttleTimeout);

      throttleTimeout = setTimeout(() => {
        onThrottledChangeValue(newValue);
      }, THROTTLE_DELAY);
    }
  }

  return (
    <Searchbar
      style={style}
      value={localValue}
      placeholder={placeholder}
      onChangeText={onBeforeChangeValue}
    />
  );
}
