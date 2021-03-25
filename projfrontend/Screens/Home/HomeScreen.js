import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import HeaderIcon from '../../components/HeaderIcon';
import SearchBar from '../../components/SearchBar';

const HomeScreen = () => {
    return (
        <Screen>
            <View
                style={{
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        height: 60,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={styles.fontContainer}>
                        <HeaderIcon
                            name='ios-menu'
                            backgroundColor='white'></HeaderIcon>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <View style={styles.fontContainer}>
                        <HeaderIcon
                            name='ios-notifications-outline'
                            backgroundColor='white'></HeaderIcon>
                    </View>

                    <View style={styles.fontContainer}>
                        <HeaderIcon
                            name='ios-cart'
                            backgroundColor='white'></HeaderIcon>
                    </View>
                </View>
            </View>
            <SearchBar />

            <Carousel data={dummyData} />
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    fontContainer: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default HomeScreen;
