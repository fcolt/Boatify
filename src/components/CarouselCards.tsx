import { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import { ActivityIndicator } from "react-native-paper";
import { getAccessToken } from "../util/SFUtil";
import React from "react";
import { Boat } from "../models/boat";
import { View } from "react-native";
import { net } from "react-native-force";
import { QueryResult } from "../models/queryResult";

const NO_OF_DEMO_ITEMS = 10;
const RANDOM_OFFSET = Math.floor(Math.random() * NO_OF_DEMO_ITEMS);

const CarouselCards = () => {
  const [loading, setLoading] = useState(true);
  const [demoData, setDemoData] = useState<Boat[]>();
  const [index, setIndex] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const isCarousel = useRef(null);

  useEffect(() => {
    getAccessToken()
      .then((res) => setAccessToken(res))
      .catch((err) => console.log(err));
		net.query(
			`SELECT Name, Description__c, Picture__c FROM Boat__c LIMIT ${NO_OF_DEMO_ITEMS} OFFSET ${RANDOM_OFFSET}`,
			(res: QueryResult<Boat>) => {
				setDemoData(res.records);
				setLoading(false);
			},
			(err) => console.log(err.message)
		);
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
