import React, {  } from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import ContextProvider from "./src/context/ContextProvider";
import BottomTabNavigation from "./src/components/BottomTabNavigation";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <ContextProvider>
        <BottomTabNavigation />
      </ContextProvider>
    </PaperProvider>
  );
};
