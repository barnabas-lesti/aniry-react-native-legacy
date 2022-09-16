import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { AppStackParamList, AppStackScreenProps } from 'app/navigation';

type HomeScreenProps = AppStackScreenProps<AppStackParamList, 'Home'>;

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
