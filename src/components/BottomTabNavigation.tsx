import React, { useEffect, useRef } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import HomePage from "../screens/Home/HomePage";
import IonIcon from "react-native-vector-icons/Ionicons";
import AppBar from "../components/AppBar";
import BoatScreen from "../screens/Boats/BoatPage";
import { Animated, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTopScrollContext } from "../context/TopScrollContext";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import Buggy from "../errors/Buggy";
import { ROUTES as routes } from "../api/constants";
import BoatDetails from "../screens/Boats/BoatDetails";

const Tab = createBottomTabNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({name, params} as never);
  }
}

export default function BottomTabNavigation() {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { toTop } = useTopScrollContext();
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateInterpolation = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-20deg", "20deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolation }],
  };

  useEffect(() => {
    startShake();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenListeners={{ tabPress: (e) => startShake() }}
        initialRouteName={routes.homeScreen}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            switch (route.name) {
              case routes.homeScreen:
                iconName = focused ? "home" : "home-outline";
                break;
              case routes.boatsScreen:
                iconName = focused ? "boat" : "boat-outline";
                break;
              case routes.buggyScreen:
                iconName = focused ? "md-bug" : "ios-bug-outline";
                break;
            }

            return (
              <Animated.View style={focused && animatedStyle}>
                <IonIcon name={iconName} size={size} color={color} />
              </Animated.View>
            );
          },
          header: (props) => <AppBar {...props} />,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          //exclude error screens
          tabBarButton: [
            routes.notFoundScreen,
            routes.serverErrorScreen,
            routes.boatDetailsScreen
          ].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
      >
        <Tab.Screen name={routes.homeScreen} component={HomePage} />
        <Tab.Screen
          name={routes.boatsScreen}
          component={BoatScreen}
          listeners={{
            tabPress: (e) => toTop(),
          }}
        />
        <Tab.Screen name={routes.boatDetailsScreen} component={BoatDetails} />
        <Tab.Screen name={routes.buggyScreen} component={Buggy} />
        <Tab.Screen name={routes.notFoundScreen} component={NotFound} />
        <Tab.Screen name={routes.serverErrorScreen} component={ServerError} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
