import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants/theme";

export default function LogEntryScreen() {
  const [symptoms, setSymptoms] = useState("");
  const [painLevel, setPainLevel] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!symptoms || !painLevel) {
      Alert.alert("Error", "Please fill in symptoms and pain level");
      return;
    }
    Alert.alert("Success", "Entry logged successfully!");
    // Reset form
    setSymptoms("");
    setPainLevel("");
    setNotes("");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Log New Entry</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Symptoms</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pain Level (1-10)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter pain level"
            value={painLevel}
            onChangeText={setPainLevel}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Any additional notes..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.submitButtonText}>Log Entry</Text>
        </TouchableOpacity>
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
    margin: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
  },
  title: {
    fontSize: FONT_SIZES.xxxxl,
    fontWeight: "700",
    marginBottom: SPACING.xl,
    textAlign: "center",
    color: COLORS.primaryDark,
  },
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
});
