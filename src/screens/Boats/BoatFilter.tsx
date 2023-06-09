import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Chip } from "react-native-paper";
import { BoatType } from "../../models/boatType";
import agent from '../../api/agent';

interface BoatFilterProps {
  boatType: string;
  refreshing: boolean;
  setBoatType: React.Dispatch<React.SetStateAction<string>>;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoatFilter = ({ boatType, setBoatType, setRefreshing }: BoatFilterProps) => {
  const [boatTypes, setBoatTypes] = useState<BoatType[]>([]);

  useEffect(() => {
    if (!boatTypes.length) {
      agent.Boats.getBoatTypes((res: string) => setBoatTypes(JSON.parse(res)));
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
