import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import registerNNPushToken from "native-notify";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./Components/ThemeContext"; // Import the ThemeProvider

type Notification = {
  appId: number;
  appToken: string;
  title: string;
  body: string;
  dateSent: string;
};

export default function Layout() {
  // Register Native Notify
  registerNNPushToken(26549, "Ks9916DZmXhz0E5H0CEA9B");

  // State to trigger notification refresh
  const [newNotificationTrigger, setNewNotificationTrigger] = useState(0);

  useEffect(() => {
    const handleNotification = async (notification: Notification) => {
      console.log("Notification received:", notification);

      try {
        // Retrieve existing Inbox notifications
        const storedInbox = await AsyncStorage.getItem("inbox");
        const inboxNotifications = storedInbox ? JSON.parse(storedInbox) : [];

        // Add the new notification to the Inbox
        const updatedInbox = [...inboxNotifications, notification];
        console.log("Updated Inbox:", updatedInbox);

        // Save the updated Inbox back to AsyncStorage
        await AsyncStorage.setItem("inbox", JSON.stringify(updatedInbox));

        // Trigger a refresh for the Notifications page
        setNewNotificationTrigger((prev) => prev + 1);
        console.log("Notifications successfully saved to AsyncStorage.");
      } catch (error) {
        console.error("Error saving notification:", error);
      }
    };

    // Listen for incoming notifications
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Raw notification payload:", notification);

      // Extract title and body from notification
      const data = notification.request.content;
      const newNotification: Notification = {
        appId: 26549,
        appToken: "Ks9916DZmXhz0E5H0CEA9B",
        title: data.title || "No Title",
        body: data.body || "No Body",
        dateSent: new Date().toISOString(),
      };

      handleNotification(newNotification);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomePage"
          options={{ headerShown: false }}
          initialParams={{ newNotificationTrigger }}
        />
      </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
