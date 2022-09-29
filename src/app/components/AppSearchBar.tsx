import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { useAppSelector } from '../store/hooks';
import { appState } from '../state';

interface AppSearchBarProps {
  /**
   * Initial value of the input.
   */
  value?: string;

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
  onChangeValue?: (newValue: string) => void;

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
  const { value = '', placeholder, style, onChangeValue, onSearch } = props;

  const [localValue, setLocalValue] = useState(value);
  const isAppLoading = appState.selectors.isAppLoading(useAppSelector((state) => state.app));

  function onChangeText(newValue: string) {
    setLocalValue(newValue);
    onChangeValue && onChangeValue(newValue);

    throttleTimeout && clearTimeout(throttleTimeout);

    throttleTimeout = setTimeout(() => {
      onSearch(newValue);
    }, THROTTLE_DELAY);
  }

  return (
    <Searchbar
      style={style}
      value={localValue}
      placeholder={placeholder}
      loading={isAppLoading}
      onChangeText={onChangeText}
      onIconPress={() => onSearch(value)}
      onBlur={() => onSearch(value)}
    />
  );
}
