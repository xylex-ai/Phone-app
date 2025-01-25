import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../Components/ThemeContext"; // Import the ThemeContext

type UserInfo = {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  user_id: string;
};

const mockUserInfo: UserInfo = {
  email: "ash3152003@gmail.com",
  email_verified: false,
  phone_verified: false,
  user_id: "9d04951d-adfa-4add-a48c-8b17b379b7e8",
};

export default function Account() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          { color: isDarkMode ? "#FFFFFF" : "#000000" },
        ]}
      >
        Account Overview
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{mockUserInfo.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Email Verified</Text>
        <Text style={styles.value}>
          {mockUserInfo.email_verified ? "Yes" : "No"}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Phone Verified</Text>
        <Text style={styles.value}>
          {mockUserInfo.phone_verified ? "Yes" : "No"}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>{mockUserInfo.user_id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoCard: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#1E1E1E",
  },
  label: {
    fontSize: 16,
    color: "#8F33E6",
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 5,
  },
});
