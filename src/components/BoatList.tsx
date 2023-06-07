import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { net } from "react-native-force";
import { StyleSheet, Image } from "react-native";
import { Boat } from "../models/boat";
import { GET_BOATS_ENDPOINT } from "../api/constants";
import { MAX_RECORDS_PER_VIEW } from "../api/constants";
import BoatCard from "./BoatCard";
import { ProgressBar } from "react-native-paper";
import { PlaceholderJpg } from "../../assets";
import ImageModal from "./ImageModal";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const PLACEHOLDER_MODAL_IMAGE = Image.resolveAssetSource(PlaceholderJpg).uri;

const BoatList = () => {
  const [state, setState] = useState<Boat[]>();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalPicture, setModalPicture] = useState(PLACEHOLDER_MODAL_IMAGE);

  const previousBoats = useRef<Boat[]>();

  useEffect(() => {
    previousBoats.current = state;
    if (refreshing) {
      previousBoats.current = {} as Boat[];
      setState([] as Boat[]);
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
      <ImageModal {...{ showModal, setShowModal, modalPicture }} />
      {loading ? (
        <ActivityIndicator color="blue" />
      ) : (
        <FlatList
          data={state}
          renderItem={({ item }) => (
            <>
              <BoatCard {...{ item, setShowModal, setModalPicture }} />
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.75,
    resizeMode: "contain",
  },
});

export default BoatList;
