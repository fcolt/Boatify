import React, { useState } from "react";
import BoatList from "./BoatList";

function BoatScreen() {
  const [boatType, setBoatType] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <BoatList {...{ boatType, setBoatType, refreshing, setRefreshing }} />
    </>
  );
}

export default BoatScreen;
