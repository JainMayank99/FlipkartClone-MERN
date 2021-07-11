import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

import Header from "../../components/Header";
import SellerItems from "./SellerItems";
import { getSellerProducts } from "./SellerAPI/sellerAPI";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import BackButtonHeader from "./../../components/BackButtonHeader";

const SellerProducts = ({ navigation, route }) => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showSellerList, setShowSellerList] = useState(false);

  const onChangeSellerList = (newData) => {
    if (newData != itemList) {
      setItemList(newData);
    }
  };

  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res.user) {
          setLoading(true);
          getSellerProducts(res.user._id, res.token)
            .then((res) => {
              // console.log(res.data);
              onChangeSellerList(res.data);
              setShowSellerList(true);
              setLoading(false)
            })
            .catch((err) => {
              console.log("SellerList fetching error: " + err);
            });
        } else {
          setShowSellerList(false);
        }
      })
      .catch((err) => {
        console.log("SellerList screen error: " + err);
      });
  }, []);

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
    <View style={{ backgroundColor: "white" }}>
      <View style={loading === true ? styles.overlay : null}>
        {loading === true ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/loader.json")}
          />
        ) : null}

        <BackButtonHeader
          screenName='Home'
          navigation={navigation}
        />
        <View
          style={{
            marginTop: 16,
          }}
        >
          {showSellerList ? (
            <SellerItems
              itemList={itemList}
              navigation={navigation}
              onChangeSellerList={onChangeSellerList}
            />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  loginText: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#FF6B3C",
  },
});
export default SellerProducts;
