import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../Components/ThemeContext';
import { supabase } from '../../lib/supabase';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const router = useRouter();

  const handleLogout = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('users')
        .update({ push_token: null })
        .eq('user_id', user.id);

      await AsyncStorage.removeItem('expoPushToken');
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Logout failed", error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDarkMode ? '#8F33E6' : '#8F33E6' },
        ]}
      >
        Settings
      </Text>

      {/* Theme Toggle */}
      <View style={styles.itemRow}>
        <View style={styles.iconLabel}>
          <Ionicons name="moon" size={22} color="#8F33E6" />
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#000' }]}>
            Dark Mode
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#8F33E6' }}
          thumbColor={isDarkMode ? '#FFFFFF' : '#8F33E6'}
        />
      </View>


      {/* Log Out */}
      <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
        <View style={styles.iconLabel}>
          <Feather name="log-out" size={22} color="#FF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
  },
  logoutRow: {
    marginTop: 50,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4444',
    fontWeight: 'bold',
  },
});
