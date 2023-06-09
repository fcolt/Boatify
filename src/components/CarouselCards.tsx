import { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import { ActivityIndicator } from "react-native-paper";
import React from "react";
import { Boat } from "../models/boat";
import { View } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import agent from "../api/agent";

const NO_OF_DEMO_ITEMS = 10;
const RANDOM_OFFSET = Math.floor(Math.random() * NO_OF_DEMO_ITEMS);

const CarouselCards = () => {
  const [loading, setLoading] = useState(true);
  const [demoData, setDemoData] = useState<Boat[]>();
  const [index, setIndex] = useState(0);
  const { accessToken } = useAuthContext();
  const isCarousel = useRef(null);

  useEffect(() => {
    agent.Boats.getDemoBoatCardsInfo(NO_OF_DEMO_ITEMS, RANDOM_OFFSET, (res) => {
      setDemoData(res.records);
      setLoading(false);
    });
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator color="blue" />
      ) : (
        <View>
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={demoData!}
            renderItem={(item) => (
              <CarouselCardItem
                item={item.item}
                index={index}
                authToken={accessToken}
              />
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
            vertical={false}
            autoplay={true}
          />
          <Pagination
            dotsLength={demoData!.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
      )}
    </View>
  );
};

export default CarouselCards;
