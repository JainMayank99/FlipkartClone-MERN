import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import {Image as ExpoImage} from "react-native-expo-image-cache";

import { randomProduct } from '../APICall/HomeCall';


const TopPicks = ({ language }) => {
    // const [gallery, setgallery] = useState([
    //     {
    //         image: require('../assets/main/d4.webp'),
    //         title: 'Avengers: End Game',
    //         released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
    //         key: '1',
    //         desc:
    //             'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
    //     },
    //     {
    //         image: require('../assets/main/md1.jpg'),
    //         title: 'Frozen II',
    //         released: '2019 ‧ Animation/Musical ‧ 1h 43m',
    //         key: '2',
    //         desc:
    //             'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
    //     },
    //     {
    //         image: require('../assets/main/wj1.jpg'),
    //         title: 'Alita: Battle Angel',
    //         released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
    //         key: '3',
    //         desc:
    //             'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
    //     },
    //     {
    //         image: require('../assets/main/bag2.webp'),
    //         title: 'The Irish Man',
    //         released: '2019 ‧ Crime/Drama ‧ 3h 30m',
    //         key: '4',
    //         desc:
    //             'In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.',
    //     },
    //     {
    //         image: require('../assets/main/wall1.webp'),
    //         title: 'John Wick Chapter 3',
    //         released: '2019 ‧ Action/Thriller ‧ 2h 10m',
    //         key: '5',
    //         desc:
    //             'John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.',
    //     },
    // ]);

    const [gallery, setGallery]= useState();

    useEffect(() => {
        randomProduct(5)
        .then((res)=>{
            setGallery(res.data);
            // console.log(res.data);
        })
        .catch((err) => {
            console.log("Top Picks Home Screen error",err);
        }) 
    },[])

    
    const image = {
        uri: require('../../../assets/catIcons/thumbs-up.png'),
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
                <Text style={styles.text}>
                    {language === 'en'
                        ? 'Top Picks For You'
                        : language === 'hi'
                        ? 'आप के लिए शीर्ष की पसंद'
                        : language === 'ka'
                        ? 'ನಿಮಗಾಗಿ ಉನ್ನತ ಆಯ್ಕೆಗಳು'
                        : language === 'ta'
                        ? 'உங்களுக்கான சிறந்த தேர்வுகள்'
                        : 'మీ కోసం అగ్ర ఎంపికలు'}
                </Text>
            </View>

            <FlatList
                horizontal
                horizontal={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          marginLeft: 8,
                          paddingBottom: 16,
                          paddingHorizontal: 8,
                        }}
                      >
                        <TouchableOpacity>
                            <ExpoImage
                                style={{
                                    width: 87.5,
                                    height: 105,
                                    borderRadius: 5,
                                    resizeMode: 'cover',
                                }}
                                preview={{uri:item.image[0].url.slice(0, 48).concat('t_media_lib_thumb/').concat(item.image[0].url.slice(48))}}
                                uri={item.image[0].url} 
                            />


                
                          {/* <CloudinaryImage
                            cloudName={CLOUDNAME}
                            loading="lazy"
                            publicId={item.image[0].url}
                            // style={}
                          >
                            <Transformation
                              width="87.5"
                              height="105"
                              radius="max"
                              gravity="auto"
                              crop="fill"
                              quality="auto"
                              flags={["preserve_transparency"]}
                            />
                            <Placeholder type="pixelate" />
                          </CloudinaryImage> */}
                          {/* <Image
                                    source={item.image}
                                    style={{
                                        width: 87.5,
                                        height: 105,
                                        borderRadius: 5,
                                        resizeMode: 'cover',
                                    }}
                                /> */}
                          <View style={styles.discountBox}>
                            <Text style={styles.textDiscount}>
                              {item.discount}%
                              {language === "en"
                                ? "off"
                                : language === "hi"
                                ? "छूट"
                                : language === "ka"
                                ? "ರಿಯಾಯಿತಿ"
                                : language === "ta"
                                ? "தள்ளுபடி"
                                : "తగ్గింపు"}
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
export default TopPicks;
