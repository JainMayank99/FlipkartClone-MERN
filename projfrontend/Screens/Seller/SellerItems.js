import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions,ScrollView } from "react-native";
import SellerItemDetails from './SellerItemDetails';



const SellerItems = ({ itemList, navigation,onChangeSellerList }) => {
	return (
		<View
			style={{
				marginBottom:150,
				borderBottomWidth: 10,
				borderColor: "#edeeef",
			}}
		>
			<View style={styles.body}>
				<Text style={styles.text}>My Products</Text>
			</View>
			<ScrollView showsHorizontalScrollIndicator={false}>
			<FlatList
				data={itemList}
				extraData={itemList}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return <SellerItemDetails item={item} navigation={navigation} onChangeSellerList={onChangeSellerList}/>;
				}}
			/>
			<View style={{padding: 88}}/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: "center",
		padding: Dimensions.get("screen").width * 0.02041,
		paddingHorizontal: Dimensions.get("screen").width * 0.04082,
		marginBottom: 16,
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
});

export default SellerItems;
