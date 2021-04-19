import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import Screen from "./Screen";
import { StatusBar } from "react-native";

const BackButtonHeader = ({ screenName,navigation }) => {
  const cart = {
    uri: require("../assets/customIcons/cart.png"),
  };
  const settings = {
    uri: require("../assets/customIcons/settings.png"),
  };
  const back = {
    uri: require("../assets/customIcons/back.png"),
  };
  return (
    <Screen style={styles.screen}>
      <StatusBar hidden />
      <View style={{ position: "relative"}}>
        <TouchableOpacity style={styles.cart}>
          <Image
            source={cart.uri}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settings}>
          <Image
            source={settings.uri}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
         
            <Image
              source={back.uri}
              style={{
                width: 32,
                height: 32,
              }}
            />
          
          {/* <Text style={styles.add}>{screenName}</Text> */}
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default BackButtonHeader;

const styles = StyleSheet.create({
  screen: {
    paddingVertical:8
  },
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop:8,
    paddingBottom:24,
   
  
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
