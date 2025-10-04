import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from "../constants/theme";

interface SettingsDrawerContentProps {
    onClose?: () => void;
}

export default function SettingsDrawerContent({ onClose }: SettingsDrawerContentProps) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dailyReminders, setDailyReminders] = useState(false);
    const [dataSync, setDataSync] = useState(true);

    const handleExportData = () => {
        Alert.alert("Export Data", "Your data has been exported successfully!");
    };

    const handleEventTypesSettings = () => {
        onClose?.();
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
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
                            trackColor={{ false: COLORS.inactive, true: COLORS.accent }}
                            thumbColor={notificationsEnabled ? COLORS.white : COLORS.textTertiary}
                        />
                    )}
                    {renderSettingItem(
                        "Daily Reminders",
                        "Get daily reminders to log your symptoms",
                        "alarm-outline",
                        undefined,
                        <Switch
                            value={dailyReminders}
                            onValueChange={setDailyReminders}
                            trackColor={{ false: COLORS.inactive, true: COLORS.accent }}
                            thumbColor={dailyReminders ? COLORS.white : COLORS.textTertiary}
                        />
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
                            trackColor={{ false: COLORS.inactive, true: COLORS.accent }}
                            thumbColor={dataSync ? COLORS.white : COLORS.textTertiary}
                        />
                    )}
                    {renderSettingItem(
                        "Export Data",
                        "Export your data as CSV or JSON",
                        "download-outline",
                        handleExportData
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customization</Text>
                    {renderSettingItem(
                        "Event Types",
                        "Manage your symptom and event types",
                        "list-outline",
                        handleEventTypesSettings
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: SPACING.lg,
    },
    section: {
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.primary,
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.xs,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        marginBottom: SPACING.xs,
        borderRadius: BORDER_RADIUS.lg,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    settingText: {
        marginLeft: SPACING.md,
        flex: 1,
    },
    settingTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    settingSubtitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
});