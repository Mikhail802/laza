import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Button } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { getColumns, createColumn, createTask } from '../services/ApiService';
import { API_URL } from '../services/config';


const RoomScreen = ({ route, navigation }) => {
  const { roomId, roomName } = route.params;
  const [columns, setColumns] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [columnModalVisible, setColumnModalVisible] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [taskText, setTaskText] = useState('');
  const [columnName, setColumnName] = useState('');

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    const fetchedColumns = await getColumns(roomId);
    setColumns(fetchedColumns);
  };

  const handleAddColumn = async () => {
    if (columnName.trim()) {
      console.log("Создаём колонку для комнаты:", roomId, columnName);
      const newColumn = await createColumn(roomId, columnName);
      if (newColumn) {
        fetchColumns();
        setColumnName('');
        setColumnModalVisible(false);
      }
    } else {
      alert('Пожалуйста, введите название колонки');
    }
  };
  

  const handleAddTask = async () => {
    if (taskText.trim() && selectedColumnId) {
      console.log("Создаём задачу для колонки:", selectedColumnId, taskText);
      const newTask = await createTask(selectedColumnId, taskText);
      if (newTask) {
        fetchColumns();
        setTaskText('');
        setModalVisible(false);
      }
    } else {
      alert('Пожалуйста, введите текст задачи');
    }
  };
  

  const renderColumn = (column) => (
    <View style={styles.column} key={column.id}>
      <Text style={styles.columnTitle}>{column.title}</Text>
      {column.tasks.map(task => (
        <TouchableOpacity
          key={task.id}
          style={styles.taskCard}
          onPress={() => navigation.navigate('TaskDetail', { task })}
        >
          <Text style={styles.taskText}>{task.text}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => {
          setSelectedColumnId(column.id);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addTaskText}>Добавить задачу</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{roomName}</Text>
      </View>
      <ScrollView horizontal style={styles.columnsContainer}>
        {columns.map(renderColumn)}
        <TouchableOpacity style={styles.addColumnButton} onPress={() => setColumnModalVisible(true)}>
          <Text style={styles.addColumnText}>Добавить колонку</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить задачу</Text>
            <TextInput
              style={styles.input}
              placeholder="Текст задачи"
              value={taskText}
              onChangeText={setTaskText}
            />
            <View style={styles.modalButtons}>
              <Button title="Отмена" onPress={() => setModalVisible(false)} />
              <Button title="Добавить" onPress={handleAddTask} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={columnModalVisible}
        onRequestClose={() => setColumnModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить колонку</Text>
            <TextInput
              style={styles.input}
              placeholder="Название колонки"
              value={columnName}
              onChangeText={setColumnName}
            />
            <View style={styles.modalButtons}>
              <Button title="Отмена" onPress={() => setColumnModalVisible(false)} />
              <Button title="Добавить" onPress={handleAddColumn} />
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
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  columnsContainer: {
    flexDirection: 'row',
  },
  column: {
    width: 300,
    marginRight: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  addTaskButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ECF6ED',
    borderRadius: 5,
    alignItems: 'center',
  },
  addTaskText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  addColumnButton: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF6ED',
    borderRadius: 10,
  },
  addColumnText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default RoomScreen;
