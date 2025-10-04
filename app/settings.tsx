import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from "../constants/theme";

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dailyReminders, setDailyReminders] = useState(false);
    const [dataSync, setDataSync] = useState(true);

    const handleExportData = () => {
        Alert.alert("Export Data", "Your data has been exported successfully!");
    };

    const handleEventTypesSettings = () => {
        router.push("/event-types-settings");
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
                <Ionicons name={icon as any} size={24} color={COLORS.accent} />
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingSubtitle}>{subtitle}</Text>
                </View>
            </View>
            {rightElement || (onPress && <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />)}
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
                            trackColor={{ false: COLORS.gray300, true: "#93c5fd" }}
                            thumbColor={notificationsEnabled ? COLORS.accent : COLORS.gray100}
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
                            trackColor={{ false: COLORS.gray300, true: "#93c5fd" }}
                            thumbColor={dailyReminders ? COLORS.accent : COLORS.gray100}
                        />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customization</Text>
                    {renderSettingItem(
                        "Event Types",
                        "Customize the types of events you can log",
                        "options-outline",
                        handleEventTypesSettings
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data</Text>
                    {renderSettingItem(
                        "Cloud Sync",
                        "Sync your data across devices",
                        "cloud-outline",
                        undefined,
                        <Switch
                            value={dataSync}
                            onValueChange={setDataSync}
                            trackColor={{ false: COLORS.gray300, true: "#93c5fd" }}
                            thumbColor={dataSync ? COLORS.accent : COLORS.gray100}
                        />
                    )}
                    {renderSettingItem(
                        "Export Data",
                        "Download your data as a CSV file",
                        "download-outline",
                        handleExportData
                    )}
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
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        marginBottom: SPACING.lg,
        textAlign: "center",
        color: COLORS.textPrimary,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    settingItem: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    dangerItem: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
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
        marginLeft: SPACING.sm,
        flex: 1,
    },
    settingTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.textPrimary,
    },
    settingSubtitle: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        marginTop: 2,
    },
    versionInfo: {
        alignItems: "center",
        marginTop: SPACING.lg,
        paddingBottom: SPACING.lg,
    },
    versionText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
    },
});