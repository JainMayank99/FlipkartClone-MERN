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
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: { x: 'Deals Of The Day' },
    hi: { x: 'दिन के सौदे' },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const DealOfTheDay = () => {
    const width = Dimensions.get('screen').width;
    const [gallery, setgallery] = useState([
        {
            image: require('../assets/main/deal1.webp'),
            title: 'Nehru Jackets',
            released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
            key: '1',
            desc:
                'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        },
        {
            image: require('../assets/main/deal2.webp'),
            title: 'Mitera',
            released: '2019 ‧ Animation/Musical ‧ 1h 43m',
            key: '2',
            desc:
                'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
        },
        {
            image: require('../assets/main/deal3.jpg'),
            title: 'Priyaasi',
            released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
            key: '3',
            desc:
                'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
        },
    ]);

    const [gallery2, setgallery2] = useState([
        {
            image: require('../assets/main/deal4.webp'),
            title: 'Craft Vatika',
            released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
            key: '1',
            desc:
                'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        },
        {
            image: require('../assets/main/deal5.webp'),
            title: 'Fog Lighting',
            released: '2019 ‧ Animation/Musical ‧ 1h 43m',
            key: '2',
            desc:
                'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
        },
        {
            image: require('../assets/main/deal6.webp'),
            title: 'Cortina',
            released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
            key: '3',
            desc:
                'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
        },
    ]);

    const image = {
        uri: require('../assets/catIcons/deals.png'),
    };
    const imageChevron = {
        uri: require('../assets/catIcons/chevron-right.png'),
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
                <Text style={styles.text}>{i18n.t('x')}</Text>
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
                                <Image
                                    source={item.image}
                                    style={{
                                        width: width * 0.26785,
                                        height: 130,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
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

            <FlatList
                horizontal
                horizontal={true}
                data={gallery2}
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
                                <Image
                                    source={item.image}
                                    style={{
                                        width: width * 0.26785,
                                        height: 130,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
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
        bottom: -25,
        left: 0,
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('screen').width * 0.26785,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: Dimensions.get('screen').width * 0.005102,
        shadowColor: '#f4f4f4',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
    },
    textDiscount: {
        fontFamily: 'popins-bold',
        fontSize: 14,
        color: 'black',
    },
});

export default DealOfTheDay;
