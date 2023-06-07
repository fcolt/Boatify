import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { net } from "react-native-force";
import { StyleSheet } from "react-native";
import { Boat } from "../models/boat";
import { GET_BOATS_ENDPOINT } from "../api/constants";
import { MAX_RECORDS_PER_VIEW } from "../api/constants";
import BoatCard from "./BoatCard";
import { ProgressBar } from "react-native-paper";

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
    if (refreshing) {
      previousBoats.current = {} as Boat[];
      setState({} as Boat[]);
      setOffset(0);
      setRefreshing(false);
    } else {
      fetchData(MAX_RECORDS_PER_VIEW, offset);
    }
  }, [offset, refreshing]);

  const fetchData = (maxRecords: number, offset: number) => {
    net.sendRequest(
      "/services/apexrest",
      `${GET_BOATS_ENDPOINT}?maxRecords=${maxRecords}&offset=${offset}`,
      (res: string) => {
        const parsedRes = JSON.parse(res);

        if (!refreshing && parsedRes.length) {
          setState(
            previousBoats.current && Array.isArray(previousBoats.current)
              ? previousBoats.current!.concat(parsedRes)
              : parsedRes
          );
        }
        setLoading(false);
      },
      (err) => {
        console.log(err.message);
      },
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
              <BoatCard {...item} />
            </>
          )}
          keyExtractor={(_, index) => "key_" + index}
          onEndReached={() => {
            setOffset(offset + MAX_RECORDS_PER_VIEW);
          }}
          ListFooterComponent={() => <ProgressBar indeterminate />}
          refreshControl={
            <RefreshControl
              colors={["blue"]}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        />
      )}
    </View>
  );
};

export default BoatList;
