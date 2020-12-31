import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import HomeScreen from './Screens/HomeScreen';
import Home from './Screens/Home';
import Categories from './components/Categories';
import ProductDescScreen from './Screens/ProductDescScreen';

export default function App() {
    const getFonts = () => {
        return Font.loadAsync({
            'popins-reg': require('./assets/fonts/Poppins-Regular.ttf'),
            'popins-med': require('./assets/fonts/Poppins-Medium.ttf'),
            'popins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
            'popins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        });
    };

    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {
        return <ProductDescScreen />;
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
