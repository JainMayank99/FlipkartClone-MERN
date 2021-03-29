import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ProductListing from "./Screens/ProductListing/ProductListing";
import ProductDescription from "./Screens/ProductDescription/ProductDescription";
import Home from "./Screens/Home/Home";

const AuthStack = createStackNavigator();

export default function App() {
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
			// <NavigationContainer>
			//     <AuthStack.Navigator
			//         initialRouteName='Login'
			//         screenOptions={{
			//             headerShown: false,
			//         }}>
			//         <AuthStack.Screen name='Login' component={LoginScreen} />
			//         <AuthStack.Screen
			//             name='Verification'
			//             component={PhoneVerificationScreen}
			//         />
			//         <AuthStack.Screen
			//             name='Register'
			//             component={SignUpScreen}
			//         />
			//     </AuthStack.Navigator>
			// </NavigationContainer>
			// <CatProductsListing category="6056e7146e98663c74f5b84a" />
			// <ProductListing />
			// <MayankListing category="6061c5689cc9850b18fb1d39" />
			// <MayankListing />

			<NavigationContainer>
				<AuthStack.Navigator
					initialRouteName="ProductListing"
					screenOptions={{
						headerShown: false,
					}}
				>
					<AuthStack.Screen name="ProductListing" component={ProductListing} />

					<AuthStack.Screen
						name="ProductDescription"
						component={ProductDescription}
					/>
				</AuthStack.Navigator>
			</NavigationContainer>
		);
	} else {
		return (
			<AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
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
