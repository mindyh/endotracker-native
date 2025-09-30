import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants/theme";
import Slider from '@react-native-community/slider';
import { useEventHistory, LoggedEvent } from '../../contexts/EventHistoryContext';
import { useEventTypes } from '../../contexts/EventTypesContext';

// Types
interface PainLocation {
  key: string;
  label: string;
}





// Constants
const PAIN_LOCATIONS: PainLocation[] = [
  { key: 'pelvis', label: 'Pelvis' },
  { key: 'left-hip', label: 'Left Hip' },
  { key: 'right-hip', label: 'Right Hip' },
  { key: 'left-leg', label: 'Left Leg' },
  { key: 'right-leg', label: 'Right Leg' },
  { key: 'lower-back', label: 'Lower Back' },
  { key: 'rectum', label: 'Rectum' },
];



const DEFAULT_PAIN_LEVEL = 1;
const MAX_NOTE_LENGTH = 100;

// Helper functions
const getPainLevelEmoji = (level: number): string => {
  if (level <= 3) return '😊';
  if (level <= 6) return '😐';
  if (level <= 8) return '😣';
  return '😰';
};

const formatTimestamp = (date: Date): string => {
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const validatePainLevel = (value: number | null | undefined): number => {
  return (value && value >= 1 && value <= 10) ? Math.round(value) : DEFAULT_PAIN_LEVEL;
};

const formatPainLocations = (locationKeys: string[]): string => {
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

export default function LogEventScreen() {
  // Context
  const { eventHistory, addEvent } = useEventHistory();
  const { eventTypes } = useEventTypes();

  // State
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPainLevel, setSelectedPainLevel] = useState<number>(DEFAULT_PAIN_LEVEL);
  const [selectedPainLocations, setSelectedPainLocations] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Event handlers
  const resetForm = useCallback(() => {
    setSelectedType(null);
    setSelectedPainLevel(DEFAULT_PAIN_LEVEL);
    setSelectedPainLocations([]);
    setNotes("");
    setTimestamp(new Date());
  }, []);

  // Pain location handler
  const togglePainLocation = useCallback((locationKey: string) => {
    setSelectedPainLocations(prev =>
      prev.includes(locationKey)
        ? prev.filter(key => key !== locationKey)
        : [...prev, locationKey]
    );
  }, []);



  const handleFullSubmit = useCallback(() => {
    if (!selectedType) {
      Alert.alert("Error", "Please select an event type");
      return;
    }

    // Find the selected event type details
    const eventType = eventTypes.find(type => type.key === selectedType);
    if (!eventType) return;

    // Create the logged event
    const loggedEvent: LoggedEvent = {
      id: Date.now().toString(),
      type: eventType.label,
      emoji: eventType.emoji,
      painLevel: selectedType === 'pain-start' ? selectedPainLevel : undefined,
      painLocations: selectedType === 'pain-start' && selectedPainLocations.length > 0 ? selectedPainLocations : undefined,
      notes: notes.trim() || undefined,
      timestamp: new Date(timestamp)
    };

    // Add to history
    addEvent(loggedEvent);

    const timestampString = formatTimestamp(timestamp);
    Alert.alert("Success", `${eventType.label} logged at ${timestampString}!`);
    resetForm();
  }, [selectedType, selectedPainLevel, selectedPainLocations, notes, timestamp, resetForm, addEvent, eventTypes]);

  // Date/Time handlers
  const handleDateEdit = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleTimeEdit = useCallback(() => {
    setShowTimePicker(true);
  }, []);

  const onDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      const newTimestamp = new Date(selectedDate);
      // Preserve the existing time
      newTimestamp.setHours(timestamp.getHours());
      newTimestamp.setMinutes(timestamp.getMinutes());
      newTimestamp.setSeconds(timestamp.getSeconds());
      setTimestamp(newTimestamp);
    }
  }, [timestamp]);

  const onTimeChange = useCallback((event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedTime) {
      const newTimestamp = new Date(timestamp);
      newTimestamp.setHours(selectedTime.getHours());
      newTimestamp.setMinutes(selectedTime.getMinutes());
      setTimestamp(newTimestamp);
    }
  }, [timestamp]);

  // Pain level handler
  const handlePainLevelChange = useCallback((value: number) => {
    setSelectedPainLevel(validatePainLevel(value));
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>

          {/* Event Type Selection - First Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What happened?</Text>
            <View style={styles.typeChipsContainer}>
              {eventTypes.map((type) => {
                const selected = selectedType === type.key;
                return (
                  <TouchableOpacity
                    key={type.key}
                    style={[styles.typeChip, selected && styles.typeChipSelected]}
                    onPress={() => setSelectedType(prev => prev === type.key ? null : type.key)}
                  >
                    <Text style={styles.typeChipEmoji}>{type.emoji}</Text>
                    <Text style={[styles.typeChipText, selected && styles.typeChipTextSelected]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Pain Level Slider - Only show for Pain Start */}
          {selectedType === 'pain-start' && (
            <View style={styles.inputGroup}>
              <View style={styles.painLevelHeader}>
                <Text style={styles.label}>Pain Level: {selectedPainLevel}/10</Text>
                <Text style={styles.painLevelEmoji}>
                  {getPainLevelEmoji(selectedPainLevel)}
                </Text>
              </View>
              {/* Easy-to-target slider */}
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>1</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={selectedPainLevel || DEFAULT_PAIN_LEVEL}
                  onValueChange={handlePainLevelChange}
                  minimumTrackTintColor={COLORS.primary}
                  maximumTrackTintColor={COLORS.primaryLight}
                  thumbTintColor={COLORS.primary}
                />
                <Text style={styles.sliderLabel}>10</Text>
              </View>
            </View>
          )}

          {/* Pain Location - Only show for Pain Start */}
          {selectedType === 'pain-start' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Where does it hurt?</Text>
              <View style={styles.locationChipsContainer}>
                {PAIN_LOCATIONS.map((location) => {
                  const selected = selectedPainLocations.includes(location.key);
                  return (
                    <TouchableOpacity
                      key={location.key}
                      style={[styles.locationChip, selected && styles.locationChipSelected]}
                      onPress={() => togglePainLocation(location.key)}
                    >
                      <Text style={[styles.locationChipText, selected && styles.locationChipTextSelected]}>
                        {location.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Optional Notes - Minimal */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quick Note (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.noteInput]}
              placeholder="Tap to add details..."
              value={notes}
              onChangeText={setNotes}
              maxLength={MAX_NOTE_LENGTH}
            />
          </View>

          {/* Timestamp - Final field before submit */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date & Time</Text>
            <View style={styles.timestampRow}>
              <TouchableOpacity
                style={[styles.timestampButton, styles.dateButton]}
                onPress={handleDateEdit}
              >
                <Text style={styles.timestampText}>
                  📅 {timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.timestampEditText}>Edit Date</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.timestampButton, styles.timeButton]}
                onPress={handleTimeEdit}
              >
                <Text style={styles.timestampText}>
                  🕐 {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.timestampEditText}>Edit Time</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleFullSubmit}>
            <Ionicons name="add-circle" size={32} color="white" />
            <Text style={styles.submitButtonText}>Log Event</Text>
          </TouchableOpacity>

        </View>

        {/* Recent Events Card */}
        {eventHistory.length > 0 && (
          <View style={styles.recentEventsCard}>
            <Text style={styles.recentEventsTitle}>Recent Events</Text>
            {eventHistory.slice(0, 3).map((event) => (
              <View key={event.id} style={styles.recentEventItem}>
                <View style={styles.recentEventHeader}>
                  <Text style={styles.recentEventEmoji}>{event.emoji}</Text>
                  <Text style={styles.recentEventType}>{event.type}</Text>
                  <Text style={styles.recentEventTime}>
                    {formatHistoryTimestamp(event.timestamp)}
                  </Text>
                </View>
                {event.painLevel && (
                  <Text style={styles.recentEventDetail}>
                    Pain Level: {event.painLevel}/10
                  </Text>
                )}
                {event.painLocations && event.painLocations.length > 0 && (
                  <Text style={styles.recentEventDetail}>
                    Locations: {formatPainLocations(event.painLocations)}
                  </Text>
                )}
                {event.notes && (
                  <Text style={styles.recentEventDetail}>
                    Note: {event.notes}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={timestamp}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={timestamp}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },

  // Typography
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    marginBottom: SPACING.sm,
    color: COLORS.primaryDark,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },

  // Form inputs
  textInput: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.primaryBackground,
    minHeight: 52,
    color: COLORS.primaryDark,
  },
  noteInput: {
    minHeight: 44,
    textAlignVertical: 'top',
  },

  // Submit button
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    marginLeft: SPACING.sm,
  },

  typeChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  typeChip: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.lg,
    flex: 1,
    minWidth: 100,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  typeChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeChipEmoji: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  typeChipText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  typeChipTextSelected: {
    color: COLORS.white,
  },

  // Pain Location Chips
  locationChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  locationChip: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    marginBottom: SPACING.xs,
  },
  locationChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  locationChipText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  locationChipTextSelected: {
    color: COLORS.white,
  },

  // Pain Level Slider
  painLevelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  painLevelEmoji: {
    fontSize: 24,
    marginLeft: SPACING.sm,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  slider: {
    flex: 1,
    height: 0,
  },
  currentValueDisplay: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  sliderLabel: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textSecondary,
    minWidth: 35,
    textAlign: 'center',
  },

  // Timestamp Styles
  timestampRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  timestampButton: {
    backgroundColor: COLORS.primaryBackground,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    minHeight: 60,
    justifyContent: 'center',
    flex: 1,
  },
  dateButton: {
    // Additional styles can be added here if needed
  },
  timeButton: {
    // Additional styles can be added here if needed
  },
  timestampText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  timestampEditText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
  },

  // Recent Events Card Styles
  recentEventsCard: {
    margin: SPACING.lg,
    marginTop: 0, // No top margin since it's in ScrollView
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
  },
  recentEventsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  recentEventItem: {
    backgroundColor: COLORS.primaryBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  recentEventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  recentEventEmoji: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  recentEventType: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primaryDark,
    flex: 1,
  },
  recentEventTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  recentEventDetail: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginLeft: 30, // Align with text after emoji
    lineHeight: 16,
  },
});
