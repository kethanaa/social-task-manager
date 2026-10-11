import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TasksScreen from './src/screens/TasksScreen';
import ChatScreen from './src/screens/ChatScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import { theme } from './src/theme';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = useMemo(
    () => [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'tasks', label: 'Forms' },
      { key: 'chat', label: 'Chat' },
      { key: 'payments', label: 'Payments' },
    ],
    []
  );

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello</Text>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'tasks' && <TasksScreen />}
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'payments' && <PaymentsScreen />}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#dfe7ff',
    fontSize: 14,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: theme.primary,
  },
  tabText: {
    color: '#4b5563',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
});
