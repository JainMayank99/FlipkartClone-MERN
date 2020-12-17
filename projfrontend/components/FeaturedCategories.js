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

const FeaturedCategories = () => {
    const width = Dimensions.get('screen').width;
    const [gallery, setgallery] = useState([
        {
            image:
                'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
            title: 'Avengers',
            released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
            key: '1',
            desc:
                'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        },
        {
            image:
                'https://www.spotlightstheatre.co.uk/wordpress/wp-content/uploads/2019/11/f_frozen2_header_mobile_18432_d258f93f.jpeg',
            title: 'Frozen II',
            released: '2019 ‧ Animation/Musical ‧ 1h 43m',
            key: '2',
            desc:
                'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
        },
    ]);
    const image = {
        uri: require('../assets/catIcons/trending.png'),
    };
    return (
        <View
            style={{
                paddingBottom: 16,
                borderBottomWidth: 10,
                borderColor: '#edeeef',
            }}>
            <View style={styles.sub}>
                <Image
                    source={image.uri}
                    style={{
                        width: 24,
                        marginRight: 8,
                        height: 24,
                    }}
                />
                <Text style={styles.text}>Featured Categories</Text>
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
                                    source={{ uri: item.image }}
                                    style={{
                                        width: width * 0.43366,
                                        height: 220,
                                        borderRadius: 5,
                                        resizeMode: 'cover',
                                    }}
                                />
                                <View style={styles.discountBox}>
                                    <Text style={styles.textDiscount}>
                                        {item.title}
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
    sub: {
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
    discountBox: {
        position: 'absolute',
        bottom: -10,
        left: 15,
        alignItems: 'center',
        backgroundColor: '#FC8019',
        width: 140,
        borderRadius: 5,
        padding: 2,
    },
    textDiscount: {
        fontFamily: 'popins-bold',
        fontSize: 14,
        color: 'white',
    },
});

export default FeaturedCategories;
