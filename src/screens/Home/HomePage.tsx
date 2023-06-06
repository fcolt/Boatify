import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Surface } from "react-native-paper";
import { oauth } from "react-native-force";
import CarouselCards from "../../components/CarouselCards";

const HomePage = () => {
  const logout = () => {
    oauth.logout(
      () => {},
      (error) => console.log(error.message)
    );
  };

  return (
    <>
      <Surface elevation={5} style={styles.surface}>
        <Text variant="titleLarge">Welcome to Boatify!</Text>
        <Text variant="labelMedium">
          An app inspired by the Salesforce LWC Superbadge
        </Text>
        <View style={styles.surface}>
          <CarouselCards />
        </View>
      </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;