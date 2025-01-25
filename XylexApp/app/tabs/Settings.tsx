import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../Components/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

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
          styles.title,
          { color: isDarkMode ? "#8F33E6" : "#8F33E6" }, // Purple title in both themes
        ]}
      >
        Settings
      </Text>

      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.switchLabel,
            { color: isDarkMode ? "#FFFFFF" : "#000000" },
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#8F33E6" }} // Purple toggle track in dark mode
          thumbColor={isDarkMode ? "#FFFFFF" : "#8F33E6"} // White thumb in dark mode, purple in light mode
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
  },
});
