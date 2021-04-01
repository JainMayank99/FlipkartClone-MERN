import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import ProductInfo from "./Components/ProductInfo";
import ProductCarousel from "./Components/ProductCarousel";
import ProductReturnPolicy from "./Components/ProductReturnPolicy";
import ProductReviews from "./Components/ProductReviews";
import ProductTitle from "./Components/ProductTitle";
import RelatedProducts from "./Components/RelatedProducts";


const ProductDescScreen = ({ route, navigation }) => {
  const [addTo, setAddTo] = useState(false);
  const [msg, setMsg] = useState("Add to cart");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const item = {
    name: "Product",
    price: "3232",
    discount: "10",
    description: "test description",
    _id: "1",
    avgRating: "4.2",
    image: require("../../assets/main/cat2.png"),
  };
  
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

  const onSubmit = () => {
    if (addTo === false) {
      setMsg("Go to cart");
      setAddTo(!addTo);
      setAdding(true);
      setTimeout(() => setAdding(false), 2000);
    } else navigation.navigate("Cart");
  };
  
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
          <ProductTitle
            name={item.name}
            price={item.price}
            discount={item.discount}
          />
          <ProductInfo description={item.description} />
          <ProductReturnPolicy />
          <ProductReviews id={item._id} avgRating={item.avgRating} />
          <RelatedProducts categoryId={item.category} navigation={navigation} />
        </ScrollView>
      </View>
      <TouchableOpacity onPress={onSubmit} style={styles.add}>
        <Text style={styles.submit}>{msg}</Text>
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
    backgroundColor: "rgba(255,255,255,0.5)",
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
