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
    ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Screen from '../Screen';
import Dash from 'react-native-dash';

const validationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .label('OldPassword')
        .required('Please enter your current password'),
    newPassword: yup
        .string()
        .required('Please enter your password')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Must contain at least 8 characters, 1 uppercase, 1 digit & 1 special case character'
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .when('newPassword', {
            is: (newPassword) =>
                newPassword && newPassword.length > 0 ? true : false,
            then: yup
                .string()
                .oneOf([yup.ref('newPassword')], "Password doesn't match"),
        }),
});

const ChangePassword = () => {
    const [focusOldPassword, setFocusOldPassword] = useState(false);
    const [focusNewPassword, setFocusNewPassword] = useState(false);
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

    const onFocusOldPasswordChange = () => {
        setFocusOldPassword(true);
    };
    const onBlurOldPasswordChange = () => {
        setFocusOldPassword(false);
    };

    const onFocusNewPasswordChange = () => {
        setFocusNewPassword(true);
    };
    const onBlurNewPasswordChange = () => {
        setFocusNewPassword(false);
    };

    const onFocusConfirmPasswordChange = () => {
        setFocusConfirmPassword(true);
    };
    const onBlurConfirmPasswordChange = () => {
        setFocusConfirmPassword(false);
    };

    return (
        <Screen>
            <View style={styles.screen}>
                <Text style={styles.heading}>Edit Profile</Text>
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
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
                                    marginBottom: 8,
                                }}>
                                <Text style={styles.label}>OLD PASSWORD</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    onFocus={onFocusOldPasswordChange}
                                    placeholder='Enter old password'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    style={
                                        focusOldPassword === false
                                            ? styles.textInput
                                            : styles.textOldPassword
                                    }
                                    onChangeText={formikProps.handleChange(
                                        'oldPassword'
                                    )}
                                    onBlur={onBlurOldPasswordChange}
                                />
                                <Text
                                    style={
                                        formikProps.touched.oldPassword &&
                                        formikProps.errors.oldPassword
                                            ? styles.errMsg
                                            : null
                                    }>
                                    {formikProps.touched.oldPassword &&
                                        formikProps.errors.oldPassword}
                                </Text>
                            </View>

                            <View
                                style={{
                                    marginHorizontal: 8,
                                    marginVertical: 4,
                                }}>
                                <Text style={styles.label}>NEW PASSWORD</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Enter new password'
                                    onFocus={onFocusNewPasswordChange}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    style={
                                        focusNewPassword === false
                                            ? styles.textInput
                                            : styles.textNewPassword
                                    }
                                    onChangeText={formikProps.handleChange(
                                        'newPassword'
                                    )}
                                    onBlur={onBlurNewPasswordChange}
                                />
                                <View
                                    style={
                                        formikProps.errors.newPassword
                                            ? styles.redCircle
                                            : styles.greenCircle
                                    }></View>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}>
                                    <Text
                                        style={
                                            formikProps.touched.newPassword &&
                                            formikProps.errors.newPassword
                                                ? styles.errMsg
                                                : null
                                        }>
                                        {formikProps.touched.newPassword &&
                                            formikProps.errors.newPassword}
                                    </Text>
                                </ScrollView>
                            </View>

                            <View
                                style={{
                                    marginHorizontal: 8,
                                    marginVertical: 4,
                                }}>
                                <Text style={styles.label}>
                                    CONFIRM PASSWORD
                                </Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='Confirm new password'
                                    onFocus={onFocusConfirmPasswordChange}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    style={
                                        focusConfirmPassword === false
                                            ? styles.textInput
                                            : styles.textConfirmPassword
                                    }
                                    onChangeText={formikProps.handleChange(
                                        'confirmPassword'
                                    )}
                                    onBlur={onBlurConfirmPasswordChange}
                                />
                                <View
                                    style={
                                        formikProps.errors.confirmPassword
                                            ? styles.redCircle
                                            : styles.greenCircle
                                    }></View>
                                <Text
                                    style={
                                        formikProps.touched.confirmPassword &&
                                        formikProps.errors.confirmPassword
                                            ? styles.errMsg
                                            : null
                                    }>
                                    {formikProps.touched.confirmPassword &&
                                        formikProps.errors.confirmPassword}
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
                                            formikProps.errors.newPassword ||
                                            formikProps.errors.confirmPassword
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
    textOldPassword: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#fc8019',
        borderRadius: 2.5,
    },
    textNewPassword: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#fc8019',
        borderRadius: 2.5,
    },
    textConfirmPassword: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#fc8019',
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

export default ChangePassword;
