import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You've been shipwrecked! The page you've tried to access does not seem to exist...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});