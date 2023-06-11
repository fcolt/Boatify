import { Button, Card, Text } from "react-native-paper";
import { Boat } from "../../models/boat";
import React from "react";
import { ORGANIZATION_URL, ROUTES as routes } from "../../api/constants";
import { useAuthContext } from "../../context/AuthContext";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { navigate } from "../../api/agent";

interface BoatCardProps {
  item: Boat;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRateDialog: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      item: Boat;
    }>
  >;
  setModalPicture: React.Dispatch<React.SetStateAction<string>>;
}

const BoatCard = ({
  item,
  setShowImageModal,
  setModalPicture,
  setShowRateDialog,
}: BoatCardProps) => {
  const { accessToken } = useAuthContext();

  return (
    <Card style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          setShowImageModal(true);
          setModalPicture(ORGANIZATION_URL + item.Picture__c);
        }}
      >
        <Card.Cover
          source={{
            uri: ORGANIZATION_URL + item.Picture__c,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }}
        />
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => navigate(routes.boatDetailsScreen, { item, setShowRateDialog })}
        style={{ marginTop: 15 }}
      >
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
            <Button
              onPress={() => setShowRateDialog({ show: true, item: item })}
            >
              Rate this boat
            </Button>
            <Button
              style={{ marginLeft: "auto", marginTop: 25, marginBottom: 25 }}
              onPress={() => navigate(routes.boatDetailsScreen, { item, setShowImageModal })}
            >
              Details
            </Button>
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
});

export default BoatCard;
