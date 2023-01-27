import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Provider as PaperProvider, Text } from "react-native-paper";

import { theme } from "./src/themes/Theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    // TODO show splash screen
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text variant="displayLarge">Display Large</Text>
        <Text variant="displayMedium">Display Medium</Text>
        <Text variant="displaySmall">Display small</Text>

        <Text variant="headlineLarge">Headline Large</Text>
        <Text variant="headlineMedium">Headline Medium</Text>
        <Text variant="headlineSmall">Headline Small</Text>

        <Text variant="titleLarge">Title Large</Text>
        <Text variant="titleMedium">Title Medium</Text>
        <Text variant="titleSmall">Title Small</Text>

        <Text variant="bodyLarge">Body Large</Text>
        <Text variant="bodyMedium">Body Medium</Text>
        <Text variant="bodySmall">Body Small</Text>

        <Text variant="labelLarge">Label Large</Text>
        <Text variant="labelMedium">Label Medium</Text>
        <Text variant="labelSmall">Label Small</Text>
        <StatusBar style="auto" />
        <Button onPress={() => {}}>Click me</Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
