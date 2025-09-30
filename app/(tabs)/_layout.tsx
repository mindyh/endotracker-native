import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useState } from "react";
import { COLORS, SHADOWS, FONT_SIZES } from "../../constants/theme";
import UserMenu from "../../components/user-menu";

// Tab configuration
const TAB_CONFIG = [
    { name: "history", title: "History", iconName: "time" },
    { name: "index", title: "Log Event", iconName: "add-circle" },
    { name: "analytics", title: "Analytics", iconName: "analytics" },
] as const;

export default function TabLayout() {
    const [menuVisible, setMenuVisible] = useState(false);

    const showUserMenu = () => {
        setMenuVisible(true);
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
        <>
            <Tabs
                initialRouteName="index"
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.inactive,
                    headerShown: true,
                    headerTitle: TAB_CONFIG.find(tab => tab.name === route.name)?.title || route.name,
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
                })}
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

            <UserMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
            />
        </>
    );
}