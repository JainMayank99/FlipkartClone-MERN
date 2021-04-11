import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import CartList from "./Components/CartList";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllCartItemsByUserId } from "./APICall/cartAPI";

const Cart = ({ navigation,from }) => {
  const [showCart, setShowCart] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [cartItemList, setCartItemList] = useState([]);
  const [savedForLaterList, setSavedForLaterList] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0)
  const [totalDiscount,setTotalDiscount] = useState(0)
  const [count, setCount] = useState(4);
 
  const changeLoading=(val) =>{
    setLoading(val)
    console.log(loading)
  }
  
  const getPrice = (data) =>{
    let totalp=0;
    let totald=0;
    data.map((item) => {
      let price = item.product.price;
      let discount = item.product.discount;
      let quantity = item.Quantity;
      totalp+=(price)*quantity;
      totald+=((discount*price)/100)*quantity;   
    })
    setTotalPrice(totalp)
    setTotalDiscount(totald)
  }

  const onChangeCartItemList = (newData) => {
    if (newData != cartItemList){
      getPrice(newData)
      setCartItemList(newData);
    } 
    
  };

  const onChangeSavedItemList = (newData) => {
    if (newData != savedForLaterList) setSavedForLaterList(newData);
  };

  const rerender = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        // console.log(res.user._id);
        if (res.user) {
          getAllCartItemsByUserId(res.user._id, res.token)
            .then((res) => {
              setItemList(res.data);
              onChangeCartItemList(res.data.filter((item) => item.isSavedForLater == false))
              onChangeSavedItemList( res.data.filter((item) => item.isSavedForLater == true))
              getPrice(res.data.filter((item) => item.isSavedForLater == false))
              setShowCart(true);
            })
            .catch((err) => {
              console.log("cart list fetching error: " + err);
            });
        }
        else if( items!==undefined){
          console.log("Hii")
        } else setShowCart(false);
      })
      .catch((err) => {
        console.log("cart screen error: " + err);
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
    <View>
      {/* {console.log(from)} */}
      <View style={loading === true ? styles.overlay : null}>
        {loading === true ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/loader.json")}
          />
        ) : null}
    <Header
          language={language}
          changeLanguage={changeLanguage}
          navigation={navigation}
        />
        <View
          style={{
            marginTop: 105,
          }}
        >
          {showCart ? (
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
    color: "#fc8019",
  },
});
export default Cart;
