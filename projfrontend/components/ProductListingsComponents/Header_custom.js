import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    StatusBar,
    Button,
    TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import HeaderIcon from '../HeaderIcon';
import Screen from '../Screen';
import SelectLanguage from '../SelectLanguage';
import Search from './Search';

const Header_custom = ({ language, changeLanguage,query,handleSearch }) => {
    const refRBSheet = useRef();
    const image = {
        uri:
            'https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    };
    return (
        <Screen>
            <StatusBar hidden />
            <View style={styles.language}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <HeaderIcon name='settings' />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <HeaderIcon name='menu' />
                <Text style={styles.text}>Rajender</Text>
                <HeaderIcon name='shopping-cart' />
            </View>
            <Search 
            query={query}
            handleSearch={handleSearch}/>
            <RBSheet
                height={150}
                animation={'fade'}
                ref={refRBSheet}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',

                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                }}>
                <View style={styles.bottomTab}>
                    <Text style={styles.title}>
                        {language === 'en'
                            ? 'Select Your Language'
                            : language === 'hi'
                            ? 'अपनी भाषा का चयन करें'
                            : language === 'ka'
                            ? 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'
                            : language === 'ta'
                            ? 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்'
                            : 'మీ భాషను ఎంచుకోండి'}
                    </Text>
                </View>

                <SelectLanguage
                    language={language}
                    changeLanguage={changeLanguage}
                    onPress={() => refRBSheet.current.open()}
                />
            </RBSheet>
        </Screen>
    );
};
const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 16,
    },
    text: {
        fontFamily: 'zilla-med',
        fontSize: 24,
        color: '#20263e',
    },
    button: {
        backgroundColor: 'white',
    },
    language: {
        position: 'absolute',
        top: 0,
        right: 60,
    },
    title: {
        fontFamily: 'zilla-med',
        fontSize: 20,
        color: '#20263e',
    },
    bottomTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Header_custom;
