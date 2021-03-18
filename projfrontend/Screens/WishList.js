import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';
import Header from '../components/Header';
import WishListItems from '../components/WishListComponents/WishListItems';

const WishList = () => {
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);

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

    return (
        <View>
            {loading === true ? (
                <View style={styles.overlay}>
                    <LottieView
                        style={styles.lottie}
                        autoPlay
                        loop
                        source={require('../assets/animations/loader.json')}
                    />

                    <Header
                        language={language}
                        changeLanguage={changeLanguage}
                    />
                    <View
                        style={{
                            marginTop: 105,
                        }}>
                        <WishListItems />
                    </View>
                </View>
            ) : (
                <View>
                    <Header
                        language={language}
                        changeLanguage={changeLanguage}
                    />
                    <View
                        style={{
                            marginTop: 105,
                        }}>
                        <WishListItems />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
});
export default WishList;
