import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants/theme";


export default function LogEventScreen() {
  const EVENT_TYPES = [
    { key: 'pain-start', label: 'Pain Start', emoji: '⚡' },
    { key: 'pain-ending', label: 'Pain End', emoji: '🕊️' },
    { key: 'fatigue', label: 'Fatigue', emoji: '😴' },
    { key: 'treatment', label: 'Treatment', emoji: '🩹' },
  ];

  const PAIN_LEVELS = [
    { value: '1', label: 'Mild', emoji: '😊', color: COLORS.success },
    { value: '3', label: 'Moderate', emoji: '�', color: COLORS.warning },
    { value: '5', label: 'Strong', emoji: '😣', color: COLORS.error },
    { value: '7', label: 'Severe', emoji: '😰', color: '#ff6b6b' },
    { value: '9', label: 'Extreme', emoji: '�', color: '#d63031' },
  ];

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPainLevel, setSelectedPainLevel] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleQuickLog = (type: string, painLevel?: string) => {
    const finalPainLevel = painLevel || selectedPainLevel || '5';
    const timestampString = `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    Alert.alert("Success", `${type} event logged with pain level ${finalPainLevel} at ${timestampString}!`);
    // Reset form
    setSelectedType(null);
    setSelectedPainLevel(null);
    setNotes("");
    setTimestamp(new Date());
  };

  const handleFullSubmit = () => {
    if (!selectedType) {
      Alert.alert("Error", "Please select an event type");
      return;
    }
    const finalPainLevel = selectedPainLevel || '5';
    const timestampString = `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    Alert.alert("Success", `Event logged with pain level ${finalPainLevel} at ${timestampString}!`);
    // Reset form
    setSelectedType(null);
    setSelectedPainLevel(null);
    setNotes("");
    setTimestamp(new Date());
  };

  const handleDateEdit = () => {
    setShowDatePicker(true);
  };

  const handleTimeEdit = () => {
    setShowTimePicker(true);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      const newTimestamp = new Date(selectedDate);
      // Preserve the existing time
      newTimestamp.setHours(timestamp.getHours());
      newTimestamp.setMinutes(timestamp.getMinutes());
      newTimestamp.setSeconds(timestamp.getSeconds());
      setTimestamp(newTimestamp);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedTime) {
      const newTimestamp = new Date(timestamp);
      newTimestamp.setHours(selectedTime.getHours());
      newTimestamp.setMinutes(selectedTime.getMinutes());
      setTimestamp(newTimestamp);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>

          {/* Quick Log Buttons - One tap to log common events */}
          <View style={styles.quickLogSection}>
            <Text style={styles.sectionTitle}>Quick Log</Text>
            <View style={styles.quickButtonsRow}>
              <TouchableOpacity
                style={[styles.quickButton, { backgroundColor: COLORS.error }]}
                onPress={() => handleQuickLog('Pain Start', '7')}
              >
                <Text style={styles.quickButtonEmoji}>⚡</Text>
                <Text style={styles.quickButtonText}>Pain Start</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickButton, { backgroundColor: COLORS.success }]}
                onPress={() => handleQuickLog('Pain End', '2')}
              >
                <Text style={styles.quickButtonEmoji}>🕊️</Text>
                <Text style={styles.quickButtonText}>Pain End</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pain Level Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>How do you feel? (Tap one)</Text>
            <View style={styles.painLevelContainer}>
              {PAIN_LEVELS.map((level) => {
                const selected = selectedPainLevel === level.value;
                return (
                  <TouchableOpacity
                    key={level.value}
                    style={[
                      styles.painLevelButton,
                      { backgroundColor: selected ? level.color : COLORS.primaryLight },
                      selected && styles.painLevelSelected
                    ]}
                    onPress={() => setSelectedPainLevel(level.value)}
                  >
                    <Text style={styles.painLevelEmoji}>{level.emoji}</Text>
                    <Text style={[
                      styles.painLevelText,
                      { color: selected ? COLORS.white : COLORS.textPrimary }
                    ]}>
                      {level.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Event Type - Simplified */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What happened?</Text>
            <View style={styles.typeChipsContainer}>
              {EVENT_TYPES.map((type) => {
                const selected = selectedType === type.key;
                return (
                  <TouchableOpacity
                    key={type.key}
                    style={[styles.typeChip, selected && styles.typeChipSelected]}
                    onPress={() => setSelectedType(prev => prev === type.key ? null : type.key)}
                  >
                    <Text style={[styles.typeChipText, selected && styles.typeChipTextSelected]}>
                      {type.emoji} {type.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Optional Notes - Minimal */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quick Note (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.noteInput]}
              placeholder="Tap to add details..."
              value={notes}
              onChangeText={setNotes}
              maxLength={100}
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
  // title style removed
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    marginBottom: SPACING.sm,
    color: COLORS.primaryDark,
  },
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
    gap: 8,
    marginTop: 4,
  },
  typeChip: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
  },
  typeChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeChipText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
  typeChipTextSelected: {
    color: COLORS.white,
  },

  // Quick Log Section
  quickLogSection: {
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  quickButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  quickButton: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  quickButtonEmoji: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  quickButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },

  // Pain Level Selector
  painLevelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  painLevelButton: {
    flex: 1,
    minWidth: '18%',
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xs,
    ...SHADOWS.small,
  },
  painLevelSelected: {
    ...SHADOWS.medium,
    transform: [{ scale: 1.05 }],
  },
  painLevelEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  painLevelText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "600",
    textAlign: 'center',
  },

  // Note Input
  noteInput: {
    minHeight: 44,
    textAlignVertical: 'top',
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
});
