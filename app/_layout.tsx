import { Stack } from "expo-router";
import { EventHistoryProvider } from "../contexts/EventHistoryContext";
import { EventTypesProvider } from "../contexts/EventTypesContext";

export default function RootLayout() {
  return (
    <EventTypesProvider>
      <EventHistoryProvider>
        <Stack
          screenOptions={{
            headerTitle: "EndoTracker",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              title: "Settings",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="event-types-settings"
            options={{
              title: "Event Types",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="about"
            options={{
              title: "About",
              presentation: "modal",
            }}
          />
        </Stack>
      </EventHistoryProvider>
    </EventTypesProvider>
  );
}
