import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native';
import HeaderIcon from '../HeaderIcon';
import Screen from '../Screen';

const ProductHeader = () => {
    return (
        <Screen>
            <StatusBar hidden />
            <View style={styles.body}>
                <HeaderIcon name='menu' />
                <Text style={styles.text}>Rajender</Text>
                <HeaderIcon name='shopping-cart' />
            </View>
        </Screen>
    );
};
const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        position: 'relative',
    },
    text: {
        fontFamily: 'popins-med',
        fontSize: 20,
        color: '#20263e',
    },
});
export default ProductHeader;
