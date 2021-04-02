import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
	Animated,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import ProductCarouselItem from "./ProductCarouselItem";
import Icon from "../../../components/Icon";
const { width, height } = Dimensions.get("window");

function infiniteScroll(dataList) {
	const numberOfData = dataList.length;
	let scrollValue = 0,
		scrolled = 0;
	flag = 0;

	setInterval(function () {
		if (scrolled == 0) flag = 0;
		if (scrolled == numberOfData - 1) flag = 1;
		if (flag === 0 && scrolled < numberOfData - 1) {
			scrollValue = scrollValue + width;
			scrolled++;
		} else {
			scrollValue = scrollValue - width;
			scrolled--;
		}

		this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
	}, 3000);
}

const ProductCarousel = ({ data, navigation }) => {
	const scrollX = new Animated.Value(0);
	let position = Animated.divide(scrollX, width);
	const [dataList, setDataList] = useState(data);

	useEffect(() => {
		setDataList(data);
		infiniteScroll(dataList);
	});

	if (data && data.length) {
		return (
			<View style={styles.body}>
				<StatusBar hidden />

				<FlatList
					data={data}
					ref={(flatList) => {
						this.flatList = flatList;
					}}
					// keyExtractor={item => item._id}
					keyExtractor={(item, index) => "key" + index}
					horizontal
					pagingEnabled
					scrollEnabled
					snapToAlignment="center"
					scrollEventThrottle={16}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => {
						return <ProductCarouselItem item={item} />;
					}}
					onScroll={Animated.event([
						{ nativeEvent: { contentOffset: { x: scrollX } } },
					])}
				/>

				<View style={styles.nav}>
					<Icon name="arrow-left" align="left" />
				</View>
				<TouchableOpacity
					style={styles.navend}
					onPress={() => navigation.navigate("Cart")}
				>
					<Icon name="shopping-cart" align="right" />
				</TouchableOpacity>
				<View style={styles.wishlist}>
					<Icon name="heart" align="rightbottom" />
				</View>
				<View style={styles.dotView}>
					{data.map((_, i) => {
						let opacity = position.interpolate({
							inputRange: [i - 1, i, i + 1],
							outputRange: [0.3, 1, 0.3],
							extrapolate: "clamp",
						});
						return (
							<Animated.View
								key={i}
								style={{
									opacity,
									height: 10,
									width: 10,
									backgroundColor: "#fc8019",
									margin: 8,
									borderRadius: 5,
								}}
							/>
						);
					})}
				</View>
			</View>
		);
	}

	// console.log("Please provide Images");
	return null;
};

const styles = StyleSheet.create({
	body: { height: height / 2, marginBottom: 4 },
	dotView: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: -35,
	},

	text: {
		fontFamily: "popins-med",
		fontSize: 20,
		color: "#20263e",
	},
	nav: {
		position: "absolute",
		top: 0,
		width: "100%",
	},
	wishlist: {
		position: "absolute",
		bottom: 0,
		right: 0,
	},
	navend: {
		position: "absolute",
		top: 0,
		justifyContent: "flex-end",
		width: "100%",
		flexDirection: "row",
	},
});

export default ProductCarousel;
