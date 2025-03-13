import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Bell, User, Users, LogOut } from 'lucide-react-native';
import { Parse } from 'parse/react-native'; // Импортируем Parse
import AsyncStorage from '@react-native-async-storage/async-storage'; // Для работы с AsyncStorage

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Вызов метода для выхода пользователя
      await Parse.User.logOut();

      // Очистка токена из AsyncStorage
      await AsyncStorage.removeItem('auth_token');

      console.log('User logged out successfully');
      
      // Переход на экран логина
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error while logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Профиль</Text>
        <TouchableOpacity>
          <Bell size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <User size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Михаил</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Users size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Друзья</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <LogOut size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Выход</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ProfileScreen;
