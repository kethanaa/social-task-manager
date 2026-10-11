import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { apiRequest } from '../services/api';
import { theme } from '../theme';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const loadMessages = async () => {
    const data = await apiRequest('/chat');
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) {
      Alert.alert('Empty message', 'Type a message before sending.');
      return;
    }

    try {
      const newMessage = await apiRequest('/chat', 'POST', { text });
      setMessages((current) => [...current, newMessage]);
      setText('');
    } catch (error) {
      Alert.alert('Send failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Team chat</Text>

      <ScrollView style={styles.chatBox} contentContainerStyle={styles.chatContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.bubble, message.sender === 'me' ? styles.bubbleMine : styles.bubbleOther]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.timeText}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  chatBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: 400,
    padding: 12,
  },
  chatContent: {
    gap: 10,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginVertical: 4,
  },
  bubbleOther: {
    backgroundColor: '#eef2ff',
    alignSelf: 'flex-start',
  },
  bubbleMine: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: theme.text,
    fontSize: 14,
  },
  timeText: {
    color: theme.muted,
    fontSize: 10,
    marginTop: 6,
    textAlign: 'right',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  sendText: {
    color: '#fff',
    fontWeight: '700',
  },
});
