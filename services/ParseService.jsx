import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

// Функция для регистрации пользователя
export const signUp = async (username, password) => {
  if (!username || !password) {
    console.error('Ошибка: Имя пользователя и пароль обязательны.');
    return null;
  }

  const newUser = { id: uuidv4(), username, password };
  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    console.log('Пользователь успешно зарегистрирован:', newUser.username);
    return newUser;
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error.message);
    return null;
  }
};

// Функция для входа пользователя
export const logIn = async (username, password) => {
  if (!username || !password) {
    console.error('Ошибка: Имя пользователя и пароль обязательны.');
    return null;
  }

  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      console.log('Пользователь успешно вошел в систему:', user.username);
      return user;
    } else {
      console.error('Ошибка: Неверное имя пользователя или пароль.');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при входе пользователя:', error.message);
    return null;
  }
};

// Функция для восстановления пароля
export const resetPassword = async (username, newPassword) => {
  if (!username || !newPassword) {
    console.error('Ошибка: Имя пользователя и новый пароль обязательны.');
    return null;
  }

  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('Пароль успешно сброшен для пользователя:', username);
      return users[userIndex];
    } else {
      console.error('Ошибка: Пользователь не найден.');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error.message);
    return null;
  }
};

// Функция для создания комнаты
export const createRoom = async (roomName, roomTheme) => {
  if (!roomName || !roomTheme) {
    console.error('Ошибка: Имя комнаты и тема должны быть обязательными.');
    return null;
  }

  const newRoom = { id: uuidv4(), name: roomName, theme: roomTheme };
  try {
    const rooms = JSON.parse(await AsyncStorage.getItem('rooms')) || [];
    rooms.push(newRoom);
    await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
    console.log('Комната успешно создана:', newRoom.name, newRoom.theme);
    return newRoom;
  } catch (error) {
    console.error('Ошибка при создании комнаты:', error.message);
    return null;
  }
};

// Функция для получения списка комнат
export const getRooms = async () => {
  try {
    const rooms = JSON.parse(await AsyncStorage.getItem('rooms')) || [];
    console.log('Полученные комнаты:', rooms);
    return rooms;
  } catch (error) {
    console.error('Ошибка при получении комнат:', error.message);
    return [];
  }
};

// Функция для создания задачи
export const createTask = async (roomId, text) => {
  if (!roomId || !text) {
    console.error('Ошибка: ID комнаты и текст задачи обязательны.');
    return null;
  }

  const newTask = { id: uuidv4(), roomId, text, completed: false };
  try {
    const tasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Задача успешно создана:', newTask.text);
    return newTask;
  } catch (error) {
    console.error('Ошибка при создании задачи:', error.message);
    return null;
  }
};

// Функция для получения задач по ID комнаты
export const getTasks = async (roomId) => {
  if (!roomId) {
    console.error('Ошибка: Необходимо указать ID комнаты для получения задач.');
    return [];
  }

  try {
    const tasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    const roomTasks = tasks.filter(task => task.roomId === roomId);
    console.log('Полученные задачи:', roomTasks);
    return roomTasks;
  } catch (error) {
    console.error('Ошибка при получении задач:', error.message);
    return [];
  }
};

// Функция для обновления задачи
export const updateTask = async (taskId, newText) => {
  try {
    const tasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].text = newText;
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Задача успешно обновлена:', tasks[taskIndex].text);
      return tasks[taskIndex];
    } else {
      console.error('Ошибка: Задача не найдена.');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error.message);
    return null;
  }
};

// Функция для удаления задачи
export const deleteTask = async (taskId) => {
  try {
    const tasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    const newTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    console.log('Задача успешно удалена');
    return true;
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error.message);
    return false;
  }
};

// Функция для получения пользователей
export const getUsers = async (roomId) => {
  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const roomUsers = users.filter(user => user.roomId === roomId);
    console.log('Полученные пользователи:', roomUsers);
    return roomUsers;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error.message);
    return [];
  }
};

// Функция для добавления пользователя в комнату
export const addUserToRoom = async (roomId, username) => {
  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      users[userIndex].roomId = roomId;
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('Пользователь успешно добавлен в комнату:', username);
      return users[userIndex];
    } else {
      console.error('Ошибка: Пользователь не найден.');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в комнату:', error.message);
    return null;
  }
};

// Функция для удаления пользователя из комнаты
export const removeUserFromRoom = async (roomId, userId) => {
  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.id === userId && user.roomId === roomId);
    if (userIndex !== -1) {
      users[userIndex].roomId = null;
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('Пользователь успешно удален из комнаты:', userId);
      return users[userIndex];
    } else {
      console.error('Ошибка: Пользователь не найден.');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при удалении пользователя из комнаты:', error.message);
    return null;
  }
};