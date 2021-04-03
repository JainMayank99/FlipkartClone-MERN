import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Dash from "react-native-dash";

const PriceDetails = ({ itemList }) => {
	console.log("Price Details", itemList);

	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);

	useEffect(() => {
		itemList.map((item) => {
			let price = item.product.price;
			let prodDiscount = item.product.discount;

			setTotalPrice(totalPrice + price);
			setDiscount(discount + (prodDiscount * price) / 100);
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Price Details</Text>
			<View style={styles.view}>
				<Text style={styles.subText}>Price (3 Items)</Text>
				<Text style={styles.subText}>₹{totalPrice}</Text>
			</View>
			<View style={styles.view}>
				<Text style={styles.subText}>Discount</Text>
				<Text style={styles.green}>₹{discount}</Text>
			</View>
			{/* <View style={styles.view}>
			<Text style={styles.subText}>Delivery Charges</Text>
			<Text style={styles.subText}>₹50</Text>
		</View> */}
			<Dash
				dashGap={5}
				dashLength={7.5}
				dashThickness={1.5}
				dashColor="#20263e"
				dashStyle={{ borderRadius: 100, overflow: "hidden" }}
				style={{
					paddingTop: 4,
					width: "100%",
					height: 10,
					borderRadius: 100,
				}}
			/>
			<View style={styles.view}>
				<Text style={styles.subText}>Total Amount</Text>
				<Text style={styles.subText}>₹{totalPrice - discount}</Text>
			</View>

			<Dash
				dashGap={-1}
				dashLength={7.5}
				dashThickness={1.5}
				dashColor="#20263e"
				dashStyle={{ borderRadius: 100, overflow: "hidden" }}
				style={{
					width: "100%",
					height: 10,
					borderRadius: 100,
				}}
			/>
			<View style={styles.view}>
				<Text style={styles.green}>Total Savings</Text>
				<Text style={styles.green}>₹{discount}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	view: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 4,
	},
	heading: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#20263e",
	},
	subText: {
		fontFamily: "popins-med",
		fontSize: 17,
	},
	green: {
		fontFamily: "popins-med",
		fontSize: 17,
		color: "#50c878",
	},
});

export default PriceDetails;
