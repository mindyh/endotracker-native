import React, { useState, useEffect } from 'react';
import { Platform, Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { LoggedEvent } from '../contexts/EventHistoryContext';

interface PainLocation {
    key: string;
    label: string;
}

interface EditLoggedEventModalProps {
    visible: boolean;
    event: LoggedEvent | null;
    onClose: () => void;
    onSave: (event: LoggedEvent) => void;
    onDelete: (id: string) => void;
}

const PAIN_LOCATIONS: PainLocation[] = [
    { key: 'pelvis', label: 'Pelvis' },
    { key: 'left-hip', label: 'Left Hip' },
    { key: 'right-hip', label: 'Right Hip' },
    { key: 'left-leg', label: 'Left Leg' },
    { key: 'right-leg', label: 'Right Leg' },
    { key: 'lower-back', label: 'Lower Back' },
    { key: 'rectum', label: 'Rectum' },
];

export default function EditLoggedEventModal({ visible, event, onClose, onSave, onDelete }: EditLoggedEventModalProps) {
    const [notes, setNotes] = useState('');
    const [painLevel, setPainLevel] = useState<number | undefined>(undefined);
    const [painLocations, setPainLocations] = useState<string[]>([]);
    const [timestamp, setTimestamp] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        if (event) {
            setNotes(event.notes || '');
            setPainLevel(event.painLevel);
            setPainLocations(event.painLocations || []);
            setTimestamp(event.timestamp ? new Date(event.timestamp) : null);
        }
    }, [event, visible]);

    const handleSave = () => {
        if (!event) return;
        onSave({ ...event, notes, painLevel, painLocations, timestamp: timestamp || new Date() });
        onClose();
    };

    const handleDelete = () => {
        if (!event) return;
        Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => { onDelete(event.id); onClose(); } },
        ]);
    };

    const togglePainLocation = (locationKey: string) => {
        setPainLocations(prev =>
            prev.includes(locationKey)
                ? prev.filter(key => key !== locationKey)
                : [...prev, locationKey]
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Edit Event</Text>
                        <TouchableOpacity onPress={onClose}><Ionicons name="close" size={24} color={COLORS.textSecondary} /></TouchableOpacity>
                    </View>
                    {event && (
                        <View style={styles.eventInfoRow}>
                            <Text style={styles.eventEmoji}>{event.emoji}</Text>
                            <Text style={styles.eventLabel}>{event.type}</Text>
                        </View>
                    )}

                    {/* Only show pain level for Pain Start events */}
                    {event && event.type.toLowerCase() === 'pain start' && (
                        <View style={styles.inputGroup}>
                            <View style={styles.painLevelHeader}>
                                <Text style={styles.label}>Pain Level: {painLevel || 1}/10</Text>
                            </View>
                            <View style={styles.sliderContainer}>
                                <Text style={styles.sliderLabel}>1</Text>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    value={painLevel || 1}
                                    onValueChange={val => setPainLevel(Number(val))}
                                    minimumTrackTintColor={COLORS.primary}
                                    maximumTrackTintColor={COLORS.primaryLight}
                                    thumbTintColor={COLORS.primary}
                                />
                                <Text style={styles.sliderLabel}>10</Text>
                            </View>
                        </View>
                    )}
                    {/* Only show pain locations for Pain Start events */}
                    {event && event.type.toLowerCase() === 'pain start' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Pain Locations</Text>
                            <View style={styles.chipsContainer}>
                                {PAIN_LOCATIONS.map(loc => (
                                    <TouchableOpacity
                                        key={loc.key}
                                        style={[styles.chip, painLocations.includes(loc.key) && styles.chipSelected]}
                                        onPress={() => togglePainLocation(loc.key)}
                                    >
                                        <Text style={[styles.chipText, painLocations.includes(loc.key) && styles.chipTextSelected]}>{loc.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput
                            style={styles.input}
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Edit notes..."
                            multiline
                            maxLength={100}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date & Time</Text>
                        <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
                            <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
                                <Text style={styles.dateTimeText}>
                                    📅 {timestamp ? timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' }) : ''}
                                </Text>
                                <Text style={styles.dateTimeEditText}>Edit Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
                                <Text style={styles.dateTimeText}>
                                    🕐 {timestamp ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </Text>
                                <Text style={styles.dateTimeEditText}>Edit Time</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Native Date/Time Pickers */}
                    {showDatePicker && timestamp && (
                        <DateTimePicker
                            value={timestamp}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                                setShowDatePicker(false);
                                if (event.type === 'set' && selectedDate) {
                                    const newTimestamp = new Date(selectedDate);
                                    // Preserve time
                                    if (timestamp) {
                                        newTimestamp.setHours(timestamp.getHours());
                                        newTimestamp.setMinutes(timestamp.getMinutes());
                                        newTimestamp.setSeconds(timestamp.getSeconds());
                                    }
                                    setTimestamp(newTimestamp);
                                }
                            }}
                        />
                    )}
                    {showTimePicker && timestamp && (
                        <DateTimePicker
                            value={timestamp}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event: DateTimePickerEvent, selectedTime?: Date) => {
                                setShowTimePicker(false);
                                if (event.type === 'set' && selectedTime) {
                                    const newTimestamp = new Date(timestamp);
                                    newTimestamp.setHours(selectedTime.getHours());
                                    newTimestamp.setMinutes(selectedTime.getMinutes());
                                    setTimestamp(newTimestamp);
                                }
                            }}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
    // Add styles for eventInfoRow, eventEmoji, eventLabel, dateTimeButton, dateTimeText, dateTimeEditText
}

const styles = StyleSheet.create({
    painLevelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginTop: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    slider: {
        flex: 1,
        height: 40,
    },
    sliderLabel: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        width: 24,
        textAlign: 'center',
    },
    eventInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        marginBottom: SPACING.md,
    },
    eventEmoji: {
        fontSize: 32,
        marginRight: SPACING.sm,
    },
    eventLabel: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    dateTimeButton: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.sm,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    dateTimeText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    dateTimeEditText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textSecondary,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    modal: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        width: '100%',
        maxWidth: 400,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    input: {
        borderWidth: 1.5,
        borderColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.md,
        backgroundColor: COLORS.primaryBackground,
        color: COLORS.primaryDark,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        marginTop: SPACING.sm,
    },
    chip: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderWidth: 1.5,
        borderColor: COLORS.primaryLight,
        marginBottom: SPACING.xs,
    },
    chipSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.primaryDark,
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
    },
    chipTextSelected: {
        color: COLORS.white,
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginTop: SPACING.lg,
    },
    deleteButton: {
        flex: 1,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.error,
        alignItems: 'center',
    },
    deleteText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
    saveButton: {
        flex: 1,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    saveText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
});
