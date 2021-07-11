import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Screen from "../../components/Screen";

import LottieView from "lottie-react-native";
import { forgetPassword, isAuthenticated } from "./AuthAPICalls/authCalls";

const validationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must contain at least 8 characters, 1 uppercase, 1 digit & 1 special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("newPassword", {
      is: (newPassword) =>
        newPassword && newPassword.length > 0 ? true : false,
      then: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Password doesn't match"),
    }),
});

const ForgotPassword = ({ route, navigation }) => {
  const [focusOldPassword, setFocusOldPassword] = useState(false);
  const [focusNewPassword, setFocusNewPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(0);
  const { phoneNumber } = route.params;

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

  const apicall = (values) => {
    const { newPassword } = values;
    forgetPassword(phoneNumber, newPassword)
      .then((res) => {
        values.newPassword = "";
        values.confirmPassword = "";
        setLoading(2);
        setTimeout(() => {
          pushToLogin();
        }, 2000);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoading(3);
        setTimeout(() => {
          setLoading(0);
        }, 2000);
      });
  };

  const pushToLogin = () => {
    navigation.navigate("Login");
    setLoading(0);
  };
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setLoading(0);
    });
  }, [navigation]);

  
  return (
    <View
      style={
        loading !== 0 ? styles.overlay : { flex: 1, backgroundColor: "white" }
      }
    >
      <StatusBar hidden />
      {loading !== 0 ? (
        <LottieView
          style={styles.lottie}
          autoPlay
          loop={false}
          source={
            loading === 1
              ? require("../../assets/animations/loader.json")
              : loading === 2
              ? require("../../assets/animations/success.json")
              : loading === 3
              ? require("../../assets/animations/error.json")
              : loading === 4
              ? require("../../assets/animations/like.json")
              : loading === 5
              ? require("../../assets/animations/like.json")
              : require("../../assets/animations/warn.json")
          }
          speed={loading === 5 ? -1 : 1}
        />
      ) : null}
      <Screen>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            maxheight: 250,
            paddingTop: 8,
            paddingBottom: 24,
          }}
        >
          <LottieView
            style={styles.lottie1}
            autoPlay
            loop={true}
            source={require("../../assets/animations/changePassword.json")}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View style={styles.screen}>
                <Text style={styles.heading}>Set New Password</Text>
                <Formik
                  style={{ flex: 1 }}
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values, actions) => {
                    setLoading(true);
                    apicall(values);
                  }}
                  validationSchema={validationSchema}
                >
                  {(formikProps) => (
                    <React.Fragment>
                      <View
                        style={{
                          marginHorizontal: 8,
                          marginVertical: 4,
                        }}
                      >
                        <Text style={styles.label}>NEW PASSWORD</Text>
                        <TextInput
                          value={formikProps.values.newPassword}
                          underlineColorAndroid="transparent"
                          placeholder="Enter new password"
                          onFocus={onFocusNewPasswordChange}
                          autoCorrect={false}
                          secureTextEntry={true}
                          style={
                            focusNewPassword === false
                              ? styles.textInput
                              : styles.textNewPassword
                          }
                          onChangeText={formikProps.handleChange("newPassword")}
                          onBlur={onBlurNewPasswordChange}
                        />
                        <View
                          style={
                            formikProps.errors.newPassword
                              ? styles.redCircle
                              : styles.greenCircle
                          }
                        ></View>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                        >
                          <Text
                            style={
                              formikProps.errors.newPassword
                                ? styles.errMsg
                                : null
                            }
                          >
                            {formikProps.errors.newPassword}
                          </Text>
                        </ScrollView>
                      </View>

                      <View
                        style={{
                          marginHorizontal: 8,
                          marginVertical: 4,
                        }}
                      >
                        <Text style={styles.label}>CONFIRM PASSWORD</Text>
                        <TextInput
                          value={formikProps.values.confirmPassword}
                          underlineColorAndroid="transparent"
                          placeholder="Confirm new password"
                          onFocus={onFocusConfirmPasswordChange}
                          autoCorrect={false}
                          secureTextEntry={true}
                          style={
                            focusConfirmPassword === false
                              ? styles.textInput
                              : styles.textConfirmPassword
                          }
                          onChangeText={formikProps.handleChange(
                            "confirmPassword"
                          )}
                          onBlur={onBlurConfirmPasswordChange}
                        />
                        <View
                          style={
                            formikProps.errors.confirmPassword
                              ? styles.redCircle
                              : styles.greenCircle
                          }
                        ></View>
                        <Text
                          style={
                            formikProps.errors.confirmPassword
                              ? styles.errMsg
                              : null
                          }
                        >
                          {formikProps.errors.confirmPassword}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={formikProps.handleSubmit}
                        style={{
                          marginHorizontal: 8,
                          marginVertical: 40,
                        }}
                      >
                        <View
                          style={
                            formikProps.errors.newPassword ||
                            formikProps.errors.confirmPassword
                              ? styles.buttonlight
                              : styles.button
                          }
                        >
                          <Text style={styles.submit}>Submit</Text>
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
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    flex: 1,
  },
  overlay: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie1: {
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 250,
    zIndex: 100,
  },
  heading: {
    fontFamily: "zilla-bold",
    fontSize: 28,
    paddingVertical: 8,
  },
  label: {
    fontFamily: "zilla-reg",
    fontSize: 16,
    paddingTop: 4,
    letterSpacing: 0.75,
  },
  textInput: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#bdbdbd",
    borderRadius: 2.5,
    position: "relative",
  },
  textInputEmail: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#FF6B3C",
    borderRadius: 2.5,
  },
  textInputName: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#FF6B3C",
    borderRadius: 2.5,
  },
  textOldPassword: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#FF6B3C",
    borderRadius: 2.5,
  },
  textNewPassword: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#FF6B3C",
    borderRadius: 2.5,
  },
  textConfirmPassword: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#FF6B3C",
    borderRadius: 2.5,
  },
  buttonlight: {
    backgroundColor: "#f4c2c2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  button: {
    backgroundColor: "#FF6B3C",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  submit: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "white",
  },
  errMsg: {
    fontFamily: "zilla-reg",
    fontSize: 16,
    color: "red",
    paddingVertical: 4,
    height: 24,
  },
  greenCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#90EE90",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
  redCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#f94d00",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
  version: {
    fontFamily: "zilla-med",
    fontSize: 20,
    color: "#d1d1d1",
    textAlign: "center",
    paddingBottom: 24,
    borderBottomWidth: 7.5,
    borderBottomColor: "#edeeef",
  },
});

export default ForgotPassword;
