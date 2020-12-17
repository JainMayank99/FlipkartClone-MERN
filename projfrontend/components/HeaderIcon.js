import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HeaderIcon = ({ name }) => {
    return (
        <Feather name={name} size={22} color='#FC8019' style={styles.icon} />
    );
};

const styles = StyleSheet.create({});
export default HeaderIcon;
