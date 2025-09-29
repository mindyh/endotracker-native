import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dailyReminders, setDailyReminders] = useState(false);
    const [dataSync, setDataSync] = useState(true);

    const handleExportData = () => {
        Alert.alert("Export Data", "Your data has been exported successfully!");
    };

    const handleClearData = () => {
        Alert.alert(
            "Clear All Data",
            "Are you sure you want to clear all your data? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear", style: "destructive", onPress: () => {
                        Alert.alert("Success", "All data has been cleared.");
                    }
                }
            ]
        );
    };

    const renderSettingItem = (
        title: string,
        subtitle: string,
        icon: string,
        onPress?: () => void,
        rightElement?: React.ReactNode
    ) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon as any} size={24} color="#2563eb" />
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingSubtitle}>{subtitle}</Text>
                </View>
            </View>
            {rightElement || (onPress && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />)}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    {renderSettingItem(
                        "Push Notifications",
                        "Receive notifications for reminders and updates",
                        "notifications-outline",
                        undefined,
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
                            thumbColor={notificationsEnabled ? "#2563eb" : "#f3f4f6"}
                        />
                    )}
                    {renderSettingItem(
                        "Daily Reminders",
                        "Get reminded to log your symptoms daily",
                        "alarm-outline",
                        undefined,
                        <Switch
                            value={dailyReminders}
                            onValueChange={setDailyReminders}
                            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
                            thumbColor={dailyReminders ? "#2563eb" : "#f3f4f6"}
                        />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data & Privacy</Text>
                    {renderSettingItem(
                        "Cloud Sync",
                        "Sync your data across devices",
                        "cloud-outline",
                        undefined,
                        <Switch
                            value={dataSync}
                            onValueChange={setDataSync}
                            trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
                            thumbColor={dataSync ? "#2563eb" : "#f3f4f6"}
                        />
                    )}
                    {renderSettingItem(
                        "Export Data",
                        "Download your data as a CSV file",
                        "download-outline",
                        handleExportData
                    )}
                    {renderSettingItem(
                        "Privacy Policy",
                        "Read our privacy policy",
                        "shield-checkmark-outline",
                        () => Alert.alert("Privacy Policy", "Privacy policy would open here")
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App</Text>
                    {renderSettingItem(
                        "Theme",
                        "Light theme",
                        "color-palette-outline",
                        () => Alert.alert("Theme", "Theme selection would open here")
                    )}
                    {renderSettingItem(
                        "Language",
                        "English",
                        "language-outline",
                        () => Alert.alert("Language", "Language selection would open here")
                    )}
                    {renderSettingItem(
                        "Help & Support",
                        "Get help and contact support",
                        "help-circle-outline",
                        () => Alert.alert("Help", "Help center would open here")
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Danger Zone</Text>
                    <TouchableOpacity style={styles.dangerItem} onPress={handleClearData}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="trash-outline" size={24} color="#ef4444" />
                            <View style={styles.settingText}>
                                <Text style={[styles.settingTitle, { color: "#ef4444" }]}>Clear All Data</Text>
                                <Text style={styles.settingSubtitle}>Permanently delete all your data</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                <View style={styles.versionInfo}>
                    <Text style={styles.versionText}>EndoTracker v1.0.0</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4a7c59",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#1f2937",
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    settingItem: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    dangerItem: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    settingText: {
        marginLeft: 12,
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1f2937",
    },
    settingSubtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
    },
    versionInfo: {
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 20,
    },
    versionText: {
        fontSize: 12,
        color: "#9ca3af",
    },
});