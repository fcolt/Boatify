import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { oauth, net } from "react-native-force";
import { Button } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import { Boat } from "../models/boat";

interface Response {
  records: Boat[];
}

interface Props {}

interface BoatState {
  data: Boat[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function BoatList() {
  const [state, setState] = useState<BoatState>();

  useEffect(() => {
    oauth.getAuthCredentials(
      () => fetchData(),
      () => {
        oauth.authenticate(
          () => fetchData(),
          (error) => console.log("Failed to authenticate:" + error)
        );
      }
    );
  }, []);

  const fetchData = () => {
    net.query(
      "SELECT Name FROM Boat__c LIMIT 100",
      (response: Response) => setState({ data: response.records }),
      (error) => console.log("Failed to query:" + error)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state?.data}
        renderItem={({ item }) => (
          <>
            <Text style={styles.item}>{item.Name}</Text>
            <Button title="Click me" />
          </>
        )}
        keyExtractor={(_, index) => "key_" + index}
      />
    </View>
  );
}
