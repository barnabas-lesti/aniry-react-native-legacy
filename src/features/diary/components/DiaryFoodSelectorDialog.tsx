import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButtonGroup, AppDialog, AppList } from 'app/components';
import { appStyles, appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { diaryState } from '../state';
import { DiaryMealItem } from '../models';

interface DiaryFoodSelectorDialogProps {
  /**
   * Selected meal items.
   */
  selectedMealItems: DiaryMealItem[];

  /**
   * Confirmation event handler.
   */
  onSave: (mealItems: DiaryMealItem[]) => void;

  /**
   * Cancellation event handler.
   */
  onDiscard: () => void;
}

/**
 * Meal item selector dialog component.
 */
export function DiaryFoodSelectorDialog(props: DiaryFoodSelectorDialogProps) {
  const { selectedMealItems, onSave, onDiscard } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mealItems = diaryState.selectors.diaryFoodSelectorItems(useAppSelector((app) => app));
  const diaryFoodSelectorSearchString = useAppSelector(({ diary }) => diary.diaryFoodSelectorSearchString);
  const [localSelectedMealItems, setLocalSelectedMealItems] = useState(selectedMealItems);

  useEffect(() => {
    dispatch(diaryState.asyncActions.lazyLoadMealItems());
  }, [dispatch]);

  async function onSearch(searchString: string) {
    dispatch(diaryState.actions.setDiaryFoodSelectorSearchString(searchString));
  }

  function onSelectMealItem(mealItem: DiaryMealItem) {
    if (isMealItemInSelectedMealItems(mealItem)) {
      removeMealItemFromSelectedMealItems(mealItem);
    } else {
      addMealItemToSelectedMealItems(mealItem);
    }
  }

  function isMealItemInSelectedMealItems(mealItem: DiaryMealItem) {
    return localSelectedMealItems.filter(({ id }) => id === mealItem.id).length > 0;
  }

  function addMealItemToSelectedMealItems(mealItem: DiaryMealItem) {
    setLocalSelectedMealItems([...localSelectedMealItems, mealItem]);
  }

  function removeMealItemFromSelectedMealItems(mealItem: DiaryMealItem) {
    setLocalSelectedMealItems([...localSelectedMealItems.filter(({ id }) => mealItem.id !== id)]);
  }

  async function onRefresh() {
    await dispatch(diaryState.asyncActions.loadMealItems());
  }

  return (
    <AppDialog
      large
      onDismiss={onDiscard}
    >
      <View style={appStyles.section}>
        <AppButtonGroup
          style={appStyles.sectionRow}
          buttons={[
            {
              label: t('app.labels.discard'),
              type: 'secondary',
              textColor: appTheme.colors.diaryPrimary,
              onPress: onDiscard,
            },
            {
              label: t('app.labels.save'),
              backgroundColor: appTheme.colors.diaryPrimary,
              onPress: () => onSave(localSelectedMealItems),
            },
          ]}
        />
      </View>

      <View style={[appStyles.section, appStyles.flex]}>
        <AppList
          withCheckboxes
          sortByName
          style={appStyles.sectionRow}
          items={mealItems}
          initialSearchString={diaryFoodSelectorSearchString}
          noItemsTextKey={'diary.diaryFoodSelectorDialog.noIngredients'}
          selectedItems={localSelectedMealItems}
          onSearch={onSearch}
          onSelect={onSelectMealItem}
          onRefresh={onRefresh}
        />
      </View>
    </AppDialog>
  );
}
