import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
	Animated,
} from "react-native";
import Paginator from "./Paginator";
import CarouselItem from "./CarouselItem";

const Carousel = ({ data }) => {
	const [dataList, setDataList] = useState(data);
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slideRef = useRef(null);
	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	useEffect(() => {
		setDataList(data);
	});

	return (
		<View style={styles.container}>
			<View style={{ flex: 3 }}>
				<FlatList
					data={data}
					renderItem={({ item }) => <CarouselItem item={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					scrollEventThrottle={32}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={slideRef}
				/>
			</View>
			<Paginator data={data} scrollX={scrollX} />
		</View>
	);

	// console.log('Please provide Images');
	// return null;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Carousel;
