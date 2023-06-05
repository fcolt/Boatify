import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BoatList from "./src/components/BoatList";
import HomePage from "./src/screens/Home/HomePage";
import { oauth } from "react-native-force";

const Tab = createBottomTabNavigator();

export const App = function () {
  useEffect(() => {
    oauth.getAuthCredentials(
      () => {},
      () => {
        oauth.authenticate(
          () => {},
          (error) => console.log("Failed to authenticate:" + error)
        );
      }
    );
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home Page" component={HomePage} />
        <Tab.Screen name="Boat Screen" component={BoatList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
