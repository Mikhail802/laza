import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { registerUser } from '../services/ApiService';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    const response = await registerUser('User', email, password);
    if (response && response.id) {
      navigation.navigate('Login');
    } else {
      alert('Ошибка регистрации.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Подтвердите пароль" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
