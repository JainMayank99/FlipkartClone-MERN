import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const OrderItemDetails = (item) => {
    const image = {
        uri: require('../../assets/catIcons/trash.png'),
    };
    const width = Dimensions.get('screen').width;
    return (
        <View
            style={{
                paddingVertical: 16,
                paddingHorizontal: Dimensions.get('screen').width * 0.02041,
                borderBottomWidth: 0.6,
                borderColor: '#edeeef',
                borderRadius: 2,
            }}>
            <TouchableWithoutFeedback>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View
                        style={{
                            marginLeft:
                                Dimensions.get('screen').width * 0.02041,
                        }}>
                        <TouchableOpacity>
                            <Image
                                source={item.item.image}
                                style={{
                                    width: width * 0.26785,
                                    height: 130,
                                    borderRadius: 5,
                                    resizeMode: 'cover',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsBox}>
                        <Text style={styles.delivered}>
                            Delivered On 12/03/2021
                        </Text>
                        <Text style={styles.title}>{item.item.title}</Text>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 200,
                            }}>
                            <Text style={styles.review}>
                                Rate & Review {'>'}{' '}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        fontFamily: 'popins-bold',
        fontSize: 18,
        color: '#20263e',
        paddingTop: 10,
        position: 'absolute',
        right: Dimensions.get('screen').width * 0.10714,
    },

    detailsBox: {
        padding: 4,
        marginLeft: 24,
        width: 200,
    },
    delivered: {
        fontFamily: 'zilla-med',
        fontSize: 20,
        color: 'black',
        paddingBottom: 4,
    },
    title: {
        fontFamily: 'zilla-med',
        fontSize: 17,
        color: '#4d4b50',
        paddingVertical: 4,
    },
    review: {
        fontFamily: 'zilla-med',
        fontSize: 18,
        color: '#fc8019',
        paddingTop: 32,
    },
});

export default OrderItemDetails;
