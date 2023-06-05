import React from "react";
import { StyleSheet } from "react-native";
import { Text, Surface, Avatar } from "react-native-paper";
import { oauth } from "react-native-force";
import { Appbar } from "react-native-paper";
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
        <Surface elevation={4}>
          <CarouselCards />
        </Surface>
      </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;