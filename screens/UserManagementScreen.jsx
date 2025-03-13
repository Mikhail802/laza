import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { getUsers, addUserToRoom, removeUserFromRoom } from '../services/ParseService';

const UserManagementScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers(roomId);
    setUsers(fetchedUsers);
  };

  const handleAddUser = async () => {
    if (username.trim()) {
      await addUserToRoom(roomId, username);
      fetchUsers();
      setUsername('');
    } else {
      alert('Пожалуйста, введите имя пользователя');
    }
  };

  const handleRemoveUser = async (userId) => {
    await removeUserFromRoom(roomId, userId);
    fetchUsers();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Управление пользователями</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Добавить пользователя" onPress={handleAddUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.username}</Text>
            <Button title="Удалить" onPress={() => handleRemoveUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserManagementScreen;