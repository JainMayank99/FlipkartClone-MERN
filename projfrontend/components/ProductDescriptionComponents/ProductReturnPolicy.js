import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductReturnPolicy = () => {
    return (
        <View
            style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderBottomWidth: 8,
                borderColor: '#edeeef',
            }}>
            <Text style={styles.title}>Easy 30 days return and exchange</Text>

            <Text style={styles.subTitle}>
                Choose to return or exchange within 30 days .
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'popins-bold',
        fontSize: 18,
        color: '#1a2228',
    },
    subTitle: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: '#444d56',
    },
});
export default ProductReturnPolicy;
