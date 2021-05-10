import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderIcon from "./HeaderIcon";
import Screen from "./Screen";
import SearchBar from "./SearchBar";
import SelectLanguage from "./SelectLanguage";

import { signout } from "../Screens/Auth/AuthAPICalls/authCalls";

const Header = ({ language, changeLanguage, navigation,showChangeLanguage}) => {
  const refRBSheet = useRef();
  
  const image = {
    uri:
      "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  };

  const cart = {
    uri: require("../assets/customIcons/cart.png"),
  };
  const languageIcon = {
    uri: require("../assets/customIcons/language.png"),
  };
  const sidebar = {
    uri: require("../assets/customIcons/sidebar.png"),
  };

  return (
    <Screen>
      <StatusBar hidden />
      {showChangeLanguage===true && <View style={styles.language}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Image
            source={languageIcon.uri}
            style={{
              width: 28,
              height: 28,
            }}
          />
				</TouchableOpacity>
      </View>
}

      <View style={styles.cart}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
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
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
            <Image
            source={sidebar.uri}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <TouchableOpacity></TouchableOpacity>
       
        <Text style={styles.text}>Rajender</Text>

        <HeaderIcon />
      </View>
      <SearchBar navigation={navigation}/>
      <RBSheet
        height={150}
        animation={"fade"}
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",

            alignItems: "center",
            justifyContent: "center",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.bottomTab}>
          <Text style={styles.title}>
            {language === "en"
              ? "Select Your Language"
              : language === "hi"
              ? "अपनी भाषा का चयन करें"
              : language === "ka"
              ? "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ"
              : language === "ta"
              ? "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்"
              : "మీ భాషను ఎంచుకోండి"}
          </Text>
        </View>

        <SelectLanguage
          language={language}
          changeLanguage={changeLanguage}
          onPress={() => refRBSheet.current.open()}
        />
      </RBSheet>
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
    fontSize: 20,
    color: "#20263e",
  },
  button: {
    backgroundColor: "white",
  },
  language: {
    position: "absolute",
    top: -2,
    right: 60,
  },
  cart: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  menu: {
    position: "absolute",
    top: 0,
    left:16
  },
  title: {
    fontFamily: "popins-semibold",
    fontSize: 20,
    color: "#20263e",
  },
  bottomTab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Header;
