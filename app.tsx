import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BoatList from "./src/components/BoatList";
import HomePage from "./src/screens/Home/HomePage";

const Tab = createBottomTabNavigator();

export const App = function () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home Page" component={HomePage} />
        <Tab.Screen name="Boat Screen" component={BoatList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
