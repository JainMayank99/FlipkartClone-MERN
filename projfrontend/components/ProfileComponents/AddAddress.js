import React, { useState, useEffect, useRef } from 'react';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    Image,
    StatusBar,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import Screen from '../Screen';

const AddAddress = () => {
    const _mapView = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState({
        latitude: 22.3511148,
        longitude: 78.6677428,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [marginBottom, setMarginBottom] = useState(1);

    useEffect(() => {
        handleUserLocation();
    }, []);

    const onChangeValue = () => {
        setRegion(region);
        setTimeout(() => setMarginBottom(0));
    };

    // const getAddress = async(lat, lng) => {
    //     Geocoder.fallbackToGoogle(MY_KEY);
    //     let ret = await Geocoder.geocodePosition({lat, lng})
    //     let addr = (res[0].formattedAddress)
    // };
    const handleUserLocation = () => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            navigator.geolocation.getCurrentPosition((pos) => {
                _mapView.current.animateToRegion({
                    ...region,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
                setRegion({
                    ...region,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
            });
        })();
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <>
            <StatusBar hidden />
            <View
                style={{
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: 15,
                }}>
                <View style={{ flex: 1 }}>
                    <MapView
                        ref={_mapView}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        style={{
                            flex: 1,
                            marginBottom: marginBottom,
                            zIndex: -1,
                        }}
                        initialRegion={region}
                        onRegionChangeComplete={onChangeValue}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginLeft: -24,
                            marginTop: -48,
                            zIndex: 10,
                        }}>
                        <Image
                            style={{ height: 48, width: 48 }}
                            source={require('../../assets/catIcons/pin.png')}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
export default AddAddress;
