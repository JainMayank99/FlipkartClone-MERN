import React, { useRef, useState } from 'react';

import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const image = {
    uri: require('../assets/catIcons/camera.png'),
};

const InTheSpotlight = () => {
    const { width, height } = Dimensions.get('window');
    const carouselRef = useRef(null);
    const [gallery, setgallery] = useState([
        {
            image:
                'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
            title: 'Avengers: End Game',
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
        {
            image:
                'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSxo7Naxu0tjuSEZ9_faYL--aWjx8V5TKr4q2YeenYKXXik-T5P',
            title: 'Alita: Battle Angel',
            released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
            key: '3',
            desc:
                'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
        },
        {
            image:
                'https://www.gstatic.com/tv/thumb/v22vodart/15879807/p15879807_v_v8_aa.jpg',
            title: 'The Irish Man',
            released: '2019 ‧ Crime/Drama ‧ 3h 30m',
            key: '4',
            desc:
                'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
        },
        {
            image:
                'https://i.pinimg.com/originals/99/03/9a/99039a6afb682e42c9a12556071b38c9.jpg',
            title: 'John Wick Chapter 3',
            released: '2019 ‧ Action/Thriller ‧ 2h 10m',
            key: '5',
            desc:
                'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
        },
    ]);
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.carouselImage}
                    />
                    <View style={styles.discountBox}>
                        <Text style={styles.textDiscount}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
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
                        width: 26,
                        marginRight: 8,
                        height: 26,
                    }}
                />
                <Text style={styles.text}>In The Spotlight</Text>
            </View>
            <ScrollView>
                <View style={styles.carouselContentContainer}>
                    <View style={styles.carouselContainerView}>
                        <Carousel
                            style={styles.carousel}
                            data={gallery}
                            renderItem={renderItem}
                            itemWidth={200}
                            containerWidth={width - 20}
                            seperatorWidth={0}
                            ref={carouselRef}
                            inActiveOpacity={0.4}
                        />
                    </View>
                </View>
            </ScrollView>
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
        fontSize: 24,
        color: '#20263e',
        paddingTop: 10,
        marginLeft: 3,
    },
    discountBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: Dimensions.get('screen').width * 0.005102,
        shadowColor: '#f4f4f4',
        shadowOffset: { width: 0.5, height: 0.25 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 1.5,
        borderWidth: 0.05,
    },
    textDiscount: {
        fontFamily: 'popins-bold',
        fontSize: 16,
        color: 'black',
        padding: 8,
    },
    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },

    carouselContentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    carouselContainerView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
        overflow: 'visible',
    },
});
export default InTheSpotlight;
