import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { useAppNavigation } from 'app/hooks';

export function HomeScreen() {
  const navigation = useAppNavigation<'Home'>();

  const [inputValue, onChangeInputValue] = useState('');

  return (
    <View>
      <Text>HomeScreen</Text>
      <TextInput value={inputValue} onChangeText={onChangeInputValue} />
      <Button
        title="Ingredients"
        onPress={() => navigation.navigate('Ingredients')}
      />
    </View>
  );
}
