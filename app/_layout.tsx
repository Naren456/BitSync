import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProviders } from "../contexts/AppProviders";
import "../app/globals.css"; 

export default function RootLayout() {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="landing" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="subject/[id]"
            options={{ title: "Subject Details", headerShown: true, headerBackTitle: "Back" }}
          />
          <Stack.Screen name="authpages/signin" options={{ headerShown: false }} />
          <Stack.Screen name="authpages/signup" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AppProviders>
  );
}
