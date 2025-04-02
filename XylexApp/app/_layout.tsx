import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./Components/ThemeContext";
import { registerForPushNotificationsAsync } from "./RegisterForPushNotifications";

type Notification = {
  title: string;
  body: string;
  dateSent: string;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Layout() {
  useEffect(() => {
    const initNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log("✅ Push token:", token);
        // Optionally store in Supabase/backend
      }

      const subscription = Notifications.addNotificationReceivedListener(
        async (notification) => {
          const data = notification.request.content;
          const newNotification: Notification = {
            title: data.title || "No Title",
            body: data.body || "No Body",
            dateSent: new Date().toISOString(),
          };

          try {
            const storedInbox = await AsyncStorage.getItem("inbox");
            const inboxNotifications = storedInbox
              ? JSON.parse(storedInbox)
              : [];
            const updatedInbox = [...inboxNotifications, newNotification];
            await AsyncStorage.setItem("inbox", JSON.stringify(updatedInbox));
          } catch (err) {
            console.error("Failed to store notification:", err);
          }
        }
      );

      return () => {
        subscription.remove();
      };
    };

    initNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
