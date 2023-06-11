import { Button, Card, Text } from "react-native-paper";
import { Boat } from "../../models/boat";
import React, { useEffect, useState } from "react";
import { ORGANIZATION_URL } from "../../api/constants";
import { useAuthContext } from "../../context/AuthContext";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/en";
import SoundPlayerComponent from "../../components/SoundPlayer";
import ReviewList from "./ReviewList";

interface BoatDetailsProps {
  route:
    | RouteProp<
        {
          params: {
            item: Boat;
            setShowRateDialog: React.Dispatch<
              React.SetStateAction<{
                show: boolean;
                item: Boat;
              }>
            >;
          };
        },
        "params"
      >
    | RouteProp<ParamListBase, string>;
}

const BoatDetails = ({ route }: BoatDetailsProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { accessToken } = useAuthContext();
  const { item } = route.params as { item: Boat };
  const { setShowRateDialog } = route.params as {
    setShowRateDialog: React.Dispatch<
      React.SetStateAction<{
        show: boolean;
        item: Boat;
      }>
    >;
  };

  useEffect(() => {
    setRefreshing(true);
  }, [route]);
  
  const audioFilename = "sound" + (Math.floor(Math.random() * 7) + 1);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={["blue"]}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    >
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
      <ReviewList {...{ item, refreshing, setRefreshing }} />
      <Button
        mode="contained"
        style={{ marginLeft: 15, marginRight: 15 }}
        onPress={() => setShowRateDialog({ show: true, item: item })}
      >
        Add a Review
      </Button>
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
