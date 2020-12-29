import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

const PopularTribes = () => {
    const [gallery, setgallery] = useState([
        {
            image: require('../assets/states/bangalore.png'),
            title: 'Avengers: End Game',
            released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
            key: '1',
            desc:
                'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
            location: 'Bangalore',
        },
        {
            image: require('../assets/states/rajasthan.png'),
            title: 'Frozen II',
            released: '2019 ‧ Animation/Musical ‧ 1h 43m',
            key: '2',
            desc:
                'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
            location: 'Rajasthan',
        },
        {
            image: require('../assets/states/gujarat.png'),
            title: 'Alita: Battle Angel',
            released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
            key: '3',
            desc:
                'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
            location: 'Gujarat',
        },
        {
            image: require('../assets/states/westbengal.png'),
            title: 'The Irish Man',
            released: '2019 ‧ Crime/Drama ‧ 3h 30m',
            key: '4',
            desc:
                'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
            location: 'WestBengal',
        },
        {
            image: require('../assets/states/westbengal.png'),
            title: 'The Irish Man',
            released: '2019 ‧ Crime/Drama ‧ 3h 30m',
            key: '65',
            desc:
                'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
            location: 'WestBengal',
        },
    ]);

    const image = {
        uri: require('../assets/catIcons/thumbs-up.png'),
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
                <Text style={styles.text}>Popular Tribes</Text>
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
                                paddingBottom: 42,
                                paddingHorizontal: 8,
                            }}>
                            <TouchableOpacity
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 40,
                                    borderWidth: 0.25,
                                    borderColor: '#f7f7f7',
                                }}>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 40,
                                        resizeMode: 'cover',
                                    }}
                                />
                                <View style={styles.discountBox}>
                                    <Text style={styles.textDiscount}>
                                        Tribes
                                    </Text>
                                    <Text style={styles.textDiscount}>
                                        {item.location}
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
        padding: 12,
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
        alignItems: 'center',
        width: 90,
        borderRadius: 5,
        padding: 2,
    },
    textDiscount: {
        fontFamily: 'popins-bold',
        fontSize: 14,
        color: 'black',
    },
});
export default PopularTribes;
