import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
var validator = require("aadhaar-validator");

import BackButtonHeader from "../../components/BackButtonHeader";
import { becomeASeller } from "./SellerAPI/sellerAPI";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

const AadhaarVerificationScreen = (props) => {
  const [value, onChangeText] = useState("");
  const [loading, setLoading] = useState(0);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const aadharImage = {
    uri: require("../../assets/main/aadhaar.jpg"),
  };
  const onSubmit = () => {
    setLoading(0);
    if (validator.isValidNumber(value) === false) {
      setLoading(2);
      setTimeout(() => {
        setLoading(0);
      }, 1000);
    } else {
      becomeASeller(user, token, value);
      props.navigation.goBack();
    }
  };

  React.useEffect(() => {
    props.navigation.addListener("focus", () => {
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
          }
        })
        .catch((err) => {
          console.log("order screen error: " + err);
        });
    });
  }, [props.navigation]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: Dimensions.get("screen").height,
      }}
    >
      <View style={loading !== 0 ? styles.overlay : { background: "white" }}>
        {loading !== 0 ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop={false}
            source={
              loading === 1
                ? require("../../assets/animations/loader.json")
                : require("../../assets/animations/error.json")
            }
          />
        ) : null}

        <BackButtonHeader screenName="Home" navigation={props.navigation} />
        {user !== "" ? (
          <>
            <View
              style={{
                height: Dimensions.get("screen").height * 0.5,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={aadharImage.uri}
                style={{
                  width: 120,
                  marginRight: 8,
                  height: 120,
                }}
              />
            </View>

            <View
              style={{
                height: Dimensions.get("screen").height * 0.5,
                paddingHorizontal: 16,
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangeText(text)}
                value={value}
                style={styles.textInput}
                placeholder="Enter Your Aadhaar Card Number"
              />
              <TouchableOpacity
                onPress={() => onSubmit()}
                style={styles.button}
              >
                <Text style={styles.text}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.login}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login to continue {">>"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default AadhaarVerificationScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "white",
  },
  textInput: {
    height: 48,
    backgroundColor: "#e4eeee",
    borderRadius: 10,
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    marginBottom: 32,
    marginTop: -88,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#ff5d42",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
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
  login: {
    marginTop: "55%",
    textAlign: "center",
    zIndex: 10,
  },
  loginText: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    textAlign: "center",
    color: "#FF6B3C",
    zIndex: 10,
  },
});
