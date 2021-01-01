import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const width = Dimensions.get('screen').width;
const ProductReviews = () => {
    return (
        <View
            style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderBottomWidth: 8,
                borderColor: '#edeeef',
            }}>
            <Text style={styles.title}>Customer Reviews</Text>

            <View style={styles.customerReview}>
                <Text style={styles.text}>
                    <Feather name='star' size={22} style={styles.icon} />
                    <Text> 4 out of 5</Text>
                </Text>
                <Text style={styles.review}>
                    The pendant is really nice but the chain is not of that gud
                    quality.
                </Text>
                <Text style={styles.user}>Ayushi</Text>
            </View>

            <View style={styles.customerReview}>
                <Text style={styles.text}>
                    <Feather name='star' size={22} style={styles.icon} />
                    <Text> 4.5 out of 5</Text>
                </Text>
                <Text style={styles.review}>
                    This piece is so stunning and also it looks classy.
                </Text>
                <Text style={styles.user}>Shikha Gupta</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#1a2228',
    },

    icon: {
        color: '#FC8019',
    },
    text: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: 'black',
    },
    review: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 4,
    },
    user: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 4,
    },
    customerReview: {
        paddingVertical: 8,
    },
});
export default ProductReviews;
