import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
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
    <View style={styles.view}>
      <Text variant="titleLarge">Welcome to Boatify!</Text>
      <Text variant="labelMedium">
        An app inspired by the Salesforce LWC Superbadge
      </Text>
      <View style={styles.view}>
        <CarouselCards />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
