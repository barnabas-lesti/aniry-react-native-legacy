import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from 'app/models';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;

  const [inputValue, onChangeInputValue] = useState('');

  return (
    <View>
      <Text>HomeScreen</Text>
      <TextInput
        value={inputValue}
        onChangeText={onChangeInputValue}
      />
      <Button
        title="Ingredients"
        onPress={() => navigation.navigate('Ingredients')}
      />
    </View>
  );
}
