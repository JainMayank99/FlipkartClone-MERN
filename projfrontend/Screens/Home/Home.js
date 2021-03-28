import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import { dummyData } from '../../data/Data';
import { minData } from '../../data/MiniData';
import Header from '../../components/Header';
import AppCarousel from '../../components/AppCarousel';
import Categories from '../../components/Categories';
import TopPicks from './Component/TopPicks';
import FeaturedCategories from '../../components/FeaturedCategories';
import DealOfTheDay from './Component/DealOfTheDay';
import MiniTextBox from '../../components/MiniTextBox';
import PopularTribes from '../../components/PopularTribes';
import NewlyArrived from '../../components/NewlyArrived';
import InTheSpotlight from './Component/InTheSpotlight';
import TopRated from '../../components/TopRated';
import BestSellingInCat from '../../components/BestSellingInCat';
import Sell from '../../components/Sell';
import BestSellingInJew from '../../components/BestSellingInJew';

const Home = () => {
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);
    const carouselRef = useRef(null);
    const mainWork = (lang) => {
        setLanguage(lang);
        setLoading(false);
    };
    const changeLanguage = (lang) => {
        setLoading(true);
        setTimeout(() => {
            mainWork(lang);
        }, 500);
    };
    const [background, setBackground] = useState({
        uri:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
        name: 'Avengers: End Game',
        stat: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
        desc:
            'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
    });

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

    const [list, setList] = useState([
        {
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKLiEyyz1Q9RC8EBYl3ijr3nuGeyO2ETmwy6Kdq0AQtD0elWD',
            key: '1',
        },
        {
            image:
                'https://upload.wikimedia.org/wikipedia/en/7/7a/1917poster.jpg',
            key: '2',
        },
        {
            image:
                'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg',
            key: '3',
        },
        {
            image:
                'https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/large/spies-in-disguise-et00072276-10-03-2018-03-41-39.jpg',
            key: '4',
        },
        {
            image:
                'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_.jpg',
            key: '5',
        },
    ]);
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        carouselRef.current.scrollToIndex(index);
                        setBackground({
                            uri: item.image,
                            name: item.title,
                            stat: item.released,
                            desc: item.desc,
                        });
                    }}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.carouselImage}
                    />
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <Feather
                        name='terminal'
                        size={30}
                        color='white'
                        style={styles.carouselIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            {loading === true ? (
                <View style={styles.overlay}>
                    <LottieView
                        style={styles.lottie}
                        autoPlay
                        loop
                        source={require('../../assets/animations/loader.json')}
                    />

                    <Header
                        language={language}
                        changeLanguage={changeLanguage}
                    />
                    <ScrollView
                        style={{
                            marginTop: 105,
                        }}>
                        <Categories
                            language={language}
                            changeLanguage={changeLanguage}
                        />
                        <AppCarousel data={dummyData} />
                        <TopPicks language={language} />
                        <FeaturedCategories language={language} />

                        <DealOfTheDay language={language} />
                        <MiniTextBox data={minData} />
                        <BestSellingInCat />
                        <PopularTribes />

                        <NewlyArrived />
                        <InTheSpotlight />

                        <BestSellingInCat />
                        <TopRated />
                        <Sell />
                        <BestSellingInJew />
                    </ScrollView>
                </View>
            ) : (
                <View>
                    <Header
                        language={language}
                        changeLanguage={changeLanguage}
                    />
                    <ScrollView
                        style={{
                            marginTop: 105,
                        }}>
                        <Categories
                            language={language}
                            changeLanguage={changeLanguage}
                        />
                        <AppCarousel data={dummyData} />
                        <TopPicks language={language} />
                        <FeaturedCategories language={language} />

                        <DealOfTheDay language={language} />
                        <MiniTextBox data={minData} />
                        <BestSellingInCat />
                        <PopularTribes />

                        <NewlyArrived />
                        <InTheSpotlight />

                        <BestSellingInCat />
                        <TopRated />
                        <Sell />
                        <BestSellingInJew />
                    </ScrollView>
                </View>
            )}
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
    overlay: {
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    lottie: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },

    ImageOverlay: {
        width: 150,
        height: 250,
        marginRight: 8,
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.2,
    },
    imageLocationIcon: {
        position: 'absolute',
        marginTop: 4,
        left: 10,
        bottom: 10,
    },
    imageText: {
        position: 'absolute',
        color: 'white',
        marginTop: 4,
        fontSize: 14,
        left: 30,
        bottom: 10,
    },

    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    carouselText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 2,
        fontWeight: 'bold',
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    carouselContentContainer: {
        flex: 1,

        minHeight: 720,
        paddingHorizontal: 14,
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

export default Home;
