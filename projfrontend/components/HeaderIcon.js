import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HeaderIcon = ({ name, color }) => {
    return <Feather name={name} size={22} color='#FF6B3C' />;
};

const styles = StyleSheet.create({});
export default HeaderIcon;
