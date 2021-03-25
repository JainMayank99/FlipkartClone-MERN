import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const MiniTextBox = () => {
    const [gallery, setgallery] = useState([
        {
            id: '1',
            name: 'users',
            title: '12.5k Orders',
            subTitle: 'delivered safely in Bangalore in last few hours.',
            color: '#00ff7f',
        },
        {
            id: '2',
            name: 'trending-up',
            title: '12.5k Orders',
            subTitle: 'delivered safely in Bangalore in last few hours.',
            color: '#c83cb9',
        },
        {
            id: '3',
            name: 'thumbs-up',
            title: '12.5k Orders',
            subTitle: 'delivered safely in Bangalore in last few hours.',
            color: '#ffa368',
        },
    ]);

    return (
        <View
            style={{
                borderBottomWidth: 10,
                borderColor: '#edeeef',
            }}>
            {/* {console.log(Dimensions.get('screen').width)} */}
            <FlatList
                horizontal
                horizontal={true}
                data={gallery}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                paddingHorizontal:
                                    Dimensions.get('screen').width * 0.01021,
                            }}>
                            <>
                                <View style={styles.body}>
                                    <View
                                        style={{
                                            alignSelf: 'center',
                                            width:
                                                Dimensions.get('screen').width *
                                                0.102041,
                                            height:
                                                Dimensions.get('screen').width *
                                                0.102041,
                                            borderRadius:
                                                Dimensions.get('screen').width *
                                                0.05102,
                                            backgroundColor: item.color,
                                        }}>
                                        <Feather
                                            name={item.name}
                                            size={22}
                                            color='white'
                                            style={{
                                                alignSelf: 'center',
                                                padding:
                                                    Dimensions.get('screen')
                                                        .width * 0.017856,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            left:
                                                Dimensions.get('screen').width *
                                                0.175,
                                        }}>
                                        <Text style={styles.mainText}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.subText}>
                                            {item.subTitle}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Dimensions.get('screen').width * 0.02041,
        paddingHorizontal: Dimensions.get('screen').width * 0.04082,
        width: Dimensions.get('screen').width,
    },
    mainText: {
        fontFamily: 'popins-bold',
        fontSize: Dimensions.get('screen').width * 0.04082,
        color: '#000',
    },
    subText: {
        fontFamily: 'popins-med',
        fontSize: Dimensions.get('screen').width * 0.0335,
        color: '#000',
    },
});
export default MiniTextBox;
