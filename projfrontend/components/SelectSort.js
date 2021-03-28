import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const SelectSort = ({onClickSortBy,sortBy}) => {
    const width = Dimensions.get('screen').width;
    const [gallery, setgallery] = useState([
        {
            key: '1',
            title: 'Rating',
           
        },
        {
            key: '2',
            title: 'Price : Low to High',
            
        },
        {
            key: '3',
            title: 'Price : High to Low',
          
        },
        {
            key: '4',
            title: 'Newest First',
          
        },
    ]);
    return (
        <View
            style={{
                paddingVertical: 8,
            }}>
            <FlatList
                vertical={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                height: 25,
                                borderRadius: 50,
                                justifyContent: 'center',
                                marginVertical: 5,
                                marginHorizontal: 6.5,
                                paddingLeft: 12,
                                
                            }}>
                            <View style={styles.container}>
                                <Text style={styles.title}>{item.title}</Text>
                                <TouchableWithoutFeedback onPress={() =>onClickSortBy(item.key)}>
                                {sortBy!==item.key?<Feather
                                    styles={styles.circle}
                                    name='circle'
                                    size={22}
                                    color='#FC8019'
                                />:<Feather
                                styles={styles.circle}
                                name='disc'
                                size={22}
                                color='#FC8019'
                            />}
                                </TouchableWithoutFeedback>
                               
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title: {
        marginTop: 5,
        fontFamily: 'zilla-med',
        fontSize: 20,
        color: '#20263e',
        paddingHorizontal: 8,
        letterSpacing: 0.5,
        textAlign: 'left',
        width: Dimensions.get('screen').width * 0.8,
    },
});
export default SelectSort;
