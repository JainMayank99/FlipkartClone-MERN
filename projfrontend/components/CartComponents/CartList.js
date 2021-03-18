import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
} from 'react-native';
import { Dimensions } from 'react-native';

import CartItem from './CartItem';
import PriceDetails from './PriceDetails';
import SavedItem from './SavedItem';

const CartList = () => {
    const image1 = {
        uri: require('../../assets/catIcons/download.png'),
    };
    const [gallery, setgallery] = useState([
        {
            image: require('../../assets/main/bsc2.jpg'),
            title: 'Solid State Kurta',
            cost: '4,500',
            key: '1',
            desc: 'Tribes Karnataka',
            discount: '30% off',
        },
        {
            image: require('../../assets/main/cat2.png'),
            title: 'Something',
            cost: '2,500',
            key: '2',
            desc: 'Tribes Karnataka',
            discount: '50% off',
        },

        {
            image: require('../../assets/main/bsc3.jpg'),
            title: 'Printed Kurta With Skirt ',
            cost: '2,750',
            key: '5',
            desc: 'Tribes Karnataka',
            discount: '10% off',
        },
        {
            image: require('../../assets/main/bsc3.jpg'),
            title: 'Printed Kurta With Skirt ',
            cost: '2,750',
            key: '6',
            desc: 'Tribes Karnataka',
            discount: '10% off',
        },
    ]);

    return (
        <ScrollView
            style={{
                paddingBottom: 150,
                borderBottomWidth: 10,
                borderColor: '#edeeef',
            }}>
            <View style={styles.body}>
                <Text style={styles.text}>My Cart</Text>
            </View>

            <FlatList
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <CartItem item={item} />;
                }}
            />
            <View
                style={{
                    borderBottomWidth: 10,
                    borderColor: '#edeeef',
                    paddingVertical: 4,
                }}></View>
            <PriceDetails />
            <View
                style={{
                    borderBottomWidth: 10,
                    borderColor: '#edeeef',
                }}></View>
            <View style={styles.saved}>
                <Image
                    source={image1.uri}
                    style={{
                        width: 22.5,
                        marginRight: 8,
                        height: 22.5,
                    }}
                />
                <Text style={styles.savedText}>Saved For Later</Text>
            </View>
            <FlatList
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <SavedItem item={item} />;
                }}
            />
            <View style={{ padding: 40 }}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Dimensions.get('screen').width * 0.04082,
        marginBottom: -4,
    },
    text: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#20263e',
        marginLeft: 3,
    },
    view: {
        fontFamily: 'popins-bold',
        fontSize: 18,
        color: '#20263e',
        paddingTop: 10,
        position: 'absolute',
        right: Dimensions.get('screen').width * 0.10714,
    },

    slider: {
        position: 'absolute',
        top: -5,
        right: -10,
        alignItems: 'center',
        width: 80,
        borderRadius: 5,
        padding: 2,
    },
    heading: {
        fontFamily: 'popins-med',
        fontSize: 20,
        color: '#20263e',
        paddingHorizontal: 8,
        letterSpacing: 0.5,
        textAlign: 'left',
    },
    saved: {
        paddingTop: 8,
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
    },
    savedText: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#20263e',
        marginLeft: 3,
    },
});

export default CartList;
