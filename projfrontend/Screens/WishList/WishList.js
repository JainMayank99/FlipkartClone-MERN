import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";

import WishListItems from "./components/WishListItems";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllWishListItemsByUserId } from "./APICall/WishlistAPI";

const WishList = ({ navigation }) => {
	const [language, setLanguage] = useState("en");
	const [loading, setLoading] = useState(false);
	const [itemList, setItemList] = useState([]);
	const [showWishlist, setShowWishlist] = useState(false);

	const onChangeWishlist =(newData) =>{
		if (newData != itemList){
			setItemList(newData);
		  } 
	}

	useEffect(() => {
		isAuthenticated()
			.then((res) => {
				if (res.user) {
					getAllWishListItemsByUserId(res.user._id, res.token)
						.then((res) => {
							onChangeWishlist(res.data)
							setShowWishlist(true);
						})
						.catch((err) => {
							console.log("wishlist fetching error: " + err);
						});
				} else {
					setShowWishlist(false);
				}
			})
			.catch((err) => {
				console.log("wishlist screen error: " + err);
			});
	}, []);

	const mainWork = (lang) => {
		setLanguage(lang);
		setLoading(false);
	};
	const changeLanguage = (lang) => {
		setLoading(true);
		setTimeout(() => {
			mainWork(lang);
		}, 500);
	};

	return (
		<View>
			{console.log("rerender")}
			<View style={loading === true ? styles.overlay : null}>
				{loading === true ? (
					<LottieView
						style={styles.lottie}
						autoPlay
						loop
						source={require("../../assets/animations/loader.json")}
					/>
				) : null}

				<Header
					language={language}
					changeLanguage={changeLanguage}
					navigation={navigation}
				/>
				<View
					style={{
						marginTop: 105,
					}}
				>
					{showWishlist ? (
						<WishListItems itemList={itemList} navigation={navigation} onChangeWishlist={onChangeWishlist}/>
					) : (
						<View style={styles.login}>
							<TouchableOpacity onPress={() => navigation.navigate("Login")}>
								<Text style={styles.loginText}>Login to continue {">>"}</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "relative",
		height: "100%",
		width: "100%",
		zIndex: 10,
	},
	lottie: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.5)",
		height: "100%",
		width: "100%",
		zIndex: 10,
	},
	login: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "50%",
	},
	loginText: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "#fc8019",
	},
});
export default WishList;
