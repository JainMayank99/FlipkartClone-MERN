import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from './components/Categories';
import ProductDescScreen from './Screens/ProductDescScreen';
import ProductListings from './Screens/ProductListings';
import WishList from './Screens/WishList';
import Cart from './Screens/Cart';
import Profile from './components/ProfileComponents/Profile';
import AddressBook from './components/ProfileComponents/AddressBook';
import AddAddress from './components/ProfileComponents/AddAddress';
import EditProfile from './components/ProfileComponents/EditProfile';
import ChangePassword from './components/ProfileComponents/ChangePassword';
import StarRatingComponent from './components/ProfileComponents/StartRatingComponent';
import Orders from './Screens/Orders';

import LoginScreen from './Screens/Auth/LoginScreen';
import PhoneVerificationScreen from './Screens/Auth/PhoneVerificationScreen';
import SignUpScreen from './Screens/Auth/SignUpScreen';
import Home from './Screens/Home/Home';

const AuthStack = createStackNavigator();


export default function App() {
    const getFonts = () => {
        return Font.loadAsync({
            'popins-reg': require('./assets/fonts/Poppins-Regular.ttf'),
            'popins-med': require('./assets/fonts/Poppins-Medium.ttf'),
            'popins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
            'popins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
            'zilla-reg': require('./assets/fonts/ZillaSlab-Regular.ttf'),
            'zilla-med': require('./assets/fonts/ZillaSlab-Medium.ttf'),
            'zilla-bold': require('./assets/fonts/ZillaSlab-Bold.ttf'),
            'zilla-semibold': require('./assets/fonts/ZillaSlab-SemiBold.ttf')
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
            <ProductListings/>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
