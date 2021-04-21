import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./Screens/Auth/LoginScreen";
import PhoneVerificationScreen from "./Screens/Auth/PhoneVerificationScreen";
import SignUpScreen from "./Screens/Auth/SignUpScreen";
import ProductListing from "./Screens/ProductListing/ProductListing";
import ProductDescription from "./Screens/ProductDescription/ProductDescription";
import Home from "./Screens/Home/Home";
import Cart from "./Screens/Cart/Cart";
import WishList from "./Screens/WishList/WishList";
import ProductReviews from "./Screens/ProductDescription/Components/ProductReviews";
// import AddAddress from "./components/ProfileComponents/AddAddress";
// import StartRatingComponent from "./components/ProfileComponents/StartRatingComponent";
import PaymentScreen from "./Screens/Payment/PaymentScreen";
import PaymentView from "./Screens/Payment/PaymentView";
import PaymentSelection from "./Screens/Payment/PaymentSelection";
import Orders from './Screens/Orders/Orders';
import { DrawerContent } from './Navigation/DrawerContent';
import TabContent from "./Navigation/TabContent";
import Profile from "./Screens/Profile/Profile";
import AddressBook from './Screens/Profile/AddressBook';
import AddAddress from "./Screens/Profile/AddAddress";
import ProductDescScreen from "./Screens/ProductDescription/ProductDescription";
import SellerScreen from './Screens/Seller/SellerScreen';



const AuthStack = createDrawerNavigator();

export default function App() {
	enableScreens();
	const getFonts = () => {
		return Font.loadAsync({
			"popins-reg": require("./assets/fonts/Poppins-Regular.ttf"),
			"popins-med": require("./assets/fonts/Poppins-Medium.ttf"),
			"popins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
			"popins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
			"zilla-reg": require("./assets/fonts/ZillaSlab-Regular.ttf"),
			"zilla-med": require("./assets/fonts/ZillaSlab-Medium.ttf"),
			"zilla-bold": require("./assets/fonts/ZillaSlab-Bold.ttf"),
			"zilla-semibold": require("./assets/fonts/ZillaSlab-SemiBold.ttf"),
		});
	};

	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (fontsLoaded) {
		return (
			<>
			
				<NavigationContainer>
					<AuthStack.Navigator
						initialRouteName="MainDrawer"
						screenOptions={{
							headerShown: false,
						}}
						drawerContent={props => <DrawerContent {...props} />}
						drawerStyle={{
							backgroundColor: 'transparent',
							width: 270,
						  }}
					>
						<AuthStack.Screen name="MainDrawer" component={TabContent} />
						<AuthStack.Screen name="Cart" component={Cart} />
						<AuthStack.Screen name="AddAddress" component={AddAddress} />
						<AuthStack.Screen name="ProductDescription" component={ProductDescScreen} />
						<AuthStack.Screen name="Login" component={LoginScreen} />
						

						
					</AuthStack.Navigator>
					
				</NavigationContainer>
				
				
			</>
		);
	} else {
		return (
			<AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)}  onError={console.warn}/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
