import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useTheme } from "../../Components/ThemeContext";
import { supabase } from "../../lib/supabase";

export default function Account() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [userInfo, setUserInfo] = useState({
    email: '',
    email_verified: false,
    phone_verified: false,
    user_id: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserInfo({
          email: user.email ?? '',
          email_verified: user.email_confirmed_at !== null,
          phone_verified: user.phone ? true : false,
          user_id: user.id,
        });
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>Acount</Text>

      <View style={styles.profileContainer}>
        <Image
          source={require("../../templates/default_pfp.png")} // later fetch from database
          style={styles.profileImage}
        />
        <Ionicons name="pencil" size={18} color="#fff" style={styles.editIcon} />
        <TextInput
          style={[styles.nameInput, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="User"
          placeholderTextColor="#888"
          value={userInfo.email.split('@')[0]}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <SettingRow icon="mail" label="Email" value={userInfo.email} />
        <SettingRow icon="shield-checkmark" label="Email Verified" value={userInfo.email_verified ? 'Yes' : 'No'} />
        <SettingRow icon="call" label="Phone Verified" value={userInfo.phone_verified ? 'Yes' : 'No'} />
        <SettingRow icon="finger-print" label="User ID" value={userInfo.user_id.slice(0, 12) + '...'} />
      </View>
    </ScrollView>
  );
}

function SettingRow({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color="#8F33E6" style={{ marginRight: 10 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 120,
    backgroundColor: '#8F33E6',
    padding: 6,
    borderRadius: 12,
  },
  nameInput: {
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  value: {
    fontSize: 14,
    color: '#aaa',
  },
});
