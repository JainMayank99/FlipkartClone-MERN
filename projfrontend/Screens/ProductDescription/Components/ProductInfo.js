import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductInfo = ({ description }) => {
	return (
		<View
			style={{
				paddingVertical: 8,
				paddingHorizontal: 16,
				borderBottomWidth: 8,
				borderColor: "#edeeef",
			}}
		>
			<Text style={styles.title}>Description</Text>

			<Text style={styles.subTitle}>
				{description}
				{/* This jewellery set consists of a necklace and earrings Pink
                gold-plated ruby-studded traditional necklace, intricate peacock
                design and pearl droplets, secured with an S-Hook closure Pair
                of matching drop earrings secured with post and back closure . */}
			</Text>
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
		textAlign: "justify",
	},
});
export default ProductInfo;
