import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from "../../constants/theme";

interface HistoryEntry {
    id: string;
    date: string;
    symptoms: string;
    painLevel: number;
    notes?: string;
}

// Mock data for demonstration
const mockHistory: HistoryEntry[] = [
    {
        id: "1",
        date: "2024-09-29",
        symptoms: "Abdominal pain, bloating",
        painLevel: 7,
        notes: "Pain was worse in the morning"
    },
    {
        id: "2",
        date: "2024-09-28",
        symptoms: "Mild cramping",
        painLevel: 4,
        notes: "Manageable with rest"
    },
    {
        id: "3",
        date: "2024-09-27",
        symptoms: "Severe pelvic pain",
        painLevel: 9,
        notes: "Required medication"
    },
];

export default function HistoryScreen() {
    const renderHistoryItem = (item: HistoryEntry) => (
        <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyHeader}>
                <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</Text>
                <View style={styles.painLevelBadge}>
                    <Text style={styles.painLevelText}>{item.painLevel}/10</Text>
                </View>
            </View>
            <Text style={styles.symptomsText}>{item.symptoms}</Text>
            {item.notes && (
                <Text style={styles.notesText}>{item.notes}</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Symptom History</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={20} color={COLORS.accent} />
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.historyList}>
                {mockHistory.length > 0 ? (
                    mockHistory.map(renderHistoryItem)
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-outline" size={64} color={COLORS.textTertiary} />
                        <Text style={styles.emptyStateText}>No entries yet</Text>
                        <Text style={styles.emptyStateSubtext}>Start logging your symptoms to see your history here</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.accent,
    },
    filterButtonText: {
        color: COLORS.accent,
        marginLeft: SPACING.xs,
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.medium,
    },
    historyList: {
        flex: 1,
        padding: SPACING.lg,
    },
    historyItem: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING.sm,
    },
    dateText: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
    },
    painLevelBadge: {
        backgroundColor: COLORS.error,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    painLevelText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    symptomsText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    notesText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        fontStyle: "italic",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyStateText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textTertiary,
        marginVertical: SPACING.sm,
    },
    emptyStateSubtext: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textTertiary,
        textAlign: "center",
        maxWidth: 240,
    },
});