import React, { useState } from "react";
import { View, StyleSheet,Text } from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import CartItem from "./Components/CartItem";
import CartList from "./Components/CartList";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

const Cart = () => {
	const [language, setLanguage] = useState("en");
	const [loading, setLoading] = useState(false);

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
			
				<View style={loading === true ? (styles.overlay):null}>
				{loading === true ? <LottieView
						style={styles.lottie}
						autoPlay
						loop
						source={require("../../assets/animations/loader.json")}
					/>:null}
					<Header language={language} changeLanguage={changeLanguage} />
					<View
						style={{
							marginTop: 105,
						}}
					>
						{isAuthenticated!==false? <CartList />:<View style={styles.login}>
							<Text style={styles.loginText}>Login to continue {">>"}</Text>
						</View>}
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
		flex:1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "50%"
	},
	loginText: {
		fontFamily: "zilla-reg",
		fontSize: 20,
        color: "#fc8019",
	}
});
export default Cart;
