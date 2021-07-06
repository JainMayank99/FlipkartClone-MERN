import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

import ProductList from "./ProductListingsComponents/ProductList";
import { productsByCategoryId } from "./APICall/CategoryProductAPI";
import BackButtonHeader from "../../components/BackButtonHeader";

const CategorySearchResults = ({ navigation, route }) => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [gallery, setGallery] = useState();
  const { category } = route.params;

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      productsByCategoryId(category)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Category Product Search Screen error", err);
        });
    });
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: Dimensions.get("screen").height,
      }}
    >
      <View style={loading === true ? styles.overlay : null}>
        {loading === true ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/loader.json")}
          />
        ) : null}
        <BackButtonHeader screenName='Home' navigation={navigation}/>
        <View
          style={{
            marginTop: 40,
          }}
        >
          <ProductList data={data} query={query} navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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

  ImageOverlay: {
    width: 150,
    height: 250,
    marginRight: 8,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.2,
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: 4,
    left: 10,
    bottom: 10,
  },
  imageText: {
    position: "absolute",
    color: "white",
    marginTop: 4,
    fontSize: 14,
    left: 30,
    bottom: 10,
  },

  carouselImage: {
    width: 200,
    height: 320,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  carouselText: {
    paddingLeft: 14,
    color: "white",
    position: "absolute",
    bottom: 10,
    left: 2,
    fontWeight: "bold",
  },
  carouselIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  carouselContentContainer: {
    flex: 1,

    minHeight: 720,
    paddingHorizontal: 14,
  },
  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: "flex-start",
  },
  carouselContainerView: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    flex: 1,
    overflow: "visible",
  },
});
export default CategorySearchResults;
