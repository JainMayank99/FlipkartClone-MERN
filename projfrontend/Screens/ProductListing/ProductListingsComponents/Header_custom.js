import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderIcon from "../../../components/HeaderIcon";
import Screen from "../../../components/Screen";
import SelectLanguage from "../../../components/SelectLanguage";
import Search from "./Search";

const Header_custom = ({ query, handleSearch,navigation }) => {
  const refRBSheet = useRef();
  const cart = {
    uri: require("../../../assets/customIcons/cart.png"),
  };

  const back = {
    uri: require("../../../assets/customIcons/back.png"),
  };
  return (
    <Screen>
      <StatusBar hidden />
      <View style={{ position: "relative",marginBottom:24}}>
        <TouchableOpacity style={styles.cart}>
          <Image
            source={cart.uri}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={back.uri}
            style={{
              width: 32,
              height: 32,
            }}
          />

        </TouchableOpacity>
      </View>
      <Search query={query} handleSearch={handleSearch} />
    </Screen>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "popins-med",
    fontSize: 24,
    color: "#20263e",
  },
  button: {
    backgroundColor: "white",
  },
  language: {
    position: "absolute",
    top: 0,
    right: 60,
  },
  title: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "#20263e",
  },
  bottomTab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    fontFamily: "zilla-med",
    fontSize: 24,
    color: "black",
  },
  cart: {
    position: "absolute",
    top: -8,
    right: 16,
  },
  settings: {
    position: "absolute",
    top: -8,
    right: 56,
  },
  back: {
    position: "absolute",
    top: -12,
    left: 0,
  },
});
export default Header_custom;
