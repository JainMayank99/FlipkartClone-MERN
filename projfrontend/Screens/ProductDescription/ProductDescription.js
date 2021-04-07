import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
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

const ProductDescScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [addTo, setAddTo] = useState(false);
  const [msg, setMsg] = useState("Add to cart");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [count, setCount] = useState(0);

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

  const onCartButtonPressed = () => {
    isAuthenticated().then((res) => {
      if (res.user) {
        if (count === 0) {
          setLoading(true);
          addProductToCart(res.user._id, item._id, res.token)
            .then((res) => {
              setAdding(false);
              setCount(1);
              setLoading(false);
            })
            .catch((err) => {
              console.log("Error in addProductToCart", err);
            });
        } else {
          navigation.navigate("Cart", itemList);
        }
      } else {
        navigation.navigate("Login");
      }
    });
  };

  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res.user) {
          setLoading(true);
          getAllCartItemsByUserId(res.user._id, res.token)
            .then((res) => {
              setItemList(res.data);
              let count = 0;
              for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].product._id === item._id) count++;
                if (count === 1) break;
              }
              setCount(count);
              setLoading(false);
            })
            .catch((err) => {
              console.log("cart list fetching error: " + err);
            });
        } 
      })
      .catch((err) => {
        console.log("cart screen error: " + err);
      });
  }, []);

  return (
    <>
      {(console.disableYellowBox = true)}
      <View style={loading === true ? styles.overlay : null}>
        {loading === true || adding === true ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/loader.json")}
          />
        ) : null}
        <ScrollView>
          <ProductCarousel
            data={item.image}
            navigation={navigation}
            itemId={item._id}
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
          {count === 0 ? "Add To Cart" : "Go To Cart"}
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
  add: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fc8019",
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
