import React, { useState } from 'react';
import {
    SafeAreaView,
    TextInput,
    Button,
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Screen from '../Screen';
import Dash from 'react-native-dash';

const validationSchema = yup.object().shape({
    email: yup.string().label('Email').email().required(),
    userName: yup
        .string()
        .label('UserName')
        .min(3, 'Enter atleast 3 character')
        .max(20, 'Atmost 30 character'),
});

const EditProfile = () => {
    const [focusName, setFocusName] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);

    const onFocusNameChange = () => {
        setFocusName(true);
    };
    const onBlurNameChange = () => {
        setFocusName(false);
    };
    const onFocusEmailChange = () => {
        setFocusEmail(true);
    };
    const onBlurEmailChange = () => {
        setFocusEmail(false);
    };

    return (
        <Screen>
            <View style={styles.screen}>
                <Text style={styles.heading}>Edit Profile</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, actions) => {
                        alert(JSON.stringify(values));
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    validationSchema={validationSchema}>
                    {(formikProps) => (
                        <React.Fragment>
                            <View
                                style={{
                                    marginHorizontal: 8,
                                    marginTop: 24,
                                    marginBottom: 16,
                                }}>
                                <Text style={styles.label}>USERNAME</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    onFocus={onFocusNameChange}
                                    placeholder='Username'
                                    autoCorrect={false}
                                    style={
                                        focusName === false
                                            ? styles.textInput
                                            : styles.textInputName
                                    }
                                    onChangeText={formikProps.handleChange(
                                        'userName'
                                    )}
                                    onBlur={onBlurNameChange}
                                />
                                <View
                                    style={
                                        formikProps.errors.userName
                                            ? styles.redCircle
                                            : styles.greenCircle
                                    }></View>
                                <Text
                                    style={
                                        formikProps.touched.userName &&
                                        formikProps.errors.userName
                                            ? styles.errMsg
                                            : null
                                    }>
                                    {formikProps.touched.userName &&
                                        formikProps.errors.userName}
                                </Text>
                            </View>

                            <View
                                style={{
                                    marginHorizontal: 8,
                                    marginVertical: 4,
                                }}>
                                <Text style={styles.label}>EMAIL</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='johndoe@example.com'
                                    onFocus={onFocusEmailChange}
                                    autoCorrect={false}
                                    style={
                                        focusEmail === false
                                            ? styles.textInput
                                            : styles.textInputEmail
                                    }
                                    onChangeText={formikProps.handleChange(
                                        'email'
                                    )}
                                    onBlur={onBlurEmailChange}
                                />
                                <View
                                    style={
                                        formikProps.errors.email
                                            ? styles.redCircle
                                            : styles.greenCircle
                                    }></View>
                                <Text
                                    style={
                                        formikProps.touched.email &&
                                        formikProps.errors.email
                                            ? styles.errMsg
                                            : null
                                    }>
                                    {formikProps.touched.email &&
                                        formikProps.errors.email}
                                </Text>
                            </View>

                            {formikProps.isSubmitting ? (
                                <ActivityIndicator />
                            ) : (
                                <TouchableOpacity
                                    onPress={formikProps.handleSubmit}
                                    style={{
                                        marginHorizontal: 8,
                                        marginVertical: 40,
                                    }}>
                                    <View
                                        style={
                                            formikProps.errors.email ||
                                            formikProps.errors.userName
                                                ? styles.buttonlight
                                                : styles.button
                                        }>
                                        <Text style={styles.submit}>
                                            Update
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </React.Fragment>
                    )}
                </Formik>
            </View>
            <Text style={styles.version}>App Version : 1.0</Text>
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 16,
    },
    heading: {
        fontFamily: 'zilla-bold',
        fontSize: 24,
        paddingVertical: 8,
    },
    label: {
        fontFamily: 'zilla-reg',
        fontSize: 16,
        // color: '#bdbdbd',
        paddingTop: 4,
        letterSpacing: 0.75,
    },
    textInput: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#bdbdbd',
        borderRadius: 2.5,
        position: 'relative',
    },
    textInputEmail: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#FF6B3C',
        borderRadius: 2.5,
    },
    textInputName: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#FF6B3C',
        borderRadius: 2.5,
    },
    buttonlight: {
        backgroundColor: '#f4c2c2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    button: {
        backgroundColor: '#FF6B3C',
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
    errMsg: {
        fontFamily: 'zilla-reg',
        fontSize: 16,
        color: 'red',
        paddingVertical: 4,
        height: 24,
    },
    greenCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#90EE90',
        position: 'absolute',
        right: '0%',
        top: '12.5%',
    },
    redCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#f94d00',
        position: 'absolute',
        right: '0%',
        top: '12.5%',
    },
    version: {
        fontFamily: 'zilla-med',
        fontSize: 20,
        color: '#d1d1d1',
        textAlign: 'center',
        paddingTop: 32,
        paddingBottom: 24,
        borderBottomWidth: 7.5,
        borderBottomColor: '#edeeef',
    },
});

export default EditProfile;
