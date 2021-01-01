import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductCarouselItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={item.url} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width,
        height: height / 2,
        backgroundColor: 'black',
        opacity: 0.925,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 6,
    },

    image: {
        width: width,
        height: height / 2,
    },
    itemTitle: {
        color: 'white',
        fontSize: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        elevation: 5,
        fontFamily: 'popins-med',
    },
});

export default ProductCarouselItem;
