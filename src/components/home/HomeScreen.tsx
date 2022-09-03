import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAppNavigation } from '../../navigation/hooks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { commonActions } from '../../store/states';

export default function HomeScreen() {
  const navigation = useAppNavigation<'Home'>();
  const dispatch = useAppDispatch();

  const [inputValue, onChangeInputValue] = useState('');
  const { test } = useAppSelector((state) => state.common);

  return (
    <View>
      <Text>HomeScreen</Text>
      <TextInput value={inputValue} onChangeText={onChangeInputValue} />
      <Text>{test}</Text>
      <Button
        title="Set test"
        onPress={() => dispatch(commonActions.setItems(inputValue))}
      />
      <Button
        title="Ingredients"
        onPress={() => navigation.navigate('Ingredients')}
      />
    </View>
  );
}
