import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppNavigation } from '../../navigation/hooks';

export default function IngredientsScreen() {
  const navigation = useAppNavigation<'Ingredients'>();

  return (
    <View>
      <Text>IngredientsScreen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
