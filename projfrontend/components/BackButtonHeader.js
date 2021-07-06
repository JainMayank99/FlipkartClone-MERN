import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import Screen from "./Screen";
import { StatusBar } from "react-native";

const BackButtonHeader = ({ screenName, navigation }) => {
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
    <Screen>
      <StatusBar hidden />

      {/* <View style={styles.cart}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChangePassword");
        }}
      >
         <Image
          source={cart.uri}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </TouchableOpacity>
    </View> */}

      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View
            style={styles.view}
            onPress={() => navigation.navigate("AddAddress")}
          >
            <Image
              source={back.uri}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Text style={styles.add}>{screenName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default BackButtonHeader;

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
    fontSize: 20,
    color: "#20263e",
  },
  // cart: {
  //   position: "absolute",
  //   top: -4,
  //   right: 16,
  // },
  menu: {
    position: "absolute",
    top: -12,
    left: 4,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "#FF6B3C",
    marginTop:4,
    marginLeft:4
  },
});
