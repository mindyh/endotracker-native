import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Alert } from "react-native";

export default function TabLayout() {
    const router = useRouter();

    const showUserMenu = () => {
        Alert.alert(
            "User Menu",
            "Choose an option",
            [
                { text: "Settings", onPress: () => router.push("/settings") },
                { text: "About", onPress: () => router.push("/about") },
                { text: "Profile", onPress: () => Alert.alert("Profile", "Profile feature coming soon!") },
                { text: "Sign Out", onPress: () => Alert.alert("Sign Out", "Sign out feature coming soon!") },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#4a7c59",
                tabBarInactiveTintColor: "#9ca3af",
                headerShown: true,
                headerTitle: "EndoTracker",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 22,
                    color: "#4a7c59",
                },
                headerStyle: {
                    backgroundColor: "#ffffff",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4,
                },
                headerRight: () => (
                    <Pressable
                        onPress={showUserMenu}
                        style={{
                            marginRight: 15,
                            backgroundColor: "#4a7c59",
                            borderRadius: 20,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Ionicons name="person" size={20} color="#ffffff" />
                    </Pressable>
                ),
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    height: 90,
                    paddingBottom: 20,
                    paddingTop: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: "600",
                    marginTop: 4,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
                tabBarIconStyle: {
                    marginBottom: 2,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Log Entry",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons
                            name={focused ? "add-circle" : "add-circle-outline"}
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons
                            name={focused ? "time" : "time-outline"}
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: "Analytics",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons
                            name={focused ? "analytics" : "analytics-outline"}
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}