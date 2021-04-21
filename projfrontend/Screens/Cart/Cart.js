import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import CartList from "./Components/CartList";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllCartItemsByUserId } from "./APICall/cartAPI";

const Cart = ({ navigation, from }) => {
  const [showCart, setShowCart] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [cartItemList, setCartItemList] = useState([]);
  const [savedForLaterList, setSavedForLaterList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [count, setCount] = useState(4);

  const changeLoading = (val) => {
    setLoading(val);
    console.log(loading);
  };

  const getPrice = (data) => {
    let totalp = 0;
    let totald = 0;
    data.map((item) => {
      let price = item.product.price;
      let discount = item.product.discount;
      let quantity = item.Quantity;
      totalp += price * quantity;
      totald += ((discount * price) / 100) * quantity;
    });
    setTotalPrice(totalp);
    setTotalDiscount(totald);
  };

  const onChangeCartItemList = (newData) => {
    if (newData != cartItemList) {
      getPrice(newData);
      setCartItemList(newData);
    }
  };

  const onChangeSavedItemList = (newData) => {
    if (newData != savedForLaterList) setSavedForLaterList(newData);
  };

  const rerender = () => {
    setCount(count + 1);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setLoading(true);
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            getAllCartItemsByUserId(res.user._id, res.token)
              .then((res) => {
                setItemList(res.data);
                setLoading(false);
                onChangeCartItemList(
                  res.data.filter((item) => item.isSavedForLater == false)
                );
                onChangeSavedItemList(
                  res.data.filter((item) => item.isSavedForLater == true)
                );
                getPrice(
                  res.data.filter((item) => item.isSavedForLater == false)
                );
                setShowCart(true);
              })
              .catch((err) => {
                console.log("cart list fetching error: " + err);
              });
          } else setShowCart(false);
        })
        .catch((err) => {
          console.log("cart screen error: " + err);
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
    <View
      style={loading === true ? styles.overlay : { backgroundColor: "white" }}
    >
      {loading === true ? (
        <LottieView
          style={styles.lottie}
          autoPlay
          loop
          source={require("../../assets/animations/loader.json")}
        />
      ) : null}
      <View style={{ backgroundColor: "white" }}>
        <Header
          language={language}
          changeLanguage={changeLanguage}
          navigation={navigation}
        />

        {showCart ? (
          <View
            style={{
              marginTop: 105,
              backgroundColor: "white",
            }}
          >
            
            {cartItemList.length > 0 || savedForLaterList>0 ? (
              <CartList
                itemList={itemList}
                navigation={navigation}
                cartItemList={cartItemList}
                savedForLaterList={savedForLaterList}
                onChangeCartItemList={onChangeCartItemList}
                onChangeSavedItemList={onChangeSavedItemList}
                totalPrice={totalPrice}
                totalDiscount={totalDiscount}
                changeLoading={changeLoading}
              />
            ) : (
              <View style={styles.emptyCartAnimationHolder}>
                {console.log("Empty")}
                <LottieView
                  style={styles.lottie1}
                  autoPlay
                  loop
                  source={require("../../assets/animations/emptyCart.json")}
                />
                <Text style={styles.text}>Cart Is Empty!</Text>
              </View>
            )}
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
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "relative",
    height: "100%",
    width: "100%",
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
    fontSize:22.5,
    position: "relative",
    top: "60%",
    left:Dimensions.get('window').width*0.5,
    transform: [{translateX:-Dimensions.get('window').width*0.15 }],
    zIndex: 7.5,
    color:"#FF6B3C"
  },
  lottie1: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top:'-5%',
    zIndex: 7.5,
  },
  lottie: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  login: {
    position: "relative",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#FF6B3C",
  },
});
export default Cart;
