import React from 'react';
import { View, Text, Button } from 'react-native';

const FriendsScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Список друзей</Text>
    <Button title="Назад" onPress={() => navigation.goBack()} />
  </View>
);

export default FriendsScreen;
