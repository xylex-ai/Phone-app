import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { useTheme } from "./Components/ThemeContext"; // Import the ThemeContext
import Account from "./tabs/Account";
import Notifications from "./tabs/Notifications";
import Settings from "./tabs/Settings";

const Tab = createBottomTabNavigator();

export default function HomePage({ route }: { route: any }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const newNotificationTrigger = route?.params?.newNotificationTrigger || 0;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
        },
        tabBarActiveTintColor: "#8F33E6",
        tabBarInactiveTintColor: isDarkMode ? "#aaaaaa" : "#888888",
      }}
    >
      <Tab.Screen
        name="Account Overview"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./templates/user.png")}
              style={[
                styles.tabIcon,
                { tintColor: focused ? "#8F33E6" : isDarkMode ? "#aaa" : "#888" },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./templates/notification-bell.png")}
              style={[
                styles.tabIcon,
                { tintColor: focused ? "#8F33E6" : isDarkMode ? "#aaa" : "#888" },
              ]}
            />
          ),
        }}
      >
        {() => <Notifications newNotificationTrigger={newNotificationTrigger} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./templates/setting.png")}
              style={[
                styles.tabIcon,
                { tintColor: focused ? "#8F33E6" : isDarkMode ? "#aaa" : "#888" },
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#FFFFFF",
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#8F33E6",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
});
