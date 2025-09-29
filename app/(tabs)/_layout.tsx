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
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: "#6b7280",
                headerShown: true,
                headerTitle: "EndoTracker",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                },
                headerRight: () => (
                    <Pressable
                        onPress={showUserMenu}
                        style={{
                            marginRight: 15,
                            backgroundColor: "#2563eb",
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
                    borderTopColor: "#e5e7eb",
                    borderTopWidth: 1,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Log Entry",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="add-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="time-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: "Analytics",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="analytics-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}