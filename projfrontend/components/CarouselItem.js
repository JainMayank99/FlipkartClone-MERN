import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CarouselItem = ({ item }) => {
	return (
		<View style={styles.cardView}>
			<Image style={styles.image} source={{ uri: item.url }} />
			<View style={styles.textView}>
				<Text style={styles.itemTitle}> {item.title}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardView: {
		flex: 1,
		width: width,
		height: height / 3,
		backgroundColor: "white",
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0.5, height: 0.5 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 6,
		borderRadius: 2.5,
	},

	textView: {
		position: "absolute",
		bottom: 10,
		margin: 10,
		left: 5,
	},
	image: {
		width: width,
		height: height / 3,
		borderRadius: 2.5,
	},
	itemTitle: {
		color: "white",
		fontSize: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0.8, height: 0.8 },
		shadowOpacity: 1,
		shadowRadius: 3,
		marginBottom: 5,
		elevation: 5,
		fontFamily: "popins-med",
	},
});

export default CarouselItem;
