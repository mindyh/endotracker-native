import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from "../constants/theme";

export default function AboutScreen() {
    const openURL = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Error", `Cannot open URL: ${url}`);
        }
    };

    const renderInfoCard = (title: string, content: string, icon: string) => (
        <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
                <Ionicons name={icon as any} size={24} color={COLORS.accent} />
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <Text style={styles.cardContent}>{content}</Text>
        </View>
    );

    const renderLinkItem = (title: string, subtitle: string, icon: string, url: string) => (
        <TouchableOpacity style={styles.linkItem} onPress={() => openURL(url)}>
            <View style={styles.linkLeft}>
                <Ionicons name={icon as any} size={24} color={COLORS.accent} />
                <View style={styles.linkText}>
                    <Text style={styles.linkTitle}>{title}</Text>
                    <Text style={styles.linkSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <Ionicons name="open-outline" size={20} color={COLORS.textTertiary} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Ionicons name="medical" size={48} color={COLORS.accent} />
                    </View>
                    <Text style={styles.appName}>EndoTracker</Text>
                    <Text style={styles.version}>Version 1.0.0</Text>
                    <Text style={styles.tagline}>Your personal endometriosis companion</Text>
                </View>

                {renderInfoCard(
                    "About EndoTracker",
                    "EndoTracker is a comprehensive symptom tracking app designed specifically for individuals with endometriosis. Track your symptoms, analyze patterns, and share valuable insights with your healthcare provider.",
                    "information-circle-outline"
                )}

                {renderInfoCard(
                    "Features",
                    "• Log daily symptoms and pain levels\n• View comprehensive history of entries\n• Analyze patterns with detailed analytics\n• Export data for medical appointments\n• Secure cloud synchronization\n• Customizable reminders",
                    "list-outline"
                )}

                {renderInfoCard(
                    "Privacy & Security",
                    "Your health data is private and secure. We use industry-standard encryption to protect your information and never share your personal data with third parties without your explicit consent.",
                    "shield-checkmark-outline"
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resources</Text>
                    {renderLinkItem(
                        "Endometriosis Foundation",
                        "Learn more about endometriosis",
                        "library-outline",
                        "https://www.endofound.org"
                    )}
                    {renderLinkItem(
                        "Medical Resources",
                        "Find healthcare providers",
                        "medical-outline",
                        "https://www.endometriosis.org"
                    )}
                    {renderLinkItem(
                        "Support Community",
                        "Connect with others",
                        "people-outline",
                        "https://www.reddit.com/r/endometriosis"
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact & Support</Text>
                    {renderLinkItem(
                        "Contact Support",
                        "Get help with the app",
                        "mail-outline",
                        "mailto:support@endotracker.com"
                    )}
                    {renderLinkItem(
                        "Feature Requests",
                        "Suggest new features",
                        "bulb-outline",
                        "mailto:feedback@endotracker.com"
                    )}
                    {renderLinkItem(
                        "Report Bug",
                        "Report technical issues",
                        "bug-outline",
                        "mailto:bugs@endotracker.com"
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Made with ❤️ for the endometriosis community
                    </Text>
                    <Text style={styles.copyright}>
                        © 2024 EndoTracker. All rights reserved.
                    </Text>
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
    header: {
        alignItems: "center",
        marginBottom: SPACING.xl,
        paddingVertical: SPACING.lg,
    },
    logo: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.small,
    },
    appName: {
        fontSize: 28,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    version: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textTertiary,
        marginBottom: SPACING.sm,
    },
    tagline: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
        textAlign: "center",
        fontStyle: "italic",
    },
    infoCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.sm,
    },
    cardTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
        marginLeft: SPACING.sm,
    },
    cardContent: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    linkItem: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    linkLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    linkText: {
        marginLeft: SPACING.sm,
        flex: 1,
    },
    linkTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.textPrimary,
    },
    linkSubtitle: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        marginTop: 2,
    },
    footer: {
        alignItems: "center",
        paddingVertical: SPACING.xl,
        borderTopWidth: 1,
        borderTopColor: COLORS.neutral,
        marginTop: SPACING.lg,
    },
    footerText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: SPACING.sm,
    },
    copyright: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        textAlign: "center",
    },
});