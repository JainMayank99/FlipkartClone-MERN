import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function Icon({
    name,
    size = 44,
    backgroundColor = 'rgba(255, 255, 255,1)',
    iconColor = '#FC8019',
    align,
}) {
    return (
        <>
            {align === 'left' ? (
                <View
                    style={{
                        width: size,
                        height: size,
                        borderBottomEndRadius: size / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor,
                    }}>
                    <Feather name={name} color={iconColor} size={size * 0.5} />
                </View>
            ) : align === 'right' ? (
                <View
                    style={{
                        width: size,
                        height: size,
                        borderBottomStartRadius: size / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor,
                    }}>
                    <Feather name={name} color={iconColor} size={size * 0.5} />
                </View>
            ) : align === 'rightbottom' ? (
                <View
                    style={{
                        width: size,
                        height: size,
                        borderTopStartRadius: size / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor,
                    }}>
                    <Feather name={name} color={iconColor} size={size * 0.5} />
                </View>
            ) : null}
        </>
    );
}

export default Icon;
