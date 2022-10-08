import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';

import { AppItem } from 'app/models';
import { appTheme } from 'app/theme';
import { AppIcon } from './AppIcon';

interface AppListItemProps<T extends AppItem> {
  /**
   * Item to display.
   */
  item: T;

  /**
   * Selected flag.
   */
  selected?: boolean;

  /**
   * Should checkbox be displayed.
   */
  withCheckbox?: boolean;

  /**
   * Icon display flag.
   */
  withIcon?: boolean;

  /**
   * Name press handler.
   */
  onNamePress?: (item: T) => void;

  /**
   * Serving part press handler.
   */
  onServingPress?: (item: T) => void;

  /**
   * General press handler.
   */
  onPress?: (item: T) => void;
}

/**
 * Application list item component.
 */
export function AppListItem<T extends AppItem>(props: AppListItemProps<T>) {
  const { item, selected, withCheckbox, withIcon, onNamePress, onServingPress, onPress } = props;

  const { t } = useTranslation();

  function onLocalCheckboxPress() {
    onPress && onPress(item);
  }

  function onLocalNamePress() {
    onNamePress && onNamePress(item);
    onPress && onPress(item);
  }

  function onLocalServingPress() {
    onServingPress && onServingPress(item);
    onPress && onPress(item);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.leftSide}
          onPress={onLocalNamePress}
        >
          {withCheckbox && (
            <View style={styles.checkbox}>
              <Checkbox.Android
                color={appTheme.colors.primary}
                status={selected ? 'checked' : 'unchecked'}
                onPress={onLocalCheckboxPress}
              />
            </View>
          )}
          {withIcon && (
            <AppIcon
              style={styles.icon}
              icon={item.icon}
              color={item.color}
              size={18}
            />
          )}
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightSide}
          onPress={onLocalServingPress}
        >
          <Text style={styles.serving}>
            {item.serving.value.toFixed()} {item.serving.unit}
          </Text>
          <Text style={styles.calories}>
            {item.calories.toFixed()} {t('app.units.kcal')}
          </Text>
        </TouchableOpacity>
      </View>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: appTheme.gaps.small,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  rightSide: {
    alignItems: 'flex-end',
    flexGrow: 1,
    paddingLeft: appTheme.gaps.medium,
  },
  checkbox: {
    paddingRight: appTheme.gaps.small,
  },
  icon: {
    marginLeft: -10,
    marginRight: -10 + appTheme.gaps.small,
  },
  name: {
    fontSize: 14,
    flex: 1,
  },
  serving: {
    fontSize: 14,
  },
  calories: {
    fontSize: 12,
    color: appTheme.colors.textSecondary,
  },
});
