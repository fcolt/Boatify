import { useEffect, useRef, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import { Surface } from 'react-native-paper';
import data from '../../assets/data';
import { getAccessToken } from '../util/SFUtil';
import React from 'react';

const NO_OF_DEMO_ITEMS = 10;
const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, NO_OF_DEMO_ITEMS);

const CarouselCards = () => {
	const [index, setIndex] = useState(0);
	const [accessToken, setAccessToken] = useState('');
	const isCarousel = useRef(null)

	useEffect(() => {
    getAccessToken()
      .then((res) => setAccessToken(res))
      .catch(err => console.log(err));
  }, [])

	return (
		<Surface elevation={3}>
			<Carousel
				layout="tinder"
				layoutCardOffset={9}
				ref={isCarousel}
				data={shuffled}
				renderItem={item => <CarouselCardItem item={item.item} index={index} authToken={accessToken}/>}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				onSnapToItem={(index) => setIndex(index)}
				useScrollView={true}
				vertical={false}
				autoplay={true}
			/>
			<Pagination
				dotsLength={shuffled.length}
				activeDotIndex={index}
				carouselRef={isCarousel}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					marginHorizontal: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.92)'
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
				tappableDots={true}
			/>
		</Surface>
	)
}

export default CarouselCards;