import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface AppSearchBarProps {
  /**
   * Initial value of the input.
   */
  initialValue?: string;

  /**
   * Placeholder text to display.
   */
  placeholder?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * On search event handler.
   */
  onSearch: (searchString: string) => void;
}

const THROTTLE_DELAY = 300;
let throttleTimeout: NodeJS.Timeout | null;

/**
 * Application search bar component.
 */
export function AppSearchBar(props: AppSearchBarProps) {
  const { initialValue = '', placeholder, style, onSearch } = props;

  const [value, setValue] = useState(initialValue);

  function onBeforeChangeText(newValue: string) {
    setValue(newValue);
    console.log(newValue);

    throttleTimeout && clearTimeout(throttleTimeout);

    throttleTimeout = setTimeout(() => {
      onSearch(newValue);
    }, THROTTLE_DELAY);
  }

  return (
    <Searchbar
      style={style}
      value={value}
      placeholder={placeholder}
      onChangeText={onBeforeChangeText}
      onIconPress={() => onSearch(value)}
      onBlur={() => onSearch(value)}
    />
  );
}
