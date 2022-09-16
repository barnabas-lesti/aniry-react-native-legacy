import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';

import { AppTextInput } from './AppTextInput';
import type { SelectOption } from './models';

interface AppSelectInputProps {
  /**
   * Initial value.
   */
  value: string;

  /**
   * Dropdown options.
   */
  options: Array<SelectOption>;

  /**
   * Label to display.
   */
  label?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Value change handler.
   */
  onChangeValue: Dispatch<SetStateAction<any>>;
}

/**
 * App select input component.
 * @example
 * <AppSelectInput label="Unit" options={options} value={unit} onChangeValue={onChangeUnit} />
 */
export function AppSelectInput(props: AppSelectInputProps) {
  const { value, label, options, style, onChangeValue } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const openDropdown = () => setIsDropdownVisible(true);
  const closeDropdown = () => setIsDropdownVisible(false);

  const onOptionPress = (optionValue: string) => {
    onChangeValue(optionValue);
    closeDropdown();
  };

  return (
    <View style={style}>
      <Menu
        visible={isDropdownVisible}
        onDismiss={closeDropdown}
        anchor={
          <TouchableOpacity onPress={openDropdown}>
            <View pointerEvents="none">
              <AppTextInput
                readonly
                label={label}
                value={value}
                onChangeValue={onChangeValue}
              />
            </View>
          </TouchableOpacity>
        }
      >
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            titleStyle={value === option.value && styles.selectedTitle}
            onPress={() => onOptionPress(option.value)}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedTitle: {
    fontWeight: 'bold',
  },
});
