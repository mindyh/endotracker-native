import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from "../../constants/theme";

const { width } = Dimensions.get("window");

export default function AnalyticsScreen() {
    // Mock data for analytics
    const averagePainLevel = 6.3;
    const totalEvents = 12;
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

                <View style={styles.statsContainer}>
                    {renderStatCard("Average Pain Level", averagePainLevel.toFixed(1), "analytics-outline", COLORS.error)}
                    {renderStatCard("Total Events", totalEvents, "document-text-outline", COLORS.accent)}
                    {renderStatCard("This Week", "3 events", "calendar-outline", COLORS.success)}
                    {renderStatCard("Trend", "Improving", "trending-up-outline", COLORS.warning)}
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
                        <Ionicons name="bulb-outline" size={20} color={COLORS.warning} />
                        <Text style={styles.insightText}>
                            Your pain levels tend to be higher on weekdays. Consider tracking stress levels.
                        </Text>
                    </View>
                    <View style={styles.insightCard}>
                        <Ionicons name="medical-outline" size={20} color={COLORS.accent} />
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
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.lg,
    },
    // title style removed
    statsContainer: {
        marginBottom: SPACING.xl,
    },
    statCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    statHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.sm,
    },
    statTitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textTertiary,
        marginLeft: SPACING.sm,
        fontWeight: FONT_WEIGHTS.medium,
    },
    statValue: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    chartSection: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    symptomChart: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    symptomItem: {
        marginBottom: SPACING.md,
    },
    symptomName: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.medium,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    symptomBarContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    symptomBar: {
        height: 8,
        backgroundColor: COLORS.accent,
        borderRadius: BORDER_RADIUS.sm,
        marginRight: SPACING.sm,
    },
    symptomCount: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        fontWeight: FONT_WEIGHTS.medium,
    },
    insightsSection: {
        marginBottom: SPACING.lg,
    },
    insightCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.neutral,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    insightText: {
        flex: 1,
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.sm,
        lineHeight: 20,
    },
});