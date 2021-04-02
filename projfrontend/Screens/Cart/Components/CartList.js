import React, { useState, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ScrollView,
	Image,
} from "react-native";
import { Dimensions } from "react-native";

import CartItem from "./CartItem";
import PriceDetails from "./PriceDetails";
import SavedItem from "./SavedItem";

const CartList = ({ itemList, navigation }) => {
	const image1 = {
		uri: require("../../../assets/catIcons/download.png"),
	};

	const [savedForLaterList, setSavedForLaterList] = useState(
		itemList.filter((item) => item.isSavedForLater == true)
	);
	const [cartItemList, setCartItemList] = useState(
		itemList.filter((item) => item.isSavedForLater == false)
	);

	return (
		<ScrollView
			style={{
				paddingBottom: 150,
				borderBottomWidth: 10,
				borderColor: "#edeeef",
			}}
		>
			<View style={styles.body}>
				<Text style={styles.text}>My Cart</Text>
			</View>

			<FlatList
				data={cartItemList}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return <CartItem item={item} navigation={navigation} />;
				}}
			/>
			<View
				style={{
					borderBottomWidth: 10,
					borderColor: "#edeeef",
					paddingVertical: 4,
				}}
			></View>
			<PriceDetails itemList={itemList} />
			<View
				style={{
					borderBottomWidth: 10,
					borderColor: "#edeeef",
				}}
			></View>
			{savedForLaterList.length > 0 ? (
				<React.Fragment>
					<View style={styles.saved}>
						<Image
							source={image1.uri}
							style={{
								width: 22.5,
								marginRight: 8,
								height: 22.5,
							}}
						/>
						<Text style={styles.savedText}>Saved For Later</Text>
					</View>
					<FlatList
						data={savedForLaterList}
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => {
							return <SavedItem item={item} navigation={navigation} />;
						}}
					/>
				</React.Fragment>
			) : null}
			<View style={{ padding: 72 }}></View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: Dimensions.get("screen").width * 0.04082,
		marginBottom: -4,
	},
	text: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#20263e",
		marginLeft: 3,
	},
	view: {
		fontFamily: "popins-bold",
		fontSize: 18,
		color: "#20263e",
		paddingTop: 10,
		position: "absolute",
		right: Dimensions.get("screen").width * 0.10714,
	},

	slider: {
		position: "absolute",
		top: -5,
		right: -10,
		alignItems: "center",
		width: 80,
		borderRadius: 5,
		padding: 2,
	},
	heading: {
		fontFamily: "popins-med",
		fontSize: 20,
		color: "#20263e",
		paddingHorizontal: 8,
		letterSpacing: 0.5,
		textAlign: "left",
	},
	saved: {
		paddingTop: 8,
		paddingHorizontal: 16,
		flex: 1,
		flexDirection: "row",
	},
	savedText: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#20263e",
		marginLeft: 3,
	},
});

export default CartList;
