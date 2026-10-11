import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { apiRequest } from '../services/api';
import { theme } from '../theme';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-20');

  const loadTasks = async () => {
    const data = await apiRequest('/tasks');
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) {
      Alert.alert('Task title required', 'Please enter a task title before saving.');
      return;
    }

    try {
      await apiRequest('/tasks', 'POST', { title, description, dueDate });
      setTitle('');
      setDescription('');
      setDueDate('2026-10-20');
      loadTasks();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Create new task</Text>

      <TextInput style={styles.input} placeholder="Task title" value={title} onChangeText={setTitle} />
      <TextInput style={[styles.input, styles.textArea]} multiline placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Due date (YYYY-MM-DD)" value={dueDate} onChangeText={setDueDate} />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add task</Text>
      </TouchableOpacity>

      <View style={styles.listWrap}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskMeta}>{task.status} • {task.dueDate}</Text>
            <Text style={styles.taskDescription}>{task.description || 'No description provided.'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    marginBottom: 12,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  listWrap: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  taskMeta: {
    color: theme.muted,
    fontSize: 12,
    marginBottom: 8,
  },
  taskDescription: {
    color: theme.text,
    lineHeight: 20,
  },
});
