import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BoatList from "./src/components/BoatList";
import HomePage from "./src/screens/Home/HomePage";
import { oauth } from "react-native-force";
import IonIcon from "react-native-vector-icons/Ionicons";
import AppBar from "./src/components/AppBar";
import { PaperProvider } from "react-native-paper";

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
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "";

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Boat Screen") {
                iconName = focused ? "boat" : "boat-outline";
              }

              return <IonIcon name={iconName} size={size} color={color} />;
            },
            header: (props) => <AppBar {...props} />,
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Boat Screen" component={BoatList} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
