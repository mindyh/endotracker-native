import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import { useEventTypes, EventType } from '../contexts/EventTypesContext';

interface EditEventTypeModalProps {
    visible: boolean;
    eventType: EventType | null;
    onClose: () => void;
    onSave: (eventType: { label: string; emoji: string }) => void;
    onDelete?: (key: string) => void;
}

const EditEventTypeModal: React.FC<EditEventTypeModalProps> = ({
    visible,
    eventType,
    onClose,
    onSave,
    onDelete,
}) => {
    const [label, setLabel] = useState(eventType?.label || '');
    const [emoji, setEmoji] = useState(eventType?.emoji || '');

    React.useEffect(() => {
        if (eventType) {
            setLabel(eventType.label);
            setEmoji(eventType.emoji);
        } else {
            setLabel('');
            setEmoji('');
        }
    }, [eventType, visible]);

    const handleSave = () => {
        if (!label.trim()) {
            Alert.alert('Error', 'Event type name is required');
            return;
        }
        if (!emoji.trim()) {
            Alert.alert('Error', 'Event type emoji is required');
            return;
        }
        onSave({ label: label.trim(), emoji: emoji.trim() });
        onClose();
    };

    const handleDelete = () => {
        if (!eventType || !onDelete) return;
        Alert.alert(
            'Delete Event Type',
            `Are you sure you want to delete "${eventType.label}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        onDelete(eventType.key);
                        onClose();
                    }
                },
            ]
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {eventType ? 'Edit Event Type' : 'Add Event Type'}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput
                            style={styles.textInput}
                            value={label}
                            onChangeText={setLabel}
                            placeholder="Enter event type name"
                            maxLength={20}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Emoji</Text>
                        <TextInput
                            style={styles.textInput}
                            value={emoji}
                            onChangeText={setEmoji}
                            placeholder="Enter emoji (e.g., ⚡)"
                            maxLength={2}
                        />
                    </View>

                    <View style={styles.modalActions}>
                        {eventType && onDelete && (
                            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const EventTypeItem: React.FC<{
    item: EventType;
    drag: () => void;
    isActive: boolean;
    onEdit: (eventType: EventType) => void;
}> = ({ item, drag, isActive, onEdit }) => {
    return (
        <View style={[styles.eventTypeItem, isActive && styles.eventTypeItemActive]}>
            <TouchableOpacity
                style={styles.dragHandle}
                onLongPress={drag}
                delayLongPress={25}
                activeOpacity={0.6}
            >
                <Ionicons name="reorder-three" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.eventTypeContent}
                onPress={() => onEdit(item)}
                disabled={isActive}
                activeOpacity={0.7}
            >
                <Text style={styles.eventTypeEmoji}>{item.emoji}</Text>
                <Text style={styles.eventTypeLabel}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function EventTypesSettingsScreen() {
    const {
        eventTypes,
        addEventType,
        updateEventType,
        deleteEventType,
        reorderEventTypes,
        resetToDefaults,
    } = useEventTypes();

    const [modalVisible, setModalVisible] = useState(false);
    const [editingEventType, setEditingEventType] = useState<EventType | null>(null);

    const handleAddEventType = () => {
        setEditingEventType(null);
        setModalVisible(true);
    };

    const handleEditEventType = (eventType: EventType) => {
        setEditingEventType(eventType);
        setModalVisible(true);
    };

    const handleSaveEventType = (data: { label: string; emoji: string }) => {
        if (editingEventType) {
            updateEventType(editingEventType.key, data);
        } else {
            addEventType(data);
        }
    };

    const handleResetToDefaults = () => {
        Alert.alert(
            'Reset to Defaults',
            'This will remove all custom event types and restore the default ones. Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', style: 'destructive', onPress: resetToDefaults },
            ]
        );
    };

    const renderEventTypeItem = ({ item, drag, isActive }: RenderItemParams<EventType>) => (
        <EventTypeItem
            item={item}
            drag={drag}
            isActive={isActive}
            onEdit={handleEditEventType}
        />
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Event Types</Text>
                    <Text style={styles.sectionDescription}>
                        Customize the event types you can log. Drag to reorder, tap to edit.
                    </Text>

                    <View style={styles.dragListContainer}>
                        <DraggableFlatList
                            data={eventTypes}
                            onDragEnd={({ data }: { data: EventType[] }) => reorderEventTypes(data)}
                            keyExtractor={(item: EventType) => item.key}
                            renderItem={renderEventTypeItem}
                            scrollEnabled={false}
                        />
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddEventType}>
                            <Ionicons name="add" size={20} color={COLORS.white} />
                            <Text style={styles.addButtonText}>Add Event Type</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resetButton} onPress={handleResetToDefaults}>
                            <Ionicons name="refresh" size={20} color={COLORS.textSecondary} />
                            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <EditEventTypeModal
                visible={modalVisible}
                eventType={editingEventType}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveEventType}
                onDelete={deleteEventType}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
    },
    section: {
        margin: SPACING.lg,
        padding: SPACING.xl,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.large,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        color: COLORS.primaryDark,
        marginBottom: SPACING.sm,
    },
    sectionDescription: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginBottom: SPACING.lg,
        lineHeight: 20,
    },
    dragListContainer: {
        marginBottom: SPACING.lg,
        minHeight: 200,
    },
    eventTypeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBackground,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
    },
    eventTypeItemActive: {
        backgroundColor: COLORS.primaryLight,
        elevation: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    dragHandle: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    eventTypeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.sm,
        minHeight: 44,
    },
    eventTypeEmoji: {
        fontSize: 24,
        marginRight: SPACING.lg,
    },
    eventTypeLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
        color: COLORS.textPrimary,
        flex: 1,
    },
    actionButtons: {
        gap: SPACING.md,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        gap: SPACING.sm,
    },
    addButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.neutral,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        gap: SPACING.sm,
    },
    resetButtonText: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZES.md,
        fontWeight: '500',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        width: '100%',
        maxWidth: 400,
        ...SHADOWS.large,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    modalTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    inputLabel: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZES.md,
        backgroundColor: COLORS.primaryBackground,
        color: COLORS.primaryDark,
    },
    modalActions: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginTop: SPACING.lg,
    },
    cancelButton: {
        flex: 1,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.neutral,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZES.md,
        fontWeight: '500',
    },
    deleteButton: {
        flex: 1,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.error,
        alignItems: 'center',
    },
    deleteButtonText: {
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
    saveButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.md,
        fontWeight: '600',
    },
});