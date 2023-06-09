import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import agent, { handleError } from "../api/agent";
import { net } from "react-native-force";
import { GET_BOATS_ENDPOINT } from "../api/constants";

export default function Buggy() {
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={() => agent.UserAccount.getProfilePic("0", () => {})}
      >
        Test 400 Erorr
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          net.sendRequest(
            "/services/apexres",
            GET_BOATS_ENDPOINT,
            () => {},
            (err) => handleError(err),
            "GET"
          );
        }}
      >
        Test 404 Erorr
      </Button>
      <Button
        mode="outlined"
        onPress={() => agent.Boats.getPaginatedBoats("0", 1, 0, () => {})}
      >
        Test 500 Erorr
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
