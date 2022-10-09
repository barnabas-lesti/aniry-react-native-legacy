import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import {
  AppListItemOrderEditorDialog,
  AppButtonGroup,
  AppList,
  AppItemProxyEditorDialog,
  AppNutrientsPieChart,
  AppScrollView,
} from 'app/components';
import { AppItemProxy } from 'app/models';
import { appStyles, appTheme } from 'app/theme';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { DiaryMealItem } from '../models';
import { DiaryFoodSelectorDialog } from './DiaryFoodSelectorDialog';
import { diaryState } from '../state';

interface DiaryMealEditorProps {}

export function DiaryMealEditor(props: DiaryMealEditorProps) {
  const {} = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const allMealItems = diaryState.selectors.diaryAllMealItems(useAppSelector((app) => app));
  const [isItemOrderEditorDialogVisible, setIsItemOrderEditorDialogVisible] = useState(false);
  const [isFoodSelectorDialogVisible, setIsFoodSelectorDialogVisible] = useState(false);
  const [selectedFoodProxy, setSelectedFoodProxy] = useState<AppItemProxy<DiaryMealItem> | null>(null);
  const [mealItemProxies, setMealItemProxies] = useState<AppItemProxy<DiaryMealItem>[]>([]);

  function onEditMealItemsSave(mealItems: DiaryMealItem[]) {
    setMealItemProxies(AppItemProxy.mapItemsToProxies(mealItems, mealItemProxies));
    setIsFoodSelectorDialogVisible(false);
  }

  function onIngredientsOrderEditorSave(mealItems: DiaryMealItem[]) {
    setMealItemProxies(AppItemProxy.mapItemsToProxies(mealItems, mealItemProxies));
    setIsItemOrderEditorDialogVisible(false);
  }

  function onEditFoodProxySave(updatedMealItemProxy: AppItemProxy<DiaryMealItem>) {
    setMealItemProxies([
      ...mealItemProxies.map((mealItemProxy) =>
        mealItemProxy.id === updatedMealItemProxy.id ? updatedMealItemProxy : mealItemProxy
      ),
    ]);
    setSelectedFoodProxy(null);
  }

  function onEditFoodProxyDelete(mealItemProxyToDelete: AppItemProxy<DiaryMealItem>) {
    setMealItemProxies([...mealItemProxies.filter(({ id }) => id !== mealItemProxyToDelete.id)]);
    setSelectedFoodProxy(null);
  }

  async function onRefresh() {
    await dispatch(diaryState.asyncActions.lazyLoadMealItems());
    const updatedMealItems = mealItemProxies
      .map((mealItemProxy) => allMealItems.find(({ id }) => id === mealItemProxy.id))
      .filter((mealItem) => !!mealItem);
    setMealItemProxies(AppItemProxy.mapItemsToProxies(updatedMealItems as DiaryMealItem[], mealItemProxies));
  }

  return (
    <>
      <View style={appStyles.section}>
        <Text style={appStyles.sectionTitle}>{t('diary.diaryMealEditor.title')}</Text>
        <AppButtonGroup
          style={appStyles.sectionRow}
          buttons={[
            {
              label: t(`diary.diaryMealEditor.buttons.${mealItemProxies.length ? 'editItems' : 'addItems'}`),
              backgroundColor: appTheme.colors.primary,
              onPress: () => setIsFoodSelectorDialogVisible(true),
            },
            {
              isDisabled: mealItemProxies.length < 2,
              label: t('diary.diaryMealEditor.buttons.reorderItems'),
              backgroundColor: appTheme.colors.primary,
              onPress: () => setIsItemOrderEditorDialogVisible(true),
            },
          ]}
        />
      </View>

      {!!mealItemProxies.length && (
        <AppScrollView onRefresh={onRefresh}>
          <View style={(appStyles.section, appStyles.flex)}>
            <View style={appStyles.sectionRow}>
              <AppList
                scrollDisabled
                withCalorieSummary
                items={mealItemProxies}
                onSelect={(mealItemProxy) => setSelectedFoodProxy(mealItemProxy)}
              />
            </View>
          </View>

          {!!mealItemProxies.length && (
            <View style={appStyles.section}>
              <Text style={appStyles.sectionTitle}>{t('diary.diaryMealEditor.nutrientsTitle')}</Text>
              <AppNutrientsPieChart
                style={appStyles.sectionRow}
                nutrients={AppItemProxy.getNutrientsFromItemProxies(mealItemProxies)}
              />
            </View>
          )}
        </AppScrollView>
      )}

      {isItemOrderEditorDialogVisible && (
        <AppListItemOrderEditorDialog
          primaryColor={appTheme.colors.primary}
          items={AppItemProxy.mapProxiesToItems(mealItemProxies)}
          onDiscard={() => setIsItemOrderEditorDialogVisible(false)}
          onSave={onIngredientsOrderEditorSave}
        />
      )}

      {isFoodSelectorDialogVisible && (
        <DiaryFoodSelectorDialog
          selectedMealItems={AppItemProxy.mapProxiesToItems(mealItemProxies)}
          onDiscard={() => setIsFoodSelectorDialogVisible(false)}
          onSave={onEditMealItemsSave}
        />
      )}

      {selectedFoodProxy && (
        <AppItemProxyEditorDialog
          itemProxy={selectedFoodProxy}
          primaryColor={appTheme.colors.diaryPrimary}
          text={t('diary.diaryMealEditor.buttons.editServing')}
          onDiscard={() => setSelectedFoodProxy(null)}
          onSave={onEditFoodProxySave}
          onDelete={onEditFoodProxyDelete}
        />
      )}
    </>
  );
}
