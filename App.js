import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Navigation } from "./src/features/infrastructure/navigation";
import { theme } from "./src/features/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAB-S7NRw3oQmSZRsY_1vmJY50v-OQYO4o",
  authDomain: "mealstogo-95cd3.firebaseapp.com",
  projectId: "mealstogo-95cd3",
  storageBucket: "mealstogo-95cd3.appspot.com",
  messagingSenderId: "495982560011",
  appId: "1:495982560011:web:ce218684364d9f7929980e",
};

const app = initializeApp(firebaseConfig);

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
