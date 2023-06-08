import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../screens/Home/HomePage";
import IonIcon from "react-native-vector-icons/Ionicons";
import AppBar from "../components/AppBar";
import BoatScreen from "../screens/Boats/BoatPage";
import { Animated, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { oauth } from "react-native-force";
import { useTopScrollContext } from "../context/TopScrollContext";

const Tab = createBottomTabNavigator();

const routes = {
  homeScreen: "Home",
  boatsScreen: "Boats",
};

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
      <Tab.Navigator
        screenListeners={{ tabPress: (e) => startShake() }}
        initialRouteName={routes.homeScreen}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === routes.homeScreen) {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === routes.boatsScreen) {
              iconName = focused ? "boat" : "boat-outline";
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
