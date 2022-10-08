import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import {
  AppButton,
  AppButtonGroup,
  AppConfirmationDialog,
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

interface DiaryMealEditorProps {
  /**
   * Enable calculator mode.
   */
  isCalculatorMode?: boolean;

  /**
   * On discard event handler.
   */
  onDiscard?: () => void;

  /**
   * On after save event handler.
   */
  onAfterSave?: () => void;

  /**
   * On after delete event handler.
   */
  onAfterDelete?: () => void;
}

export function DiaryMealEditor(props: DiaryMealEditorProps) {
  const { isCalculatorMode, onDiscard, onAfterSave, onAfterDelete } = props;
  const { t } = useTranslation();

  // TODO: Add logic
  const isNewMeal = true;

  const dispatch = useAppDispatch();
  const allMealItems = diaryState.selectors.diaryAllMealItems(useAppSelector((app) => app));
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isFoodSelectorDialogVisible, setIsFoodSelectorDialogVisible] = useState(false);
  const [selectedFoodProxy, setSelectedFoodProxy] = useState<AppItemProxy<DiaryMealItem> | null>(null);
  const [mealItemProxies, setMealItemProxies] = useState<AppItemProxy<DiaryMealItem>[]>([]);

  function onSaveButtonPress() {
    // TODO: Add save logic
    onAfterSave && onAfterSave();
  }

  function onDeleteConfirmation() {
    // TODO: Add delete logic
    onAfterDelete && onAfterDelete();
  }

  function onEditMealItemsSave(mealItems: DiaryMealItem[]) {
    setMealItemProxies(AppItemProxy.mapItemsToProxies(mealItems, mealItemProxies));
    setIsFoodSelectorDialogVisible(false);
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
        {isCalculatorMode ? (
          <AppButton
            style={appStyles.sectionRow}
            label={t(`diary.diaryMealEditor.buttons.calculator`)}
            backgroundColor={appTheme.colors.diaryPrimary}
            onPress={() => setIsFoodSelectorDialogVisible(true)}
          />
        ) : (
          <AppButtonGroup
            style={appStyles.sectionRow}
            buttons={[
              {
                label: t('app.labels.discard'),
                type: 'secondary',
                textColor: appTheme.colors.diaryPrimary,
                onPress: () => onDiscard && onDiscard(),
              },
              {
                label: t(`app.labels.${isNewMeal ? 'create' : 'update'}`),
                backgroundColor: appTheme.colors.diaryPrimary,
                onPress: onSaveButtonPress,
              },
              {
                label: t('app.labels.delete'),
                type: 'danger',
                isHidden: isNewMeal,
                onPress: () => setIsDeleteConfirmationVisible(true),
              },
            ]}
          />
        )}
      </View>

      {!!mealItemProxies.length && (
        <AppScrollView onRefresh={onRefresh}>
          <View style={(appStyles.section, appStyles.flex)}>
            {!isCalculatorMode && (
              <>
                <Text style={appStyles.sectionTitle}>{t('diary.diaryMealEditor.mealItemsTitle')}</Text>
                <AppButton
                  style={appStyles.sectionRow}
                  label={t(`diary.diaryMealEditor.buttons.${mealItemProxies.length ? 'editFood' : 'addFood'}`)}
                  backgroundColor={appTheme.colors.diaryPrimary}
                  onPress={() => setIsFoodSelectorDialogVisible(true)}
                />
              </>
            )}

            <View style={appStyles.sectionRow}>
              <Text style={appStyles.sectionTitle}>{t('diary.diaryMealEditor.mealItemsTitle')}</Text>
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

      {!isNewMeal && isDeleteConfirmationVisible && (
        <AppConfirmationDialog
          text={t('diary.diaryMealEditor.deleteConfirmation')}
          onConfirmation={onDeleteConfirmation}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}
    </>
  );
}
