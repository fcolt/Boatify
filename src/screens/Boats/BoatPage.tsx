import React, { useState } from "react";
import BoatList from "./BoatList";
import BoatFilter from "./BoatFilter";
import { View } from "react-native";

const BoatScreen = () => {
  const [boatType, setBoatType] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <BoatList {...{ boatType, setBoatType, refreshing, setRefreshing }} />
    </>
  );
};

export default BoatScreen;
