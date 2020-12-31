import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const BestSellingInCat = () => {
    const width = Dimensions.get('screen').width;
    const [gallery, setgallery] = useState([
        {
            image:
                'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
            title: 'Something Really Big',
            cost: '4,500',
            key: '1',
            desc: 'Tribes Karnataka',
        },
        {
            image:
                'https://www.spotlightstheatre.co.uk/wordpress/wp-content/uploads/2019/11/f_frozen2_header_mobile_18432_d258f93f.jpeg',
            title: 'Frozen II',
            cost: '4,500',
            key: '2',
            desc: 'Tribes Karnataka',
        },
        {
            image:
                'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSxo7Naxu0tjuSEZ9_faYL--aWjx8V5TKr4q2YeenYKXXik-T5P',
            title: 'Alita',
            cost: '4,500',
            key: '3',
            desc: 'Tribes Karnataka',
        },
    ]);

    const image = {
        uri: require('../assets/catIcons/heart.png'),
    };
    const imageChevron = {
        uri: require('../assets/catIcons/chevron-right.png'),
    };
    return (
        <View
            style={{
                paddingBottom: 8,
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
                <Text style={styles.text}>Best Selling In Clothings</Text>
                {/* <Text style={styles.view}>View All</Text>
                <Image
                    source={imageChevron.uri}
                    style={{
                        position: 'absolute',
                        right: 6,
                        width: 24,
                        marginRight: 8,
                        height: 20,
                        bottom: 15,
                    }}
                /> */}
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
                                marginLeft:
                                    Dimensions.get('screen').width * 0.02041,
                                paddingBottom: 32,
                                paddingHorizontal:
                                    Dimensions.get('screen').width * 0.02041,
                            }}>
                            <TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{
                                                width: width * 0.26785,
                                                height: 130,
                                                borderRadius: 5,
                                                resizeMode: 'cover',
                                            }}
                                        />
                                        <View style={styles.discountBox}>
                                            <Text style={styles.textDiscount}>
                                                50%
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailsBox}>
                                        <Text style={styles.textDetails}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.tribeDetails}>
                                            {item.desc}
                                        </Text>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text style={styles.rating}>
                                                <Feather
                                                    name='star'
                                                    size={22}
                                                    style={styles.icon}
                                                />
                                                <Text>4.5</Text>
                                                <Text>/5</Text>
                                            </Text>
                                            <Text style={styles.price}>
                                                <Text style={{ fontSize: 22 }}>
                                                    ₹
                                                </Text>
                                                <Text>{item.cost}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    {item.key === '3' ? (
                                        <View
                                            style={{
                                                paddingRight:
                                                    Dimensions.get('screen')
                                                        .width * 0.293,
                                            }}></View>
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />

            <FlatList
                horizontal
                horizontal={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                marginTop: 16,
                                marginLeft:
                                    Dimensions.get('screen').width * 0.02041,
                                paddingBottom: 32,
                                paddingHorizontal:
                                    Dimensions.get('screen').width * 0.02041,
                            }}>
                            <TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{
                                                width: width * 0.26785,
                                                height: 130,
                                                borderRadius: 5,
                                                resizeMode: 'cover',
                                            }}
                                        />
                                        <View style={styles.discountBox}>
                                            <Text style={styles.textDiscount}>
                                                50%
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailsBox}>
                                        <Text style={styles.textDetails}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.tribeDetails}>
                                            {item.desc}
                                        </Text>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text style={styles.rating}>
                                                <Feather
                                                    name='star'
                                                    size={22}
                                                    style={styles.icon}
                                                />
                                                <Text>4.5</Text>
                                                <Text>/5</Text>
                                            </Text>
                                            <Text style={styles.price}>
                                                <Text style={{ fontSize: 22 }}>
                                                    ₹
                                                </Text>
                                                <Text>{item.cost}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    {item.key === '3' ? (
                                        <View
                                            style={{
                                                paddingRight:
                                                    Dimensions.get('screen')
                                                        .width * 0.293,
                                            }}></View>
                                    ) : null}
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
        padding: Dimensions.get('screen').width * 0.02041,
        paddingHorizontal: Dimensions.get('screen').width * 0.04082,
    },
    text: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#20263e',
        paddingTop: 10,
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
    discountBox: {
        position: 'absolute',
        bottom: -10,
        left: 12.5,
        alignItems: 'center',
        backgroundColor: '#FC8019',
        width: 80,
        borderRadius: 5,
        padding: 2,
    },
    textDiscount: {
        fontFamily: 'popins-bold',
        fontSize: 14,
        color: 'white',
    },
    detailsBox: {
        padding: 8,
    },
    textDetails: {
        fontFamily: 'popins-bold',
        fontSize: 18,
        color: 'black',
        paddingVertical: 2,
    },
    tribeDetails: {
        fontFamily: 'popins-semibold',
        fontSize: 17,
        color: '#4d4b50',
        paddingVertical: 2,
    },
    rating: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: '#4d4b50',
        paddingVertical: 4,
    },
    price: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: '#4d4b50',
    },
});

export default BestSellingInCat;
