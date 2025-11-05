
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router } from "expo-router";
import { useNetworkState } from "expo-network";
import { SystemBars } from "react-native-edge-to-edge";
import { useColorScheme, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { PhotoProvider } from "@/contexts/PhotoContext";
import { Button } from "@/components/button";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { colors } from "@/styles/commonStyles";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isConnected } = useNetworkState();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Custom theme with romantic colors
  const RomanticTheme: Theme = {
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.highlight,
      notification: colors.accent,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={RomanticTheme}>
        <WidgetProvider>
          <PhotoProvider>
            <SystemBars style="auto" />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  headerTitle: "Modal",
                  headerRight: () => (
                    <Button onPress={() => router.back()}>Close</Button>
                  ),
                }}
              />
              <Stack.Screen
                name="formsheet"
                options={{
                  presentation: "formSheet",
                  sheetAllowedDetents: [0.5, 1],
                  sheetLargestUndimmedDetent: 0.5,
                  sheetGrabberVisible: true,
                  headerTitle: "Form Sheet",
                  headerRight: () => (
                    <Button onPress={() => router.back()}>Close</Button>
                  ),
                }}
              />
              <Stack.Screen
                name="transparent-modal"
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                  headerShown: false,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </PhotoProvider>
        </WidgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
