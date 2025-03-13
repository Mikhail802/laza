import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Parse } from 'parse/react-native';  // Импортируем Parse SDK

const RecoverScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecover = async () => {
    try {
      await Parse.User.requestPasswordReset(email);
      alert('Ссылка для сброса пароля отправлена!');
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recover Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Reset Password" onPress={handleRecover} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Back to Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
});

export default RecoverScreen;
