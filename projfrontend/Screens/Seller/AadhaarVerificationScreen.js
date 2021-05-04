import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import BackButtonHeader from "../../components/BackButtonHeader";
import Screen from "./../../components/Screen";
var validator = require("aadhaar-validator");

const AadhaarVerificationScreen = () => {
  const [value, onChangeText] = useState("");
  const onSubmit = () => {
    console.log(validator.isValidNumber(value));
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: Dimensions.get("screen").height
      }}
    >
      <BackButtonHeader />
      <View style={{padding:16,height: Dimensions.get("screen").height*0.75,flexDirection:'column', justifyContent: 'center',}}>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={styles.textInput}
          placeholder="Enter Your Aadhaar Card Number"
        />
        <TouchableOpacity onPress={() => onSubmit()} style={styles.button}>
          <Text style={styles.text}>SUBMIT</Text>
        </TouchableOpacity>
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
      height:48,
      backgroundColor:'#e1e1e1',
      borderRadius: 10,
      fontFamily: "popins-reg",
      fontSize: 16,
      color: "white",
      marginBottom:32,
      padding:8
  },
  button: {
    backgroundColor: "#FF6B3C",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
  },
});
