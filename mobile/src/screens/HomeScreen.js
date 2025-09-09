import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Bright Cuts</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}