import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";

import WishListItems from "./components/WishListItems";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllWishListItemsByUserId } from "./APICall/WishlistAPI";
import BackButtonHeader from "./../../components/BackButtonHeader";

const WishList = ({ navigation, route }) => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const changeLoading = (val) => {
    setLoading(val);
    console.log(loading);
  };

  const onChangeWishlist = (newData) => {
    if (newData != itemList) {
      setItemList(newData);
    }
  };

  const getLanguage = async () => {
    setLanguage(await AsyncStorage.getItem("lang"));
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getLanguage();
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setLoading(true);
            getAllWishListItemsByUserId(res.user._id, res.token)
              .then((res) => {
                onChangeWishlist(res.data);
                setShowWishlist(true);
                setLoading(false);
              })
              .catch((err) => {
                console.log("wishlist fetching error: " + err);
              });
          } else {
            setShowWishlist(false);
          }
        })
        .catch((err) => {
          console.log("wishlist screen error: " + err);
        });
    });
  }, [navigation]);

  const mainWork = (lang) => {
    setLanguage(lang);
    setLoading(false);
  };
  const changeLanguage = (lang) => {
    setLoading(true);
    setTimeout(() => {
      mainWork(lang);
    }, 500);
  };

  return (
    <View>
      <View style={loading === true ? styles.overlay : null}>
        {loading === true ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/loader.json")}
          />
        ) : null}

        <View>
          <BackButtonHeader screenName="Home" navigation={navigation} />

          <View
            style={{
              marginTop: 40,
            }}
          >
            {showWishlist && itemList.length > 0 ? (
              <WishListItems
                itemList={itemList}
                navigation={navigation}
                onChangeWishlist={onChangeWishlist}
                changeLoading={changeLoading}
                language={language}
              />
            ) : showWishlist && itemList.length === 0 ? (
              <View style={styles.emptyCartAnimationHolder}>
                <LottieView
                  style={styles.lottie1}
                  autoPlay
                  loop
                  source={require("../../assets/animations/emptyCart.json")}
                />
                <Text style={styles.text}>
                  {language === "te"
                    ? "కోరికల జాబితా ఖాళీగా ఉంది!"
                    : language === "hi"
                    ? "इच्छा-सूची खाली है!"
                    : language === "ka"
                    ? "ಬಯಕೆಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ!"
                    : language === "ta"
                    ? "விருப்பப்பட்டியல் காலியாக உள்ளது!"
                    : "Wishlist Is Empty"}
                </Text>
              </View>
            ) : (
              <View style={styles.login}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginText}>Login to continue {">>"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  emptyCartAnimationHolder: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 7.5,
  },
  text: {
    fontFamily: "popins-reg",
    fontSize: 20,
    position: "relative",
    top: "52.5%",
    textAlign: "center",
    zIndex: 7.5,
    color: "#ff5d42",
  },
  lottie1: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "-7.5%",
    zIndex: 7.5,
  },
});
export default WishList;
