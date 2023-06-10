import { Button, Card, Text } from "react-native-paper";
import { Boat } from "../../models/boat";
import React from "react";
import { ORGANIZATION_URL } from "../../api/constants";
import { useAuthContext } from "../../context/AuthContext";
import { ScrollView, StyleSheet, View } from "react-native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/en";
import SoundPlayerComponent from "../../components/SoundPlayer";

const BoatDetails = ({
  route,
}: {
  route:
    | RouteProp<{ params: { item: Boat } }, "params">
    | RouteProp<ParamListBase, string>;
}) => {
  const { accessToken } = useAuthContext();
  const { item } = route.params as { item: Boat };
  const audioFilename = "sound" + (Math.floor(Math.random() * 7) + 1);

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Listen to the majestic sounds of {item.Name}!</Text>
      </View>
      <SoundPlayerComponent {...{ audioFilename }} />
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
          <Text variant="bodyMedium">
            {item.Contact__r.Name} - {item.Contact__r.Email}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
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
