import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Parse } from 'parse/react-native';  // Импортируем Parse SDK
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  console.log('Attempting to log in with email:', email);

  try {
    // Попытка логина через Parse SDK
    const user = await Parse.User.logIn(email, password);
    console.log('Login successful. User:', user);

    // Сохраняем новый токен в AsyncStorage
    const token = user.getSessionToken();
    await AsyncStorage.setItem('auth_token', token);
    console.log('Token saved:', token); // Логируем сохранённый токен

    // Перенаправляем на главный экран
    navigation.navigate('Home');
  } catch (error) {
    console.error('Login failed. Error:', error); // Логируем ошибку
    alert('Ошибка входа: ' + error.message); // Показываем ошибку пользователю
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />

      {/* Ссылки на регистрацию и восстановление пароля */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Регистрация</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
          <Text style={styles.linkText}>Забыли пароль?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
});

export default LoginScreen;
