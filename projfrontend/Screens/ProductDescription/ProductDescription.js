import React, { useState } from "react";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
} from "react-native";
import LottieView from "lottie-react-native";
import ProductInfo from "./Components/ProductInfo";
import ProductCarousel from "./Components/ProductCarousel";
import ProductReturnPolicy from "./Components/ProductReturnPolicy";
import ProductReviews from "./Components/ProductReviews";
import ProductTitle from "./Components/ProductTitle";
import RelatedProducts from "./Components/RelatedProducts";
import { addProductToCart } from "../Cart/APICall/cartAPI";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

const ProductDescScreen = ({ route, navigation }) => {
	const { item } = route.params;

	const [addTo, setAddTo] = useState(false);
	const [msg, setMsg] = useState("Add to cart");
	const [language, setLanguage] = useState("en");
	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);

	// const item = {
	//   name: "Product",
	//   price: "3232",
	//   discount: "10",
	//   description: "test description",
	//   _id: "1",
	//   avgRating: "4.2",
	//   image: require("../../assets/main/cat2.png"),
	// };

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

	const onCartButtonPressed = () => {
		isAuthenticated().then((res) => {
			if (res.user) {
				if (addTo === false) {
					setMsg("Go to cart");
					setAddTo(!addTo);
					setAdding(true);

					addProductToCart(res.user._id, item._id, res.token)
						.then((res) => {
							// console.log(res.data);
							setAdding(false);
						})
						.catch((err) => {
							console.log("Error in addProductToCart", err);
						});

					// setTimeout(() => setAdding(false), 2000);
				} else {
					navigation.navigate("Cart");
				}
			} else {
				navigation.navigate("Login");
			}
		});
	};

	return (
		<>
			{(console.disableYellowBox = true)}
			<View style={loading === true ? styles.overlay : null}>
				{loading === true || adding === true ? (
					<LottieView
						style={styles.lottie}
						autoPlay
						loop
						source={require("../../assets/animations/loader.json")}
					/>
				) : null}
				<ScrollView>
					<ProductCarousel data={item.image} navigation={navigation} />

					<ProductTitle
						name={item.name}
						price={item.price}
						discount={item.discount}
					/>
					<ProductInfo description={item.description} />
					<ProductReturnPolicy />
					<ProductReviews id={item._id} avgRating={item.avgRating} />
					<RelatedProducts categoryId={item.category} navigation={navigation} />
				</ScrollView>
			</View>
			<TouchableOpacity onPress={onCartButtonPressed} style={styles.add}>
				<Text style={styles.submit}>{msg}</Text>
			</TouchableOpacity>
		</>
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
	add: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fc8019",
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
	},
	submit: {
		fontFamily: "popins-med",
		fontSize: 20,
		color: "white",
	},
});

export default ProductDescScreen;
