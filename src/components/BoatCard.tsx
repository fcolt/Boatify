import { Avatar, Button, Card, Text } from "react-native-paper";
import { Boat } from "../models/boat";
import React from "react";
import { ORGANIZATION_URL } from "../api/constants";
import { useAuthContext } from "../context/AuthContext";

const BoatCard = (boat: Boat) => {
  const { accessToken } = useAuthContext();

  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
      />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Cover source={{ 
        uri: ORGANIZATION_URL + boat.Picture__c,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default BoatCard;