import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { apiRequest } from '../services/api';
import { theme } from '../theme';

export default function DashboardScreen() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await apiRequest('/dashboard');
        setMetrics(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={theme.primary} />;
  }

  return (
    <View>
      <Text style={styles.heading}>Performance overview</Text>

      <View style={styles.grid}>
        <StatCard label="Revenue" value={`$${metrics?.totalRevenue?.toFixed(2) || '0.00'}`} tone="primary" />
        <StatCard label="Users" value={String(metrics?.activeUsers || 0)} tone="secondary" />
        <StatCard label="Tasks" value={String(metrics?.tasksCount || 0)} tone="accent" />
        <StatCard label="Pending" value={String(metrics?.pendingPayments || 0)} tone="warn" />
      </View>
    </View>
  );
}

function StatCard({ label, value, tone }) {
  const colors = {
    primary: ['#e0e7ff', '#4f46e5'],
    secondary: ['#e0f2fe', '#0ea5e9'],
    accent: ['#dcfce7', '#22c55e'],
    warn: ['#fef3c7', '#f59e0b'],
  };

  const [bg, text] = colors[tone] || colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: bg }]}> 
      <Text style={[styles.value, { color: text }]}>{value}</Text>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
