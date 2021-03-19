import React, { useState } from 'react';
import StarRating from 'react-native-star-rating';
import Screen from '../Screen';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

function StartRatingComponent() {
    const [rating, setRating] = useState(2);
    const [text, setText] = useState('');
    const onRatingChange = (rating) => {
        setRating(rating);
        console.log(rating);
    };
    const onSubmit = () => {
        console.log(text, rating);
    };
    return (
        <Screen>
            <View style={styles.body}>
                <Text style={styles.heading}>Review Product</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder='Detailed reviews get more focus!'
                    multiline={true}
                    numberOfLines={8}
                    onChangeText={(text) => setText(text)}
                    value={text}
                    autoCorrect={false}
                    blurOnSubmit={true}
                    selectionColor={'#fc8019'}
                />

                <StarRating
                    disabled={false}
                    emptyStar={require('../../assets/catIcons/star-regular.png')}
                    fullStar={require('../../assets/catIcons/star-solid.png')}
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => onRatingChange(rating)}
                    fullStarColor={'#fc8019'}
                    starSize={30}
                    animation={'tada'}
                />

                <TouchableOpacity
                    onPress={() => onSubmit()}
                    style={{
                        marginVertical: 60,
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.submit}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.version}>App Version : 1.0</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: 24,
        paddingVertical: 8,
    },
    heading: {
        fontFamily: 'zilla-bold',
        fontSize: 24,
        paddingVertical: 8,
        paddingBottom: 24,
    },
    textInput: {
        height: 120,
        textAlignVertical: 'top',
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        marginVertical: 4,
    },
    button: {
        backgroundColor: '#fc8019',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    submit: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: 'white',
    },
    version: {
        fontFamily: 'zilla-med',
        fontSize: 20,
        color: '#d1d1d1',
        textAlign: 'center',
        paddingTop: 32,
        paddingBottom: 16,
        borderBottomWidth: 7.5,
        borderBottomColor: '#edeeef',
    },
});
export default StartRatingComponent;
