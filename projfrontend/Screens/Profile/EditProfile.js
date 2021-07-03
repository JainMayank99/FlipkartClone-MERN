import React, { useState } from "react";
import {
  Dimensions,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import LottieView from "lottie-react-native";

import Screen from "./../../components/Screen";
import Header from "../../components/Header";
import BackButtonHeader from "../../components/BackButtonHeader";

import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getUser, editUser } from "./APICall/ProfileAPI";

const validationSchema = yup.object().shape({
  email: yup.string().label("Email").email(),
  userName: yup
    .string()
    .label("UserName")
    .min(3, "Enter atleast 3 character")
    .max(20, "Atmost 30 character")
    .required(),
});

const EditProfile = ({ navigation, route }) => {
  const { screenName } = route.params;
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [loading, setLoading] = useState(0);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const pushToHome = () => {
    navigation.goBack();
  };

  const fetchUser = (userId, tokenId) => {
    setLoading(1);
    getUser(userId, tokenId)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log("User fetch error: " + err);
      });
  };

  const onSub = (values) => {
    setLoading(1);
    editUser(user, token, values.userName, values.email)
      .then((res) => {
        setLoading(2);
        setTimeout(() => {
          pushToHome();
        }, 3000);
      })
      .catch((err) => {
        console.log("User edit error: " + err);
        setLoading(2);
        setTimeout(() => {
          setLoading(0);
        }, 3000);
      });
  };

  React.useEffect(() => {
    setLoading(1);
    navigation.addListener("focus", () => {
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
            fetchUser(res.user._id, res.token);
            setLoading(0);
          }
        })
        .catch((err) => {
          console.log("Add address screen error: " + err);
        });
    });
  }, [navigation]);

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
    <View style={loading !== 0 ? styles.overlay : {backgroundColor:'white'}}>
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
              : require("../../assets/animations/error.json")
          }
        />
      ) : null}
      <View>
        <BackButtonHeader screenName={screenName} navigation={navigation} />
        <View style={styles.screen}>
          <Text style={styles.heading}>Edit Profile</Text>
          <Formik
            enableReinitialize={true}
            initialValues={{ email: email, userName: name }}
            onSubmit={(values, actions) => {
              onSub(values);
            }}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <React.Fragment>
                <View
                  style={{
                    marginHorizontal: 8,
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >
                  <Text style={styles.label}>USERNAME</Text>
                  {console.log(name)}
                  <TextInput
                    underlineColorAndroid="transparent"
                    onFocus={onFocusNameChange}
                    placeholder="Username"
                    autoCorrect={false}
                    style={
                      focusName === false
                        ? styles.textInput
                        : styles.textInputName
                    }
                    onChangeText={formikProps.handleChange("userName")}
                    onBlur={onBlurNameChange}
                    value={formikProps.values.userName}
                  />
                  <View
                    style={
                      formikProps.errors.userName
                        ? styles.redCircle
                        : styles.greenCircle
                    }
                  ></View>
                  <Text
                    style={
                      formikProps.touched.userName &&
                      formikProps.errors.userName
                        ? styles.errMsg
                        : null
                    }
                  >
                    {formikProps.touched.userName &&
                      formikProps.errors.userName}
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 8,
                    marginVertical: 4,
                  }}
                >
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="johndoe@example.com"
                    onFocus={onFocusEmailChange}
                    autoCorrect={false}
                    style={
                      focusEmail === false
                        ? styles.textInput
                        : styles.textInputEmail
                    }
                    onChangeText={formikProps.handleChange("email")}
                    onBlur={onBlurEmailChange}
                    value={formikProps.values.email}
                  />
                  <View
                    style={
                      formikProps.errors.email
                        ? styles.redCircle
                        : styles.greenCircle
                    }
                  ></View>
                  <Text
                    style={
                      formikProps.touched.email && formikProps.errors.email
                        ? styles.errMsg
                        : null
                    }
                  >
                    {formikProps.touched.email && formikProps.errors.email}
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
                      formikProps.errors.email || formikProps.errors.userName
                        ? styles.buttonlight
                        : styles.button
                    }
                  >
                    <Text style={styles.submit}>Update</Text>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </Formik>
        </View>

        <Text style={styles.version}>App Version : 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 72,
    paddingBottom: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: "white",
    height:Dimensions.get("screen").height
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
  heading: {
    fontFamily: "zilla-med",
    fontSize: 24,
    paddingVertical: 8,
  },
  label: {
    fontFamily: "zilla-reg",
    fontSize: 16,
    // color: '#bdbdbd',
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
  buttonlight: {
    backgroundColor: "#f4c2c2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  button: {
    backgroundColor: "#ff5d42",
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
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#d1d1d1",
    textAlign: "center",
    marginTop: 64,
    paddingBottom: 16,
    borderBottomWidth: 5,
    borderBottomColor: "#edeeef",
    backgroundColor: "white",
  },
});

export default EditProfile;
