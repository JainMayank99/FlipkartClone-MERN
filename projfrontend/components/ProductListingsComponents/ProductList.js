import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';

import HeaderIcon from '../HeaderIcon';
import SelectLanguage from '../SelectLanguage';
import SelectSort from '../SelectSort';
import ProductDetails from './ProductDetails';

const ProductList = () => {
    const refRBSheet = useRef();
    const width = Dimensions.get('screen').width;
    const [gallery, setgallery] = useState([
        {
            image: require('../../assets/main/bsc2.jpg'),
            title: 'Solid State Kurta',
            cost: '4,500',
            key: '1',
            desc: 'Tribes Karnataka',
            discount: '30% off',
        },
        {
            image: require('../../assets/main/cat2.png'),
            title: 'Something',
            cost: '2,500',
            key: '2',
            desc: 'Tribes Karnataka',
            discount: '50% off',
        },

        {
            image: require('../../assets/main/bsc3.jpg'),
            title: 'Printed Kurta With Skirt ',
            cost: '2,750',
            key: '5',
            desc: 'Tribes Karnataka',
            discount: '10% off',
        },
    ]);

    return (
        <View
            style={{
                paddingBottom: 200,
                borderBottomWidth: 10,
                borderColor: '#edeeef',
            }}>
            <View style={styles.body}>
                <Text style={styles.text}>Clothings</Text>

                <TouchableOpacity
                    onPress={() => refRBSheet.current.open()}
                    style={styles.slider}>
                    <Feather name='sliders' size={22} color='#FC8019' />
                </TouchableOpacity>
            </View>
            <RBSheet
                height={250}
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
                    <Text style={styles.heading}>Sort By :</Text>
                </View>
                <SelectSort onPress={() => refRBSheet.current.open()} />
            </RBSheet>
            <FlatList
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <ProductDetails item={item} />;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Dimensions.get('screen').width * 0.02041,
        paddingHorizontal: Dimensions.get('screen').width * 0.04082,
        marginBottom: 16,
    },
    text: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        color: '#20263e',
        paddingVertical: 10,
        marginLeft: 3,
    },
    view: {
        fontFamily: 'popins-bold',
        fontSize: 18,
        color: '#20263e',
        paddingTop: 10,
        position: 'absolute',
        right: Dimensions.get('screen').width * 0.10714,
    },

    slider: {
        position: 'absolute',
        top: -5,
        right: -10,
        alignItems: 'center',
        width: 80,
        borderRadius: 5,
        padding: 2,
    },
    heading: {
        fontFamily: 'popins-med',
        fontSize: 20,
        color: '#20263e',
        paddingHorizontal: 8,
        letterSpacing: 0.5,
        textAlign: 'left',
    },
});

export default ProductList;
