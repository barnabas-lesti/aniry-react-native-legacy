import React, { Dispatch, SetStateAction } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import type { AppSelectOption } from './models';

interface AppSelectInputProps {
  /**
   * Initial value.
   */
  value: string;

  /**
   * Dropdown options.
   */
  options: Array<AppSelectOption>;

  /**
   * Label to display.
   */
  label?: string;

  /**
   * Custom styles.
   */
  style?: StyleProp<TextStyle>;

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

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <SelectDropdown
        searchInputStyle={styles.searchInput}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.row}
        rowTextStyle={styles.rowText}
        selectedRowStyle={styles.selectedRow}
        selectedRowTextStyle={styles.selectedRowText}
        data={options}
        onSelect={(option: AppSelectOption) => onChangeValue(option.value)}
        defaultValueByIndex={options.findIndex(
          (option) => option.value === value
        )}
        buttonTextAfterSelection={(option: AppSelectOption) => option.label}
        rowTextForSelection={(option: AppSelectOption) => option.label}
        renderCustomizedRowChild={(option: AppSelectOption) => (
          <Text
            style={[
              styles.rowText,
              value === option.value && styles.selectedRowText,
            ]}
          >
            {option.label}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 4,
    color: '#777',
    fontSize: 14,
  },
  searchInput: {},
  button: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    backgroundColor: '#fff',
    height: 36,
    width: 'auto',
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 18,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 4,
    transform: [{ translateY: -20 }],
  },
  row: {
    paddingHorizontal: 8,
    height: 36,
  },
  rowText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
  },
  selectedRow: {},
  selectedRowText: {
    fontWeight: 'bold',
  },
});
