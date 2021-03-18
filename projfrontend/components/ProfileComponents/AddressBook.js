import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Dash from 'react-native-dash';
import { Feather } from '@expo/vector-icons';

import Screen from '../Screen';

const AddressBook = () => {
    return (
        <Screen style={styles.screen}>
            <Text style={styles.heading}>My Addresses</Text>
            <View style={styles.view}>
                <View style={{ height: 30, paddingRight: 8 }}>
                    <Feather name='plus' size={22.5} color='#FC8019' />
                </View>

                <Text style={styles.subHeading}>Add Address</Text>
            </View>
            <Dash
                dashGap={-1}
                dashLength={7.5}
                dashThickness={1.5}
                dashColor='#edeeef'
                dashStyle={{ borderRadius: 100, overflow: 'hidden' }}
                style={{
                    width: '100%',
                    height: 8,
                    borderRadius: 100,
                }}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 8,
    },
    heading: {
        fontFamily: 'popins-reg',
        fontSize: 20,
        color: 'black',
        paddingVertical: 6,
    },
    subHeading: {
        fontFamily: 'popins-reg',
        fontSize: 18,
        color: 'black',
        paddingVertical: 6,
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default AddressBook;
