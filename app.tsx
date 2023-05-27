import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BoatListScreen } from "./src/components/BoatListComponent";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const App = function () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Boat Screen" component={BoatListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
