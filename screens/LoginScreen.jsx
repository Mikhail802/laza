import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { loginUser } from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await loginUser(email, password);
    
    if (response && response.token) {
      await AsyncStorage.setItem('auth_token', response.token);
      navigation.navigate('Home');
    } else {
      alert('Ошибка входа. Проверьте данные.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, padding: 10 },
});

export default LoginScreen;
