import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
                <Ionicons name={icon as any} size={24} color="#2563eb" />
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <Text style={styles.cardContent}>{content}</Text>
        </View>
    );

    const renderLinkItem = (title: string, subtitle: string, icon: string, url: string) => (
        <TouchableOpacity style={styles.linkItem} onPress={() => openURL(url)}>
            <View style={styles.linkLeft}>
                <Ionicons name={icon as any} size={24} color="#2563eb" />
                <View style={styles.linkText}>
                    <Text style={styles.linkTitle}>{title}</Text>
                    <Text style={styles.linkSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#9ca3af" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Ionicons name="medical" size={48} color="#2563eb" />
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
        backgroundColor: "#4a7c59",
    },
    content: {
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        paddingVertical: 20,
    },
    logo: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    appName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 4,
    },
    version: {
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        color: "#374151",
        textAlign: "center",
        fontStyle: "italic",
    },
    infoCard: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2937",
        marginLeft: 12,
    },
    cardContent: {
        fontSize: 14,
        color: "#374151",
        lineHeight: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 16,
    },
    linkItem: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    linkLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    linkText: {
        marginLeft: 12,
        flex: 1,
    },
    linkTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1f2937",
    },
    linkSubtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
    },
    footer: {
        alignItems: "center",
        paddingVertical: 30,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: "#374151",
        textAlign: "center",
        marginBottom: 8,
    },
    copyright: {
        fontSize: 12,
        color: "#9ca3af",
        textAlign: "center",
    },
});