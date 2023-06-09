import { Button, Card, Text } from "react-native-paper";
import { Boat } from "../../models/boat";
import React from "react";
import { ORGANIZATION_URL } from "../../api/constants";
import { useAuthContext } from "../../context/AuthContext";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { RouteProp } from "@react-navigation/native";

const BoatDetails = ({
  route,
}: {
  route: RouteProp<{ params: { item: Boat } }, "params">;
}) => {
  const { accessToken } = useAuthContext();
  const { item } = route.params;

  return (
    <View>
      <Card style={styles.container}>
        <Card.Cover
          source={{
            uri: ORGANIZATION_URL + item.Picture__c,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }}
        />
        <Card.Content style={styles.content}>
          <Text variant="titleLarge">{item.Name}</Text>
          <Text variant="bodyMedium">{item.Description__c}</Text>
        </Card.Content>
        <Card.Content>
          <Text variant="titleLarge">Boat Type</Text>
          <Text variant="bodyMedium">{item.BoatType__r.Name}</Text>
        </Card.Content>
        <Card.Content>
          <Text variant="titleLarge">Length</Text>
          <Text variant="bodyMedium">{item.Length__c}ft</Text>
        </Card.Content>
        <Card.Content>
          <Text variant="titleLarge">Price</Text>
          <Text variant="bodyMedium">
            ${new Intl.NumberFormat().format(item.Price__c)}
          </Text>
        </Card.Content>
        <Card.Content>
          <Text variant="titleLarge">Contact</Text>
          <Text variant="bodyMedium">{item.Contact__r.Name}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 15,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});

export default BoatDetails;
