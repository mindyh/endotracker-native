import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from "../../constants/theme";
import { useEventHistory } from '../../contexts/EventHistoryContext';

// Helper functions
const formatPainLocations = (locationKeys: string[]): string => {
    const PAIN_LOCATIONS = [
        { key: 'pelvis', label: 'Pelvis' },
        { key: 'left-hip', label: 'Left Hip' },
        { key: 'right-hip', label: 'Right Hip' },
        { key: 'left-leg', label: 'Left Leg' },
        { key: 'right-leg', label: 'Right Leg' },
        { key: 'lower-back', label: 'Lower Back' },
        { key: 'rectum', label: 'Rectum' },
    ];

    return locationKeys
        .map(key => PAIN_LOCATIONS.find(loc => loc.key === key)?.label)
        .filter(Boolean)
        .join(', ');
};

const formatHistoryTimestamp = (date: Date): string => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
};

export default function HistoryScreen() {
    const { eventHistory } = useEventHistory();

    const renderHistoryItem = (item: any) => (
        <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyHeader}>
                <View style={styles.eventTypeContainer}>
                    <Text style={styles.eventEmoji}>{item.emoji}</Text>
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTypeText}>{item.type}</Text>
                        <Text style={styles.timestampText}>{formatHistoryTimestamp(item.timestamp)}</Text>
                    </View>
                </View>
                {item.painLevel && (
                    <View style={styles.painLevelBadge}>
                        <Text style={styles.painLevelText}>{item.painLevel}/10</Text>
                    </View>
                )}
            </View>

            {item.painLocations && item.painLocations.length > 0 && (
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Locations: </Text>
                    {formatPainLocations(item.painLocations)}
                </Text>
            )}

            {item.notes && (
                <Text style={styles.notesText}>
                    <Text style={styles.detailLabel}>Note: </Text>
                    {item.notes}
                </Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={20} color={COLORS.accent} />
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.historyList}>
                {eventHistory.length > 0 ? (
                    eventHistory.map(renderHistoryItem)
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-outline" size={64} color={COLORS.textTertiary} />
                        <Text style={styles.emptyStateText}>No entries yet</Text>
                        <Text style={styles.emptyStateSubtext}>Start logging your events to see your history here</Text>
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
    // title style removed
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
    eventTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    eventEmoji: {
        fontSize: 24,
        marginRight: SPACING.sm,
    },
    eventDetails: {
        flex: 1,
    },
    eventTypeText: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
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
    detailText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    detailLabel: {
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
    },
    notesText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
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
    dateTimeContainer: {
        flex: 1,
    },
    timestampText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        marginTop: 2,
    },
});