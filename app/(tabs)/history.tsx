import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
                    <Ionicons name="filter-outline" size={20} color="#2563eb" />
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.historyList}>
                {mockHistory.length > 0 ? (
                    mockHistory.map(renderHistoryItem)
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-outline" size={64} color="#9ca3af" />
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
        backgroundColor: "#f9fafb",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1f2937",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#2563eb",
    },
    filterButtonText: {
        color: "#2563eb",
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "500",
    },
    historyList: {
        flex: 1,
        padding: 20,
    },
    historyItem: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1f2937",
    },
    painLevelBadge: {
        backgroundColor: "#ef4444",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    painLevelText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    symptomsText: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
    },
    notesText: {
        fontSize: 12,
        color: "#6b7280",
        fontStyle: "italic",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#9ca3af",
        marginVertical: 12,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: "#9ca3af",
        textAlign: "center",
        maxWidth: 240,
    },
});