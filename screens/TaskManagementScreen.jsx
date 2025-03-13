import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { getTasks, createTask, updateTask, deleteTask } from '../services/ParseService';

const TaskManagementScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks(roomId);
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async () => {
    if (taskText.trim()) {
      await createTask(roomId, taskText);
      fetchTasks();
      setTaskText('');
      setModalVisible(false);
    } else {
      alert('Пожалуйста, введите текст задачи');
    }
  };

  const handleEditTask = async () => {
    if (taskText.trim()) {
      await updateTask(editingTask.id, taskText);
      fetchTasks();
      setTaskText('');
      setEditingTask(null);
      setModalVisible(false);
    } else {
      alert('Пожалуйста, введите текст задачи');
    }
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  const openEditModal = (task) => {
    setTaskText(task.text);
    setEditingTask(task);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Управление задачами</Text>
      <Button title="Добавить задачу" onPress={() => setModalVisible(true)} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <View style={styles.taskActions}>
              <Button title="Редактировать" onPress={() => openEditModal(item)} />
              <Button title="Удалить" onPress={() => handleDeleteTask(item.id)} />
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingTask ? 'Редактировать задачу' : 'Создать задачу'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Текст задачи"
              value={taskText}
              onChangeText={setTaskText}
            />
            <View style={styles.modalButtons}>
              <Button title="Отмена" onPress={() => setModalVisible(false)} />
              <Button title={editingTask ? 'Сохранить' : 'Создать'} onPress={editingTask ? handleEditTask : handleCreateTask} />
            </View>
          </View>
        </View>
      </Modal>
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
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskActions: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default TaskManagementScreen;