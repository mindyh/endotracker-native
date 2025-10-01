import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';
import { LoggedEvent } from '../contexts/EventHistoryContext';

interface EventListItemProps {
    event: LoggedEvent;
    onPress: () => void;
    formatHistoryTimestamp: (date: Date) => string;
    formatPainLocations: (locationKeys: string[]) => string;
}

export default function EventListItem({ event, onPress, formatHistoryTimestamp, formatPainLocations }: EventListItemProps) {
    return (
        <TouchableOpacity
            key={event.id}
            style={styles.historyItem}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.historyHeader}>
                <View style={styles.eventTypeContainer}>
                    <Text style={styles.eventEmoji}>{event.emoji}</Text>
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTypeText}>{event.type}</Text>
                        <Text style={styles.timestampText}>{formatHistoryTimestamp(event.timestamp)}</Text>
                    </View>
                </View>
                {event.painLevel && (
                    <View style={styles.painLevelBadge}>
                        <Text style={styles.painLevelText}>{event.painLevel}/10</Text>
                    </View>
                )}
            </View>
            {event.painLocations && event.painLocations.length > 0 && (
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Locations: </Text>
                    {formatPainLocations(event.painLocations)}
                </Text>
            )}
            {event.notes && (
                <Text style={styles.notesText}>
                    <Text style={styles.detailLabel}>Note: </Text>
                    {event.notes}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    historyItem: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.neutral,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    timestampText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textTertiary,
        marginTop: 2,
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
        fontStyle: 'italic',
    },
});
