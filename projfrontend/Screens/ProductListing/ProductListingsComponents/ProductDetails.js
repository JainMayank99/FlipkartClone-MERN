import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image as ExpoImage } from "react-native-expo-image-cache";

const ProductDetails = ({ item, route, navigation }) => {
	// console.log("ProductDetail", item);
	const image = {
		uri: require("../../../assets/catIcons/like.png"),
	};
	const width = Dimensions.get("screen").width;

	const text_truncate = function (str, length, ending) {
		if (length == null) {
			length = 100;
		}
		if (ending == null) {
			ending = " ...";
		}
		if (str.length > length) {
			return str.substring(0, length - ending.length) + ending;
		} else {
			return str;
		}
	};

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
			<View style={styles.like}>
				<Image
					source={image.uri}
					style={{
						width: 22.5,
						marginRight: 8,
						height: 22.5,
					}}
				/>
			</View>
			<TouchableOpacity
				onPress={() => {
					// console.log("clicked");
					navigation.navigate("ProductDescription", {
						item,
					});
				}}
			>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<View
						style={{
							marginLeft: Dimensions.get("screen").width * 0.02041,
						}}
					>
						<ExpoImage
							style={{
								width: width * 0.26785,
								height: 130,
								borderTopLeftRadius: 5,
								borderTopRightRadius: 5,
								resizeMode: "cover",
							}}
							preview={{
								uri: item.image[0].url
									.slice(0, 48)
									.concat("t_media_lib_thumb/")
									.concat(item.image[0].url.slice(48)),
							}}
							uri={item.image[0].url}
						/>
						{/* <Image
								source={item.image[0].url}
								style={{
									width: width * 0.26785,
									height: 130,
									borderRadius: 5,
									resizeMode: "cover",
								}}
							/> */}

						<View style={styles.discountBox}>
							<Text style={styles.textDiscount}>{item.discount}% off</Text>
						</View>
					</View>
					<View style={styles.detailsBox}>
						<Text style={styles.textDetails}>
							{text_truncate(item.name, 22)}
						</Text>
						<Text style={styles.tribeDetails}>{item.description}</Text>
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
								<Text>{item.avgRating}</Text>
								<Text>/5</Text>
							</Text>
							<Text style={styles.price}>
								<Text style={{ fontSize: 22 }}>₹</Text>
								<Text>{item.price}</Text>
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	view: {
		fontFamily: "zilla-bold",
		fontSize: 24,
		color: "#20263e",
		paddingTop: 10,
		position: "absolute",
		right: Dimensions.get("screen").width * 0.10714,
	},
	like: {
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
		fontFamily: "zilla-bold",
		fontSize: 16,
		color: "white",
	},
	detailsBox: {
		padding: 4,
		marginLeft: 24,
		width: 200,
	},
	textDetails: {
		fontFamily: "zilla-semibold",
		fontSize: 22.5,
		color: "black",
		paddingVertical: 2,
	},
	tribeDetails: {
		fontFamily: "zilla-med",
		fontSize: 20,
		color: "#4d4b50",
		paddingVertical: 8,
	},
	rating: {
		fontFamily: "zilla-med",
		fontSize: 19,
		color: "#4d4b50",
		paddingVertical: 4,
	},
	price: {
		fontFamily: "zilla-med",
		fontSize: 19,
		color: "#4d4b50",
	},
});

export default ProductDetails;
