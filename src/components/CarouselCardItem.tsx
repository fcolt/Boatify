import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { getOAuthURL } from '../util/SFUtil';
import { AuthProvider, useAuthContext } from '../context/AuthContext';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  const accessToken = useAuthContext();
  
  return (
    <View style={styles.container} key={index}>
      <AuthProvider>
        <Image
          source={{ uri: getOAuthURL(item.Picture__c, accessToken) }}
          style={styles.image}
        />
      </AuthProvider>
      <Text style={styles.header}>{item.Name}</Text>
      <Text style={styles.body}>{item.Description__c}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem;