import { Button, Card, Text } from "react-native-paper";
import { Boat } from "../models/boat";
import React from "react";
import { ORGANIZATION_URL } from "../api/constants";
import { useAuthContext } from "../context/AuthContext";
import { StyleSheet, TouchableNativeFeedback } from "react-native";

interface BoatCardProps {
  item: Boat;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalPicture: React.Dispatch<React.SetStateAction<string>>;
}

const BoatCard = ({ item, setShowModal, setModalPicture }: BoatCardProps) => {
  const { accessToken } = useAuthContext();

  return (
    <Card style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          setShowModal(true);
          setModalPicture(ORGANIZATION_URL + item.Picture__c);
        }}
      >
        <Card.Cover
          source={{
            uri: ORGANIZATION_URL + item.Picture__c,
            headers: {
              Authorization: `Bearer ${accessToken}`
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
            {item.Name}
          </Text>
          <Text variant="bodyMedium" numberOfLines={3}>
            {item.Description__c}
          </Text>
          <Card.Actions>
            <Button onPress={() => console.log("pressed")}>
              Rate this boat
            </Button>
            <Button style={{ marginLeft: "auto", marginTop: 25, marginBottom: 25 }}>Details</Button>
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
