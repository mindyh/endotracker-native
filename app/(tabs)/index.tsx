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
    backgroundColor: "#4a7c59",
  },
  content: {
    margin: 20,
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#2d5a3d",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2d5a3d",
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "#a3d5b7",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f8fdf9",
    minHeight: 52,
    color: "#2d5a3d",
  },
  submitButton: {
    backgroundColor: "#4a7c59",
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    shadowColor: "#4a7c59",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
