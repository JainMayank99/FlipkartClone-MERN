import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
const Categories = () => {
    const [gallery, setgallery] = useState([
        {
            image: require('../assets/catIcons/dress.png'),
            title: 'Clothing',
            released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
            key: '9',
            desc:
                'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        },
        {
            image: require('../assets/catIcons/book.png'),
            title: 'Stationery',
            released: '2019 ‧ Animation/Musical ‧ 1h 43m',
            key: '2',
            desc:
                'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
        },
        {
            image: require('../assets/catIcons/jewellery.png'),
            title: 'Jewellery',
            released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
            key: '3',
            desc:
                'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
        },
        {
            image: require('../assets/catIcons/bag.png'),
            title: 'Bags',
            released: '2019 ‧ Crime/Drama ‧ 3h 30m',
            key: '4',
            desc:
                'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
        },
        {
            image: require('../assets/catIcons/home.png'),
            title: 'Home',
            released: '2019 ‧ Action/Thriller ‧ 2h 10m',
            key: '5',
            desc:
                'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
        },
        {
            image: require('../assets/catIcons/doctor.png'),
            title: 'Covid',
            released: '2019 ‧ Action/Thriller ‧ 2h 10m',
            key: '6',
            desc:
                'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
        },
        {
            image: require('../assets/catIcons/food.png'),
            title: 'Essentials',
            released: '2019 ‧ Action/Thriller ‧ 2h 10m',
            key: '7',
            desc:
                'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
        },
    ]);
    return (
        <View>
            <FlatList
                horizontal={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                height: 65,
                                width: 65,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 5,
                                marginHorizontal: 6.5,
                                paddingLeft: 12,
                            }}>
                            <TouchableOpacity
                                style={{
                                    height: 65,
                                    width: 65,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 3,
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FC8019',
                                    }}>
                                    <Image
                                        source={item.image}
                                        style={{
                                            height: 24,
                                            width: 24,
                                        }}
                                    />
                                </View>
                                <Text style={styles.text}>{item.title}</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 5,
        fontFamily: 'popins-reg',
        fontSize: 12,
        color: '#20263e',
    },
});
export default Categories;
