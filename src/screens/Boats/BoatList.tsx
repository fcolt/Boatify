import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { StyleSheet, Image } from "react-native";
import { Boat } from "../../models/boat";
import { MAX_RECORDS_PER_VIEW } from "../../api/constants";
import BoatCard from "../../components/BoatCard";
import { ProgressBar } from "react-native-paper";
import { PlaceholderJpg } from "../../../assets";
import ImageModal from "../../components/ImageModal";
import BoatFilter from "./BoatFilter";
import { useTopScrollContext } from "../../context/TopScrollContext";
import agent from "../../api/agent";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const PLACEHOLDER_MODAL_IMAGE = Image.resolveAssetSource(PlaceholderJpg).uri;

interface BoatListProps {
  boatType: string;
  setBoatType: React.Dispatch<React.SetStateAction<string>>;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoatList = ({
  boatType,
  setBoatType,
  refreshing,
  setRefreshing,
}: BoatListProps) => {
  const [state, setState] = useState<Boat[]>();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalPicture, setModalPicture] = useState(PLACEHOLDER_MODAL_IMAGE);
  const [endReached, setEndReached] = useState(false);
  const previousBoats = useRef<Boat[]>();
  const { flatListRef } = useTopScrollContext();

  useEffect(() => {
    previousBoats.current = state;
    if (refreshing) {
      previousBoats.current = {} as Boat[];
      setState([]);
      setOffset(0);
      setEndReached(false);
      setRefreshing(false);
    } else if (!endReached) {
      fetchData(MAX_RECORDS_PER_VIEW, offset);
    }
  }, [offset, refreshing]);

  const fetchData = (maxRecords: number, offset: number) => {
    let boatTypeIdParam = "";
    if (boatType) {
      boatTypeIdParam = `boatTypeId=${boatType}&`;
    }
    agent.Boats.getPaginatedBoats(
      boatTypeIdParam,
      maxRecords,
      offset,
      (res) => {
        const parsedRes = JSON.parse(res);

        if (parsedRes.length === 0) {
          setEndReached(true);
          return;
        }

        if (!refreshing) {
          setState(
            previousBoats.current && Array.isArray(previousBoats.current)
              ? previousBoats.current!.concat(parsedRes)
              : parsedRes
          );
        }
        setLoading(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      <BoatFilter {...{ boatType, setBoatType, refreshing, setRefreshing }} />
      <ImageModal {...{ showModal, setShowModal, modalPicture }} />
      {loading || refreshing ? (
        <ActivityIndicator color="blue" />
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={state}
            renderItem={({ item }) => (
              <>
                <BoatCard {...{ item, setShowModal, setModalPicture }} />
              </>
            )}
            keyExtractor={(_, index) => "key_" + index}
            onEndReached={() => {
              if (!endReached) {
                setOffset(offset + MAX_RECORDS_PER_VIEW);
              }
            }}
            ListFooterComponent={() => (
              <ProgressBar visible={!endReached} indeterminate />
            )}
            refreshControl={
              <RefreshControl
                colors={["blue"]}
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
          />
        </>
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
