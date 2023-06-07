import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { net } from "react-native-force";
import { GET_BOAT_TYPES_ENDPOINT } from "../../api/constants";
import { Chip } from "react-native-paper";
import { BoatType } from "../../models/boatType";

interface BoatFilterProps {
  boatType: string;
  refreshing: boolean;
  setBoatType: React.Dispatch<React.SetStateAction<string>>;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoatFilter = ({ boatType, setBoatType, setRefreshing }: BoatFilterProps) => {
  const [boatTypes, setBoatTypes] = useState<BoatType[]>([]);

  const fetchBoatTypes = () => {
    net.sendRequest(
      "/services/apexrest",
      GET_BOAT_TYPES_ENDPOINT,
      (res: string) => {
        setBoatTypes(JSON.parse(res));
      },
      (err) => {
        console.log(err.message);
      },
      "GET"
    );
  }

  useEffect(() => {
    if (!boatTypes.length) {
      fetchBoatTypes();
    }
  }, []);

  return (
    <View>
      <FlatList
        horizontal
        data={boatTypes}
        renderItem={({ item }) => (
          <>
            <Chip
              style={styles.chip}
              mode="outlined"
              onPress={() => {
                boatType === item.Id ? setBoatType('') : setBoatType(item.Id);
                setRefreshing(true);
              }}
              selected={item.Id === boatType ? true : false}
              selectedColor="blue"
            >
              {item.Name}
            </Chip>
          </>
        )}
        keyExtractor={(item, _) => item.Id}
      />
    </View>
  );
};

const styles = {
  chip: {
    margin: 10
  },
};

export default BoatFilter;
