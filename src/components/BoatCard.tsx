import { Button, Card, Portal, Text } from "react-native-paper";
import { Boat } from "../models/boat";
import React, { useState } from "react";
import { ORGANIZATION_URL } from "../api/constants";
import { useAuthContext } from "../context/AuthContext";
import { Modal, StyleSheet, TouchableNativeFeedback, View } from "react-native";

const BoatCard = (boat: Boat) => {
  const { accessToken } = useAuthContext();
  const [showPictureModal, setShowPictureModal] = useState(false);

  return (
    <Card style={styles.container}>
      <TouchableNativeFeedback onPress={() => setShowPictureModal(true)}>
        <Card.Cover
          source={{
            uri: ORGANIZATION_URL + boat.Picture__c,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }}
        />
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => {}} style={{ marginTop: 15 }}>
        <Card.Content>
          <Text
            variant="titleLarge"
            numberOfLines={2}
            style={{ marginTop: 15 }}
          >
            {boat.Name}
          </Text>
          <Text variant="bodyMedium" numberOfLines={3}>
            {boat.Description__c}
          </Text>
          <Card.Actions>
            <Button onPress={() => console.log("pressed")}>
              Rate this boat
            </Button>
            <Button style={{ marginLeft: "auto" }}>Details</Button>
          </Card.Actions>
        </Card.Content>
      </TouchableNativeFeedback>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 15,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default BoatCard;
