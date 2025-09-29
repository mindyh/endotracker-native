import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Alert } from "react-native";
import { COLORS, SHADOWS, FONT_SIZES } from "../../constants/theme";

// Tab configuration
const TAB_CONFIG = [
    { name: "index", title: "Log Entry", iconName: "add-circle" },
    { name: "history", title: "History", iconName: "time" },
    { name: "analytics", title: "Analytics", iconName: "analytics" },
] as const;

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

    // Reusable tab icon component
    const createTabIcon = (iconName: string) => {
        const TabIcon = ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <Ionicons
                name={focused ? iconName as any : `${iconName}-outline` as any}
                size={focused ? size + 2 : size}
                color={color}
            />
        );
        TabIcon.displayName = `TabIcon_${iconName}`;
        return TabIcon;
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.inactive,
                headerShown: true,
                headerTitle: "EndoTracker",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: FONT_SIZES.xxl,
                    color: COLORS.primary,
                },
                headerStyle: {
                    backgroundColor: COLORS.white,
                    ...SHADOWS.small,
                },
                headerRight: () => (
                    <Pressable
                        onPress={showUserMenu}
                        style={{
                            marginRight: 15,
                            backgroundColor: COLORS.primary,
                            borderRadius: 20,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Ionicons name="person" size={20} color={COLORS.white} />
                    </Pressable>
                ),
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    height: 90,
                    paddingBottom: 20,
                    paddingTop: 10,
                    ...SHADOWS.large,
                    shadowOffset: { width: 0, height: -2 },
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
            {TAB_CONFIG.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: createTabIcon(tab.iconName),
                    }}
                />
            ))}
        </Tabs>
    );
}