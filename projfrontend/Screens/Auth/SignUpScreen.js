import React, { useState } from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Screen from '../../components/Screen';

import LottieView from 'lottie-react-native';
import { signUpWithEmail,signUpWithoutEmail } from './AuthAPICalls/authCalls';

const validationSchema = yup.object().shape({
    email: yup.string().label('Email').email('Must be a valid email'),
    userName: yup
        .string()
        .label('UserName')
        .min(3, 'Enter atleast 3 character')
        .max(20, 'Atmost 30 character')
        .required(),
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

const SignUpScreen = ({ route, navigation }) => {
    // const { phoneNumber } = route.params;
    const phoneNumber =1235467890
    const [focusName, setFocusName] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusNewPassword, setFocusNewPassword] = useState(false);
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const apicall=(values)=>{
        const {email,userName,newPassword}=values
        // console.log(userName,values.userName);
        if(email.length==0){
            // console.log("W/O email");
            signUpWithoutEmail(phoneNumber,userName,newPassword)
            .then((res) => {
                navigation.navigate('Home');
            })
            .catch((err) => {
                alert(err);
            })
        }else{
            // console.log("With email");
            signUpWithEmail(phoneNumber,userName,email,newPassword)
            .then((res) => {
                navigation.navigate('Home');
            })
            .catch((err) => {
                alert(err);
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {loading === true ? (
                <View style={styles.overlay}>
                    <LottieView
                        style={styles.lottie}
                        autoPlay
                        loop
                        source={require('../../assets/animations/loader.json')}
                    />
                    <Screen>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS == 'ios' ? 'padding' : 'height'
                            }>
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss}>
                                <ScrollView>
                                    <View style={styles.screen}>
                                        <Text style={styles.heading}>
                                            Create Your Account
                                        </Text>
                                        <Formik
                                            style={{ flex: 1 }}
                                            initialValues={{
                                                email: '',
                                                password: '',
                                            }}
                                            onSubmit={(values, actions) => {
                                                // alert(JSON.stringify(values));
                                                setLoading(true);

                                                apicall(values);

                                                // setTimeout(() => {
                                                //     actions.setSubmitting(
                                                //         false
                                                //     );
                                                // }, 1000);
                                            }}
                                            validationSchema={validationSchema}>
                                            {(formikProps) => (
                                                <React.Fragment>
                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginTop: 24,
                                                            marginBottom: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            USERNAME
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            onFocus={
                                                                onFocusNameChange
                                                            }
                                                            placeholder='Username'
                                                            autoCorrect={false}
                                                            style={
                                                                focusName ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textInputName
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'userName'
                                                            )}
                                                            onBlur={
                                                                onBlurNameChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .userName
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <Text
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .userName
                                                                    ? styles.errMsg
                                                                    : null
                                                            }>
                                                            {
                                                                formikProps
                                                                    .errors
                                                                    .userName
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            PHONE NUMBER
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder=
                                                                "phoneNumber"
                                                            
                                                            autoCorrect={false}
                                                            style={
                                                                styles.textInput
                                                            }
                                                            editable={false}
                                                        />
                                                        <View
                                                            style={
                                                                styles.greenCircle
                                                            }></View>
                                                        <Text></Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            EMAIL
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder='johndoe@example.com'
                                                            onFocus={
                                                                onFocusEmailChange
                                                            }
                                                            autoCorrect={false}
                                                            style={
                                                                focusEmail ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textInputEmail
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'email'
                                                            )}
                                                            onBlur={
                                                                onBlurEmailChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .email
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <Text
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .email
                                                                    ? styles.errMsg
                                                                    : null
                                                            }>
                                                            {
                                                                formikProps
                                                                    .errors
                                                                    .email
                                                            }
                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            NEW PASSWORD
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder='Enter new password'
                                                            onFocus={
                                                                onFocusNewPasswordChange
                                                            }
                                                            autoCorrect={false}
                                                            secureTextEntry={
                                                                true
                                                            }
                                                            style={
                                                                focusNewPassword ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textNewPassword
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'newPassword'
                                                            )}
                                                            onBlur={
                                                                onBlurNewPasswordChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .newPassword
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <ScrollView
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={
                                                                false
                                                            }>
                                                            <Text
                                                                style={
                                                                    formikProps
                                                                        .errors
                                                                        .newPassword
                                                                        ? styles.errMsg
                                                                        : null
                                                                }>
                                                                {
                                                                    formikProps
                                                                        .errors
                                                                        .newPassword
                                                                }
                                                            </Text>
                                                        </ScrollView>
                                                    </View>

                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            CONFIRM PASSWORD
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder='Confirm new password'
                                                            onFocus={
                                                                onFocusConfirmPasswordChange
                                                            }
                                                            autoCorrect={false}
                                                            secureTextEntry={
                                                                true
                                                            }
                                                            style={
                                                                focusConfirmPassword ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textConfirmPassword
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'confirmPassword'
                                                            )}
                                                            onBlur={
                                                                onBlurConfirmPasswordChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <Text
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                                    ? styles.errMsg
                                                                    : null
                                                            }>
                                                            {
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                            }
                                                        </Text>
                                                    </View>

                                                    <TouchableOpacity
                                                        onPress={
                                                            formikProps.handleSubmit
                                                        }
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 40,
                                                        }}>
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .email ||
                                                                formikProps
                                                                    .errors
                                                                    .userName ||
                                                                formikProps
                                                                    .errors
                                                                    .newPassword ||
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                                    ? styles.buttonlight
                                                                    : styles.button
                                                            }>
                                                            <Text
                                                                style={
                                                                    styles.submit
                                                                }>
                                                                Register
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </React.Fragment>
                                            )}
                                        </Formik>
                                    </View>
                                </ScrollView>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </Screen>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Screen>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS == 'ios' ? 'padding' : 'height'
                            }>
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss}>
                                <ScrollView>
                                    <View style={styles.screen}>
                                        <Text style={styles.heading}>
                                            Create Your Account
                                        </Text>
                                        <Formik
                                            style={{ flex: 1 }}
                                            initialValues={{
                                                email: '',
                                                password: '',
                                            }}
                                            onSubmit={(values, actions) => {
                                                // alert(JSON.stringify(values));
                                                setLoading(true);

                                                apicall(values);

                                                // setTimeout(() => {
                                                //     actions.setSubmitting(
                                                //         false
                                                //     );
                                                // }, 1000);
                                            }}
                                            validationSchema={validationSchema}>
                                            {(formikProps) => (
                                                <React.Fragment>
                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginTop: 24,
                                                            marginBottom: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            USERNAME
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            onFocus={
                                                                onFocusNameChange
                                                            }
                                                            placeholder='Username'
                                                            autoCorrect={false}
                                                            style={
                                                                focusName ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textInputName
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'userName'
                                                            )}
                                                            onBlur={
                                                                onBlurNameChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .userName
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <Text
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .userName
                                                                    ? styles.errMsg
                                                                    : null
                                                            }>
                                                            {
                                                                formikProps
                                                                    .errors
                                                                    .userName
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            PHONE NUMBER
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder=
                                                                "phoneNumber"
                                                            
                                                            autoCorrect={false}
                                                            style={
                                                                styles.textInput
                                                            }
                                                            editable={false}
                                                        />
                                                        <View
                                                            style={
                                                                styles.greenCircle
                                                            }></View>
                                                        <Text></Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            EMAIL
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder='johndoe@example.com'
                                                            onFocus={
                                                                onFocusEmailChange
                                                            }
                                                            autoCorrect={false}
                                                            style={
                                                                focusEmail ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textInputEmail
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'email'
                                                            )}
                                                            onBlur={
                                                                onBlurEmailChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .email
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <Text
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .email
                                                                    ? styles.errMsg
                                                                    : null
                                                            }>
                                                            {
                                                                formikProps
                                                                    .errors
                                                                    .email
                                                            }
                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            NEW PASSWORD
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder='Enter new password'
                                                            onFocus={
                                                                onFocusNewPasswordChange
                                                            }
                                                            autoCorrect={false}
                                                            secureTextEntry={
                                                                true
                                                            }
                                                            style={
                                                                focusNewPassword ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textNewPassword
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'newPassword'
                                                            )}
                                                            onBlur={
                                                                onBlurNewPasswordChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .newPassword
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <ScrollView
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={
                                                                false
                                                            }>
                                                            <Text
                                                                style={
                                                                    formikProps
                                                                        .errors
                                                                        .newPassword
                                                                        ? styles.errMsg
                                                                        : null
                                                                }>
                                                                {
                                                                    formikProps
                                                                        .errors
                                                                        .newPassword
                                                                }
                                                            </Text>
                                                        </ScrollView>
                                                    </View>

                                                    <View
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 4,
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.label
                                                            }>
                                                            CONFIRM PASSWORD
                                                        </Text>
                                                        <TextInput
                                                            underlineColorAndroid='transparent'
                                                            placeholder='Confirm new password'
                                                            onFocus={
                                                                onFocusConfirmPasswordChange
                                                            }
                                                            autoCorrect={false}
                                                            secureTextEntry={
                                                                true
                                                            }
                                                            style={
                                                                focusConfirmPassword ===
                                                                false
                                                                    ? styles.textInput
                                                                    : styles.textConfirmPassword
                                                            }
                                                            onChangeText={formikProps.handleChange(
                                                                'confirmPassword'
                                                            )}
                                                            onBlur={
                                                                onBlurConfirmPasswordChange
                                                            }
                                                        />
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                                    ? styles.redCircle
                                                                    : styles.greenCircle
                                                            }></View>
                                                        <Text
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                                    ? styles.errMsg
                                                                    : null
                                                            }>
                                                            {
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                            }
                                                        </Text>
                                                    </View>

                                                    <TouchableOpacity
                                                        onPress={
                                                            formikProps.handleSubmit
                                                        }
                                                        style={{
                                                            marginHorizontal: 8,
                                                            marginVertical: 40,
                                                        }}>
                                                        <View
                                                            style={
                                                                formikProps
                                                                    .errors
                                                                    .email ||
                                                                formikProps
                                                                    .errors
                                                                    .userName ||
                                                                formikProps
                                                                    .errors
                                                                    .newPassword ||
                                                                formikProps
                                                                    .errors
                                                                    .confirmPassword
                                                                    ? styles.buttonlight
                                                                    : styles.button
                                                            }>
                                                            <Text
                                                                style={
                                                                    styles.submit
                                                                }>
                                                                Register
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </React.Fragment>
                                            )}
                                        </Formik>
                                    </View>
                                </ScrollView>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </Screen>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 16,
        flex: 1,
    },
    overlay: {
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    lottie: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    heading: {
        fontFamily: 'zilla-bold',
        fontSize: 28,
        paddingVertical: 8,
    },
    label: {
        fontFamily: 'zilla-reg',
        fontSize: 16,
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
        borderBottomColor: '#fc8019',
        borderRadius: 2.5,
    },
    textInputName: {
        fontFamily: 'zilla-reg',
        fontSize: 20,
        color: '#bdbdbd',
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#fc8019',
        borderRadius: 2.5,
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
        padding: 12,
    },
    button: {
        backgroundColor: '#fc8019',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
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
        paddingBottom: 24,
        borderBottomWidth: 7.5,
        borderBottomColor: '#edeeef',
    },
});

export default SignUpScreen;

