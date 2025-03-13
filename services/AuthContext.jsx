import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Parse } from 'parse/react-native';

export const AuthContext = createContext();
// Удаление токена



export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Начальное состояние null (ожидание загрузки)
  const [loading, setLoading] = useState(true); // Состояние для загрузки

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        console.log('Полученный токен:', token); // Логирование токена
        if (token) {
          // Проверка, если токен валиден
          Parse.User.become(token)
            .then((user) => {
              setIsAuthenticated(true);
              console.log('Пользователь найден:', user);
            })
            .catch((error) => {
              setIsAuthenticated(false);
              console.error('Ошибка подтверждения токена:', error.message);
            });
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Ошибка проверки статуса авторизации:', error.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuthStatus();
  }, []);

  if (loading) {
    // Экран загрузки
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

