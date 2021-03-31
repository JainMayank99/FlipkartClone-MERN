import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import { Image as ExpoImage } from "react-native-expo-image-cache";

import { getRelatedProduct } from "../APICalls/relatedProduct";

const RelatedProducts = ({ categoryId, navigation }) => {
	// console.log("categoryId", categoryId);
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		getRelatedProduct(categoryId)
			.then((res) => {
				setGallery(res.data);
				// console.log(res.data);
			})
			.catch((err) => {
				console.log("Error in getting related products", err);
			});
	}, []);

	const image = {
		uri: require("../../../assets/catIcons/thumbs-up.png"),
	};
	return (
		<View
			style={{
				paddingBottom: 16,
				borderBottomWidth: 10,
				borderColor: "#edeeef",
			}}
		>
			<View style={styles.body}>
				<Image
					source={image.uri}
					style={{
						width: 24,
						marginRight: 8,
						height: 24,
					}}
				/>
				<Text style={styles.text}>Related Products</Text>
			</View>

			<FlatList
				horizontal
				horizontal={true}
				data={gallery}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								marginLeft: 8,
								paddingBottom: 16,
								paddingHorizontal: 8,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("ProductDescription", {
										item,
									});
								}}
							>
								<ExpoImage
									style={{
										width: 87.5,
										height: 105,
										borderRadius: 5,
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
									source={item.image}
									style={{
										width: 87.5,
										height: 105,
										borderRadius: 5,
										resizeMode: "cover",
									}}
								/> */}
								<View style={styles.discountBox}>
									<Text style={styles.textDiscount}>{item.discount}% OFF</Text>
								</View>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 4,
		paddingHorizontal: 16,
	},
	text: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#20263e",
		paddingTop: 10,
		marginLeft: 3,
	},
	discountBox: {
		position: "absolute",
		bottom: -10,
		left: 6.25,
		alignItems: "center",
		backgroundColor: "#FC8019",
		width: 75.5,
		borderRadius: 5,
		padding: 2,
	},
	textDiscount: {
		fontFamily: "popins-bold",
		fontSize: 14,
		color: "white",
	},
});
export default RelatedProducts;
