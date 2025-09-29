import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function AnalyticsScreen() {
    // Mock data for analytics
    const averagePainLevel = 6.3;
    const totalEntries = 12;
    const symptomFrequency = [
        { symptom: "Abdominal pain", count: 8 },
        { symptom: "Bloating", count: 6 },
        { symptom: "Pelvic pain", count: 4 },
        { symptom: "Cramping", count: 3 },
    ];

    const renderStatCard = (title: string, value: string | number, icon: string, color: string) => (
        <View style={[styles.statCard, { borderLeftColor: color }]}>
            <View style={styles.statHeader}>
                <Ionicons name={icon as any} size={24} color={color} />
                <Text style={styles.statTitle}>{title}</Text>
            </View>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
        </View>
    );

    const renderSymptomBar = (symptom: string, count: number, maxCount: number) => {
        const percentage = (count / maxCount) * 100;
        const barWidth = (percentage / 100) * (width - 80);

        return (
            <View key={symptom} style={styles.symptomItem}>
                <Text style={styles.symptomName}>{symptom}</Text>
                <View style={styles.symptomBarContainer}>
                    <View style={[styles.symptomBar, { width: barWidth }]} />
                    <Text style={styles.symptomCount}>{count}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Analytics</Text>

                <View style={styles.statsContainer}>
                    {renderStatCard("Average Pain Level", averagePainLevel.toFixed(1), "analytics-outline", "#ef4444")}
                    {renderStatCard("Total Entries", totalEntries, "document-text-outline", "#2563eb")}
                    {renderStatCard("This Week", "3 entries", "calendar-outline", "#059669")}
                    {renderStatCard("Trend", "Improving", "trending-up-outline", "#f59e0b")}
                </View>

                <View style={styles.chartSection}>
                    <Text style={styles.sectionTitle}>Most Common Symptoms</Text>
                    <View style={styles.symptomChart}>
                        {symptomFrequency.map((item) =>
                            renderSymptomBar(item.symptom, item.count, Math.max(...symptomFrequency.map(s => s.count)))
                        )}
                    </View>
                </View>

                <View style={styles.insightsSection}>
                    <Text style={styles.sectionTitle}>Insights</Text>
                    <View style={styles.insightCard}>
                        <Ionicons name="bulb-outline" size={20} color="#f59e0b" />
                        <Text style={styles.insightText}>
                            Your pain levels tend to be higher on weekdays. Consider tracking stress levels.
                        </Text>
                    </View>
                    <View style={styles.insightCard}>
                        <Ionicons name="medical-outline" size={20} color="#2563eb" />
                        <Text style={styles.insightText}>
                            Abdominal pain is your most frequent symptom. Discuss dietary triggers with your doctor.
                        </Text>
                    </View>
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
    statsContainer: {
        marginBottom: 30,
    },
    statCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    statHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    statTitle: {
        fontSize: 14,
        color: "#6b7280",
        marginLeft: 8,
        fontWeight: "500",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
    },
    chartSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 16,
    },
    symptomChart: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    symptomItem: {
        marginBottom: 16,
    },
    symptomName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#374151",
        marginBottom: 4,
    },
    symptomBarContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    symptomBar: {
        height: 8,
        backgroundColor: "#2563eb",
        borderRadius: 4,
        marginRight: 8,
    },
    symptomCount: {
        fontSize: 12,
        color: "#6b7280",
        fontWeight: "500",
    },
    insightsSection: {
        marginBottom: 20,
    },
    insightCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    insightText: {
        flex: 1,
        fontSize: 14,
        color: "#374151",
        marginLeft: 12,
        lineHeight: 20,
    },
});