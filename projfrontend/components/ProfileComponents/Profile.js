import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Screen from '../Screen';
import Dash from 'react-native-dash';

const Profile = () => {
    const image = {
        uri: require('../../assets/catIcons/user.jpg'),
    };
    const orders = {
        uri: require('../../assets/catIcons/orders.png'),
    };
    const address = {
        uri: require('../../assets/catIcons/navigation.png'),
    };
    const settings = {
        uri: require('../../assets/catIcons/setting.png'),
    };
    const logOut = {
        uri: require('../../assets/catIcons/power.png'),
    };
    return (
        <Screen style={styles.screen}>
            <View style={{ padding: 16 }}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.name}>Rajender </Text>
                        <Text style={styles.mail}>prince00430@gmail.com</Text>
                        <Text style={styles.edit}>Edit Profile {'>'} </Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={image.uri}
                        style={{
                            marginVertical: 4,
                            width: 100,
                            marginRight: 8,
                            height: 100,
                            borderRadius: 50,
                            resizeMode: 'cover',
                        }}
                    />
                </View>
                <Dash
                    dashGap={-1}
                    dashLength={7.5}
                    dashThickness={1.5}
                    dashColor='#edeeef'
                    dashStyle={{ borderRadius: 100, overflow: 'hidden' }}
                    style={{
                        width: '100%',
                        height: 8,
                        borderRadius: 100,
                    }}
                />
                <Text style={styles.tag}>User Details</Text>
                <View style={styles.view}>
                    <View style={styles.image}>
                        <Image
                            source={orders.uri}
                            style={{
                                width: 25,
                                marginRight: 8,
                                height: 25,
                            }}
                        />
                    </View>
                    <Text style={styles.subHeader}>Your Orders</Text>
                </View>

                <View style={styles.view}>
                    <View style={styles.image}>
                        <Image
                            source={address.uri}
                            style={{
                                width: 25,
                                marginRight: 8,
                                height: 25,
                            }}
                        />
                    </View>
                    <Text style={styles.subHeader}>Address Book</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={styles.tag}>Change Password</Text>
                    <View style={styles.image}>
                        <Image
                            source={settings.uri}
                            style={{
                                width: 25,
                                marginRight: 8,
                                height: 25,
                            }}
                        />
                    </View>
                </View>
                <View style={styles.view1}>
                    <Text style={styles.tag}>Log Out</Text>
                    <View style={styles.image}>
                        <Image
                            source={logOut.uri}
                            style={{
                                width: 25,
                                marginRight: 8,
                                height: 25,
                            }}
                        />
                    </View>
                </View>
            </View>
            <Text style={styles.version}>App Version : 1.0</Text>
        </Screen>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'popins-bold',
        fontSize: 22,
        color: 'black',
        paddingVertical: 8,
    },
    mail: {
        fontFamily: 'popins-med',
        fontSize: 18,
        color: 'black',
        paddingTop: 5,
    },
    edit: {
        fontFamily: 'popins-med',
        fontSize: 18,
        color: 'orange',
    },
    image: {
        height: 30,
    },
    subHeader: {
        fontFamily: 'popins-med',
        fontSize: 17,
        color: '#bdbdbd',
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    tag: {
        fontFamily: 'popins-med',
        fontSize: 18,
        color: 'black',
        paddingVertical: 6,
    },
    version: {
        fontFamily: 'popins-med',
        fontSize: 18,
        color: '#d1d1d1',
        textAlign: 'center',
        paddingVertical: 32,
        borderBottomWidth: 7.5,
        borderBottomColor: '#edeeef',
    },
});

export default Profile;
