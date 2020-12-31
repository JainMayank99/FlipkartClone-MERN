import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductInfo = () => {
    return (
        <View
            style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderBottomWidth: 8,
                borderColor: '#edeeef',
            }}>
            <Text style={styles.title}>Description</Text>

            <Text style={styles.subTitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse at lacus ut neque suscipit aliquet eget sed purus.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Nulla interdum placerat dignissim. Nunc ultrices leo blandit
                rhoncus bibendum. In convallis lectus non orci rhoncus
                imperdiet.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#1a2228',
    },
    subTitle: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: '#444d56',
        textAlign: 'justify',
    },
});
export default ProductInfo;
