import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image as ExpoImage } from "react-native-expo-image-cache";

import { isAuthenticated } from "../../Auth/AuthAPICalls/authCalls";
import { removeProductFromWishList } from "../APICall/WishlistAPI";

const WishListItemDetails = ({ item, navigation }) => {
	// console.log("item", item);
	const [user, setUser] = useState();
	const [token, setToken] = useState();
	const [product, setProduct] = useState(item.product);

	useEffect(() => {
		isAuthenticated()
			.then((res) => {
				setUser(res.user._id);
				setToken(res.token);
			})
			.catch((err) => {
				console.log("isAuthenticated in Wishlist", err);
			});
	}, []);

	const removeItemFromWishlist = () => {
		console.log("removeItemFromWishlist");
		removeProductFromWishList(user, item.product._id, token)
			.then((res) => {
				console.log(res.data);
				// navigation.navigate("Cart");
				// rerender();/
			})
			.catch((err) => {
				console.log("updateQuantityInCart error", err);
			});
	};

	const image = {
		uri: require("../../../assets/catIcons/trash.png"),
	};
	const width = Dimensions.get("screen").width;

	return (
		<View
			style={{
				paddingVertical: 16,
				paddingHorizontal: Dimensions.get("screen").width * 0.02041,
				borderBottomWidth: 0.6,
				borderColor: "#edeeef",
				borderRadius: 2,
			}}
		>
			<TouchableOpacity
				style={styles.trash}
				onPress={() => {
					removeItemFromWishlist();
					// console.log("removeItemFromWishlist");
				}}
			>
				<Image
					source={image.uri}
					style={{
						width: 22.5,
						marginRight: 8,
						height: 22.5,
					}}
				/>
			</TouchableOpacity>
			<TouchableWithoutFeedback>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<View
						style={{
							marginLeft: Dimensions.get("screen").width * 0.02041,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("ProductDescription", {
									item: product,
								});
							}}
						>
							<ExpoImage
								style={{
									width: width * 0.26785,
									height: 130,
									borderRadius: 5,
									resizeMode: "cover",
								}}
								preview={{
									uri: item.product.image[0].url
										.slice(0, 48)
										.concat("t_media_lib_thumb/")
										.concat(item.product.image[0].url.slice(48)),
								}}
								uri={item.product.image[0].url}
							/>
							{/* <Image
								source={item.item.image}
								style={{
									width: width * 0.26785,
									height: 130,
									borderRadius: 5,
									resizeMode: "cover",
								}}
							/> */}
						</TouchableOpacity>
						<View style={styles.discountBox}>
							<Text style={styles.textDiscount}>
								{item.product.discount + " %"}{" "}
							</Text>
						</View>
					</View>
					<View style={styles.detailsBox}>
						<Text style={styles.textDetails}>{item.product.name}</Text>
						<Text style={styles.tribeDetails}>{item.product.description}</Text>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between",
								width: 200,
							}}
						>
							<Text style={styles.rating}>
								<Feather name="star" size={22} style={styles.icon} />
								<Text>{item.product.avgRating}</Text>
								<Text>/5</Text>
							</Text>
							<Text style={styles.price}>
								<Text style={{ fontSize: 22 }}>₹</Text>
								<Text>{item.product.price}</Text>
							</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};
const styles = StyleSheet.create({
	view: {
		fontFamily: "popins-bold",
		fontSize: 18,
		color: "#20263e",
		paddingTop: 10,
		position: "absolute",
		right: Dimensions.get("screen").width * 0.10714,
	},
	trash: {
		position: "absolute",
		top: 20,
		right: -15,
		alignItems: "center",
		width: 80,
		borderRadius: 5,
		padding: 2,
	},

	discountBox: {
		position: "absolute",
		bottom: -10,
		left: 12.5,
		alignItems: "center",
		backgroundColor: "#FC8019",
		width: 80,
		borderRadius: 5,
		padding: 2,
	},
	textDiscount: {
		fontFamily: "popins-bold",
		fontSize: 14,
		color: "white",
	},
	detailsBox: {
		padding: 4,
		marginLeft: 24,
		width: 200,
	},
	textDetails: {
		fontFamily: "popins-bold",
		fontSize: 18,
		color: "black",
		paddingVertical: 2,
	},
	tribeDetails: {
		fontFamily: "popins-semibold",
		fontSize: 17,
		color: "#4d4b50",
		paddingVertical: 2,
	},
	rating: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "#4d4b50",
		paddingVertical: 4,
	},
	price: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "#4d4b50",
	},
});

export default WishListItemDetails;
