import React, { useEffect, useRef, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { net } from "react-native-force";
import { StyleSheet } from "react-native";
import { Boat } from "../models/boat";
import { GET_BOATS_ENDPOINT } from "../api/constants";
import { MAX_RECORDS_PER_VIEW } from "../api/constants";
import BoatCard from "./BoatCard";

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

const BoatList = () => {
  const [state, setState] = useState<Boat[]>();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const previousBoats = useRef<Boat[]>();

  useEffect(() => {
    previousBoats.current = state;
    fetchData(MAX_RECORDS_PER_VIEW, offset);
  }, [offset, refreshing]);

  const fetchData = (maxRecords: number, offset: number) => {
    net.sendRequest(
      "/services/apexrest",
      `${GET_BOATS_ENDPOINT}?maxRecords=${maxRecords}&offset=${offset}`,
      (res: string) => {
        const parsedRes = JSON.parse(res);

        if (refreshing) {
          previousBoats.current = {} as Boat[];
          setState(parsedRes);
          setOffset(0);
          setRefreshing(false);
        }

        else if (!refreshing && parsedRes.length) {
          setState(
            previousBoats.current && Array.isArray(previousBoats.current)
              ? previousBoats.current!.concat(parsedRes)
              : parsedRes
          );
        }
        setLoading(false);
      },
      (err) => {console.log(err.message)},
      "GET"
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="blue" />
      ) : (
        <FlatList
          data={state}
          renderItem={({ item }) => (
            <>
              <Text style={styles.item}>{item.Name}</Text>
            </>
          )}
          keyExtractor={(_, index) => "key_" + index}
          onEndReached={() => {
            setOffset(offset + MAX_RECORDS_PER_VIEW);
          }}
          refreshControl={
            <RefreshControl 
              colors={["blue"]}
              refreshing={refreshing} 
              onRefresh={() => {
                setRefreshing(true);
                setState({} as Boat[]);
            }} />
          }
        />
      )}
    </View>
  );
};

export default BoatList;
