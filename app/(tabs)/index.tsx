import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
    backgroundColor: "#f9fafb",
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
    minHeight: 48,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
