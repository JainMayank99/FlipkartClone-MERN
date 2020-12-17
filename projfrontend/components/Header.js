import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native';
import HeaderIcon from './HeaderIcon';
import Screen from './Screen';
import SearchBar from './SearchBar';

const Header = () => {
    const image = {
        uri:
            'https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    };
    return (
        <Screen>
            <StatusBar hidden />
            <View style={styles.body}>
                <HeaderIcon name='menu' />
                <Text style={styles.text}>Rajender</Text>
                <HeaderIcon name='shopping-cart' />
            </View>
            <SearchBar />
        </Screen>
    );
};
const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 16,
    },
    text: {
        fontFamily: 'popins-med',
        fontSize: 20,
        color: '#20263e',
    },
});
export default Header;
