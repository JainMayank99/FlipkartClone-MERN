import React, { useState, useEffect, useRef } from "react";
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
import Paginator from "../../../components/Paginator";
import { addProductToWishList } from "../../WishList/APICall/wishlistapi";
import { isAuthenticated } from "../../Auth/AuthAPICalls/authCalls";

const ProductCarousel = ({ data, navigation, itemId }) => {
	const [dataList, setDataList] = useState(data);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [user, setUser] = useState("");
	const [token, setToken] = useState("");

	const scrollX = useRef(new Animated.Value(0)).current;
	const slideRef = useRef(null);
	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	useEffect(() => {
		setDataList(data);
	});

	useEffect(() => {
		isAuthenticated()
			.then((res) => {
				if (res.user) {
					setUser(res.user._id);
					setToken(res.token);
				}
			})
			.catch((err) => {
				console.log("isAuthenticated error is ProductCarousel", err);
			});
	}, []);

	const addItemToWishList = () => {
		if (user.length !== 0) {
			addProductToWishList(user, itemId, token)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(
						"Error in adding item to wish list from product description",
						err
					);
				});
		} else {
			navigation.navigate("Login");
		}
	};

	if (data && data.length) {
		return (
			<View style={styles.container}>
				<StatusBar hidden />
				<View style={{ flex: 3 }}>
					<FlatList
						data={data}
						renderItem={({ item }) => <ProductCarouselItem item={item} />}
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

					<View style={styles.nav}>
						<Icon name="arrow-left" align="left" />
					</View>
					<TouchableOpacity
						style={styles.navend}
						onPress={() => navigation.navigate("Cart")}
					>
						<Icon name="shopping-cart" align="right" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.wishlist}
						onPress={() => {
							addItemToWishList();
						}}
					>
						<Icon name="heart" align="rightbottom" />
					</TouchableOpacity>
				</View>
				<Paginator data={data} scrollX={scrollX} />
			</View>
		);
	}

	// console.log("Please provide Images");
	return null;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
