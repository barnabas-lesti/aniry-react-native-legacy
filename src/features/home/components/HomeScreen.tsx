import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { AppStackParamList, AppStackScreenProps } from 'app/navigation';

// type HomeScreenProps = AppStackScreenProps<AppStackParamList, 'Home'>;

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
