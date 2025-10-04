import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SHADOWS, SPACING } from "../constants/theme";

interface AboutDrawerContentProps {
    onClose?: () => void;
}

export default function AboutDrawerContent({ onClose }: AboutDrawerContentProps) {
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Ionicons name="medical" size={48} color={COLORS.accent} />
                    </View>
                    <Text style={styles.appName}>EndoTracker</Text>
                    <Text style={styles.version}>Version 1.0.0</Text>
                    <Text style={styles.tagline}>Your pain is real.</Text>
                </View>

                {renderInfoCard(
                    "Our Mission",
                    "EndoTracker is designed to help individuals with endometriosis and other chronic conditions track their symptoms, identify patterns, and communicate more effectively with their healthcare providers. We believe in empowering patients with data-driven insights.",
                    "heart-outline"
                )}

                {renderInfoCard(
                    "Privacy First",
                    "Your health data is private and secure. All information is stored locally on your device and only shared when you explicitly choose to export or sync your data. We never sell or share your personal health information.",
                    "shield-checkmark-outline"
                )}

                {renderInfoCard(
                    "Evidence-Based",
                    "This app was developed in consultation with healthcare professionals and endometriosis specialists. Our symptom tracking categories and pain scales are based on validated medical research and clinical best practices.",
                    "library-outline"
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resources</Text>

                    {renderLinkItem(
                        "Endometriosis Foundation",
                        "Learn more about endometriosis",
                        "information-circle-outline",
                        "https://www.endofound.org"
                    )}

                    {renderLinkItem(
                        "Nancy's Nook",
                        "Education and support community",
                        "people-outline",
                        "https://www.facebook.com/groups/NancysNookEndo"
                    )}

                    {renderLinkItem(
                        "iCareBetter",
                        "Find endometriosis specialists",
                        "medical-outline",
                        "https://www.icarebetter.com"
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>

                    {renderLinkItem(
                        "User Guide",
                        "Learn how to use EndoTracker effectively",
                        "book-outline",
                        "https://endotracker.com/guide"
                    )}

                    {renderLinkItem(
                        "Contact Support",
                        "Get help with technical issues",
                        "mail-outline",
                        "mailto:support@endotracker.com"
                    )}

                    {renderLinkItem(
                        "Feature Requests",
                        "Suggest new features or improvements",
                        "bulb-outline",
                        "https://endotracker.com/feedback"
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Legal</Text>

                    {renderLinkItem(
                        "Privacy Policy",
                        "How we protect your data",
                        "document-text-outline",
                        "https://endotracker.com/privacy"
                    )}

                    {renderLinkItem(
                        "Terms of Service",
                        "Terms and conditions of use",
                        "document-outline",
                        "https://endotracker.com/terms"
                    )}

                    {renderLinkItem(
                        "Open Source Licenses",
                        "Third-party software licenses",
                        "code-outline",
                        "https://endotracker.com/licenses"
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        EndoTracker is not a substitute for professional medical advice.
                        Always consult with your healthcare provider about your symptoms and treatment options.
                    </Text>
                    <Text style={styles.copyright}>
                        © 2024 EndoTracker. Made with ❤️ for the endo community.
                    </Text>
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
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
        paddingVertical: SPACING.lg,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.accent + "20",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SPACING.md,
    },
    appName: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    version: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
    },
    tagline: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.accent,
        fontStyle: "italic",
    },
    infoCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.small,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
    },
    cardTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.primary,
        marginLeft: SPACING.md,
    },
    cardContent: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textSecondary,
        lineHeight: 22,
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
    linkItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        marginBottom: SPACING.xs,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.small,
    },
    linkLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    linkText: {
        marginLeft: SPACING.md,
        flex: 1,
    },
    linkTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    linkSubtitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
    footer: {
        marginTop: SPACING.xl,
        paddingTop: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.neutral,
        alignItems: "center",
    },
    footerText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: SPACING.md,
        fontStyle: "italic",
    },
    copyright: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textTertiary,
        textAlign: "center",
    },
});
