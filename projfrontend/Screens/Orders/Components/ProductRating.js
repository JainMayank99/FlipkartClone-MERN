import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

// const width = Dimensions.get('screen').width;
const ProductRating = () => {
	return (
		<View
			style={{
				paddingVertical: 8,
				paddingHorizontal: 16,
				borderBottomWidth: 8,
				borderColor: "#edeeef",
			}}
		>
			<Text style={styles.title}>Ratings & Reviews</Text>

			<View style={styles.subTitle}>
				<Text style={styles.textRating}>
					<Feather name="star" size={22} style={styles.icon} />
					<Text> 4.5</Text> out of 5
				</Text>
				<Text style={styles.text}>
					<Feather name="user" size={22} style={styles.icon} />
					<Text> 716 Global Ratings & 69 Reviews .</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#1a2228",
	},
	subTitle: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "#444d56",
	},
	textRating: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "black",
	},
	icon: {
		color: '#FF6B3C',
	},
	text: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "black",
	},
});
export default ProductRating;
