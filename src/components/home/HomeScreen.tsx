import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppNavigation } from '../../navigation';

export default function HomeScreen() {
  const navigation = useAppNavigation<'Home'>();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Ingredients"
        onPress={() => navigation.navigate('Ingredients')}
      />
    </View>
  );
}
