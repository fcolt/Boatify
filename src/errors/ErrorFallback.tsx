import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { View, StyleSheet, Button } from "react-native";
import { Text } from "react-native-paper"

const myErrorHandler = (error: Error) => {
  console.log(error.message);
};

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong: </Text>
        <Button title="try Again" onPress={resetErrorBoundary} />
      </View>
    </View>
  );
}

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
});