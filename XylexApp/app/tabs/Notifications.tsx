import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useTheme } from "../Components/ThemeContext"; // Import the ThemeContext

type Notification = {
  title: string;
  body: string;
  dateSent?: string;
};

type NotificationsProps = {
  newNotificationTrigger: number;
};

export default function Notifications({ newNotificationTrigger }: NotificationsProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [inbox, setInbox] = useState<Notification[]>([]);
  const [archive, setArchive] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<"Inbox" | "Archive">("Inbox");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchNotifications = async () => {
    try {
      const storedInbox = await AsyncStorage.getItem("inbox");
      const storedArchive = await AsyncStorage.getItem("archive");

      const inboxNotifications = storedInbox ? JSON.parse(storedInbox) : [];
      const archiveNotifications = storedArchive ? JSON.parse(storedArchive) : [];

      setInbox(inboxNotifications);
      setArchive(archiveNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [newNotificationTrigger]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const archiveNotification = async (index: number) => {
    try {
      const updatedInbox = [...inbox];
      const [archivedNotification] = updatedInbox.splice(index, 1);

      const updatedArchive = [...archive, archivedNotification];

      setInbox(updatedInbox);
      setArchive(updatedArchive);

      await AsyncStorage.setItem("inbox", JSON.stringify(updatedInbox));
      await AsyncStorage.setItem("archive", JSON.stringify(updatedArchive));
    } catch (error) {
      console.error("Error archiving notification:", error);
    }
  };

  const deleteNotification = async (index: number, type: "Inbox" | "Archive") => {
    try {
      if (type === "Inbox") {
        const updatedInbox = [...inbox];
        updatedInbox.splice(index, 1);

        setInbox(updatedInbox);
        await AsyncStorage.setItem("inbox", JSON.stringify(updatedInbox));
      } else {
        const updatedArchive = [...archive];
        updatedArchive.splice(index, 1);

        setArchive(updatedArchive);
        await AsyncStorage.setItem("archive", JSON.stringify(updatedArchive));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const renderRightActions = (type: "Inbox" | "Archive", index: number) => {
    if (type === "Inbox") {
      return (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.archiveButton}
            onPress={() => archiveNotification(index)}
          >
            <Text style={styles.archiveButtonText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteNotification(index, "Inbox")}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (type === "Archive") {
      return (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(index, "Archive")}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      );
    }
  };

  const currentData = currentTab === "Inbox" ? inbox : archive;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" },
      ]}
    >
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentTab === "Inbox" ? styles.activeTab : null]}
          onPress={() => setCurrentTab("Inbox")}
        >
          <Text
            style={[
              styles.tabText,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
          >
            Inbox
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentTab === "Archive" ? styles.activeTab : null]}
          onPress={() => setCurrentTab("Archive")}
        >
          <Text
            style={[
              styles.tabText,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
          >
            Archive
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5",
            color: isDarkMode ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder={`Search ${currentTab.toLowerCase()}...`}
        placeholderTextColor={isDarkMode ? "#AAAAAA" : "#555555"}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {currentData.length === 0 ? (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text
            style={[
              styles.noNotifications,
              { color: isDarkMode ? "#AAAAAA" : "#555555" },
            ]}
          >
            No {currentTab.toLowerCase()} notifications found.
          </Text>
        </ScrollView>
      ) : (
        <FlatList
          data={currentData.filter((notification) =>
            notification.title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Swipeable
              renderRightActions={() => renderRightActions(currentTab, index)}
            >
              <View
                style={[
                  styles.notificationItem,
                  { backgroundColor: isDarkMode ? "#1E1E1E" : "#F9F9F9" },
                ]}
              >
                <Text
                  style={[
                    styles.notificationTitle,
                    { color: isDarkMode ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.notificationBody,
                    { color: isDarkMode ? "#CCCCCC" : "#555555" },
                  ]}
                >
                  {item.body}
                </Text>
                {item.dateSent && (
                  <Text
                    style={[
                      styles.notificationDate,
                      { color: isDarkMode ? "#888888" : "#999999" },
                    ]}
                  >
                    Sent: {new Date(item.dateSent).toLocaleString()}
                  </Text>
                )}
              </View>
            </Swipeable>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#8F33E6",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  noNotifications: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  notificationItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationBody: {
    fontSize: 14,
    marginTop: 5,
  },
  notificationDate: {
    fontSize: 12,
    marginTop: 5,
  },
  actionButtonsContainer: {
    flexDirection: "row",
  },
  archiveButton: {
    backgroundColor: "#0066CC",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 8,
    marginRight: 5,
  },
  archiveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
