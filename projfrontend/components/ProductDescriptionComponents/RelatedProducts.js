import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

const RelatedProducts = () => {
    const [gallery, setgallery] = useState([
        {
            image: require('../../assets/main/bsj1.jpg'),
            title: 'Handcrafted Jewellery Set',
            cost: '4,500',
            key: '1',
            desc: 'Tribes Karnataka',
            discount: '30% off',
        },
        {
            image: require('../../assets/main/bsj2.jpg'),
            title: 'Temple Jewellery Set',
            cost: '3,500',
            key: '2',
            desc: 'Tribes Karnataka',
            discount: '50% off',
        },
        {
            image: require('../../assets/main/bsj3.webp'),
            title: 'Dome Shaped Studs',
            cost: '2,750',
            key: '3',
            desc: 'Tribes Karnataka',
            discount: '10% off',
        },

        {
            image: require('../../assets/main/bsj4.jpg'),
            title: 'Gold Plated Mang Teeka',
            cost: '1,500',
            key: '4',
            desc: 'Tribes Karnataka',
            discount: '25% off',
        },
        {
            image: require('../../assets/main/bsj5.jpg'),
            title: 'Gold Plated ring',
            cost: '2,500',
            key: '5',
            desc: 'Tribes Karnataka',
            discount: '20% off',
        },
        {
            image: require('../../assets/main/bsj6.webp'),
            title: 'Gold Plated Nosepin',
            cost: '3,700',
            key: '6',
            desc: 'Tribes Karnataka',
            discount: '40% off',
        },
    ]);
    const image = {
        uri: require('../../assets/catIcons/thumbs-up.png'),
    };
    return (
        <View
            style={{
                paddingBottom: 16,
                borderBottomWidth: 10,
                borderColor: '#edeeef',
            }}>
            <View style={styles.body}>
                <Image
                    source={image.uri}
                    style={{
                        width: 24,
                        marginRight: 8,
                        height: 24,
                    }}
                />
                <Text style={styles.text}>Related Products</Text>
            </View>

            <FlatList
                horizontal
                horizontal={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                marginLeft: 8,
                                paddingBottom: 16,
                                paddingHorizontal: 8,
                            }}>
                            <TouchableOpacity>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: 87.5,
                                        height: 105,
                                        borderRadius: 5,
                                        resizeMode: 'cover',
                                    }}
                                />
                                <View style={styles.discountBox}>
                                    <Text style={styles.textDiscount}>
                                        50% OFF
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 4,
        paddingHorizontal: 16,
    },
    text: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#20263e',
        paddingTop: 10,
        marginLeft: 3,
    },
    discountBox: {
        position: 'absolute',
        bottom: -10,
        left: 6.25,
        alignItems: 'center',
        backgroundColor: '#FC8019',
        width: 75.5,
        borderRadius: 5,
        padding: 2,
    },
    textDiscount: {
        fontFamily: 'popins-bold',
        fontSize: 14,
        color: 'white',
    },
});
export default RelatedProducts;
