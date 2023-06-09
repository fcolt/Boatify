import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from "react-native";
import { ORGANIZATION_URL, ROUTES as routes } from "../api/constants";
import { Boat } from "../models/boat";
import { navigate } from "../api/agent";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface Props {
  item: Boat;
  index: number;
  authToken: string;
}

const CarouselCardItem = ({ item, index, authToken }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigate(routes.boatDetailsScreen, { item })}>
      <View style={styles.container} key={index}>
        <Image
          source={{
            uri: ORGANIZATION_URL + item.Picture__c,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.Name}</Text>
        <Text style={styles.body}>{item.Description__c}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
    flexWrap: "wrap",
    numberOfLines: 2,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    numberOfLines: 3,
  },
});

export default CarouselCardItem;
