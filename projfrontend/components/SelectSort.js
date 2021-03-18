import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const SelectSort = () => {
    const width = Dimensions.get('screen').width;
    const [gallery, setgallery] = useState([
        {
            image: require('../assets/catIcons/english.png'),
            title: 'Relevance',
            released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
            key: '9',
            desc:
                'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
            language: 'en',
        },
        {
            image: require('../assets/catIcons/hindi.png'),
            title: 'Rating',
            released: '2019 ‧ Animation/Musical ‧ 1h 43m',
            key: '2',
            desc:
                'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
            language: 'hi',
        },
        {
            image: require('../assets/catIcons/kanada.png'),
            title: 'Price : Low to High',
            released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
            key: '3',
            desc:
                'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
            language: 'ka',
        },
        {
            image: require('../assets/catIcons/tamil.png'),
            title: 'Price : High to Low',
            released: '2019 ‧ Crime/Drama ‧ 3h 30m',
            key: '4',
            desc:
                'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
            language: 'ta',
        },
        {
            image: require('../assets/catIcons/telugu.png'),
            title: 'Newest First',
            released: '2019 ‧ Action/Thriller ‧ 2h 10m',
            key: '5',
            desc:
                'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
            language: 'te',
        },
    ]);
    return (
        <View
            style={{
                paddingVertical: 8,
            }}>
            <FlatList
                vertical={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                height: 25,
                                borderRadius: 50,
                                justifyContent: 'center',
                                marginVertical: 5,
                                marginHorizontal: 6.5,
                                paddingLeft: 12,
                            }}>
                            <View style={styles.container}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Feather
                                    styles={styles.circle}
                                    name='circle'
                                    size={22}
                                    color='#FC8019'
                                />
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title: {
        marginTop: 5,
        fontFamily: 'popins-reg',
        fontSize: 18,
        color: '#20263e',
        paddingHorizontal: 8,
        letterSpacing: 0.5,
        textAlign: 'left',
        width: Dimensions.get('screen').width * 0.8,
    },
});
export default SelectSort;
