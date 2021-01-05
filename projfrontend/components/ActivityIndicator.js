import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function ActivityIndicator({ visible }) {
    return visible === true ? (
        <View style={styles.overlay}>
            <LottieView
                autoPlay
                loop
                source={require('../assets/animations/loader.json')}
            />
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        backgroundColor: 'transparent',
        height: '100%',
        opacity: 0.8,
        width: '100%',
        zIndex: 1,
    },
});

export default ActivityIndicator;
