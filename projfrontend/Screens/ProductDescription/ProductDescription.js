import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import ProductInfo from "./Components/ProductInfo";
import ProductCarousel from "./Components/ProductCarousel";
import ProductReturnPolicy from "./Components/ProductReturnPolicy";
import ProductReviews from "./Components/ProductReviews";
import ProductTitle from "./Components/ProductTitle";
import RelatedProducts from "./Components/RelatedProducts";
import {
  addProductToCart,
  getAllCartItemsByUserId,
} from "../Cart/APICall/cartAPI";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { isProductInCart } from "./APICalls/ProductReviewAPI";

const ProductDescScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [inCart, setInCart] = useState();
  const [loggedIn, setLoggedIn] = useState();

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

  const pushToHome = () => {
    navigation.goBack();
    setLoading(0);
  };

  const pushToCart = () => {
    navigation.navigate("Cart");
    setLoading(0);
  };

  const onCartButtonPressed = () => {
    if (loggedIn === false) navigation.navigate("Login");
    else if (inCart === true) navigation.navigate("Cart");
    else {
      setLoading(1);
      addProductToCart(user, item._id, token)
        .then((res) => {
          setLoading(2);
          setTimeout(() => {
            pushToHome();
          }, 2000);
        })
        .catch((err) => {
          setLoading(3);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(1);
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
            setLoggedIn(true);
            isProductInCart(res.user._id, item._id, res.token)
              .then((res) => {
                if (res.data.result === true) setInCart(true);
                else setInCart(false);
                setLoading(0);
              })
              .catch((err) => {
                console.log("carted screen error: " + err);
              });
          } else {
            setLoggedIn(false);
            setInCart(false);
            setTimeout(() => {
              setLoading(0);
            }, 500);
          }
        })
        .catch((err) => {
          console.log("cart screen error: " + err);
        });
    }, [item])
  );

  return (
    <>
      <View style={loading !== 0 ? styles.overlay : null}>
        {loading !== 0 ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop={false}
            source={
              loading === 1
                ? require("../../assets/animations/loader.json")
                : loading === 2
                ? require("../../assets/animations/success.json")
                : loading === 3
                ? require("../../assets/animations/error.json")
                : require("../../assets/animations/warn.json")
            }
          />
        ) : null}

        <ScrollView>
          <ProductCarousel
            data={item.image}
            navigation={navigation}
            item={item}
            itemId={item._id}
            user={user}
            token={token}
            loggedIn={loggedIn}
          />

          <ProductTitle
            name={item.name}
            price={item.price}
            discount={item.discount}
          />
          <ProductInfo description={item.description} />
          <ProductReturnPolicy />
          <ProductReviews id={item._id} avgRating={item.avgRating} />
          {loading ? null : (
            <RelatedProducts
              categoryId={item.category}
              navigation={navigation}
            />
          )}
          <View style={{ height: 48 }}></View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onCartButtonPressed} style={styles.add}>
        <Text style={styles.submit}>
          {inCart === true ? "Go To Cart" : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </>
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
    backgroundColor: "rgba(255,255,255,0.75)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  statusText: {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: [{ translateX: -Dimensions.get("window").width * 0.4 }],
    zIndex: 10,
    margin: "auto",
    fontFamily: "popins-med",
    fontSize: 22.5,
  },
  add: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FF6B3C",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  submit: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "white",
  },
});

export default ProductDescScreen;
