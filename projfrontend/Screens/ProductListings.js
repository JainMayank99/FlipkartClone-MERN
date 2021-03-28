import React, { useRef, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";

import ProductList from "../components/ProductListingsComponents/ProductList";
import Header_custom from "../components/ProductListingsComponents/Header_custom";

const ProductListings = () => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([])
  const [gallery, setgallery] = useState([
    {
        image: require('../assets/main/bsc2.jpg'),
        title: 'Solid State Kurta',
        cost: 4500,
        key: '10',
        desc: 'Tribes Karnataka',
        discount: '30% off',
    },
    {
        image: require('../assets/main/cat2.png'),
        title: 'Something',
        cost: 2500,
        key: '2',
        desc: 'Tribes Karnataka',
        discount: '50% off',
    },

    {
        image: require('../assets/main/bsc3.jpg'),
        title: 'Printed Kurta With Skirt ',
        cost: 2750,
        key: '5',
        desc: 'Tribes Karnataka',
        discount: '10% off',
    },
    {
        image: require('../assets/main/bsc3.jpg'),
        title: 'Printed Kurta With Skirt ',
        cost: 2750,
        key: '6',
        desc: 'Tribes Karnataka',
        discount: '10% off',
    },
    {
        image: require('../assets/main/bsc3.jpg'),
        title: 'Printed Kurta With Skirt ',
        cost: 2750,
        key: '7',
        desc: 'Tribes Karnataka',
        discount: '10% off',
    },
]);

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
  const handleSearch = (queryText) => {
    setQuery(queryText);
    const tempData = gallery.filter((item) => item.title.toLowerCase().startsWith(queryText.toLowerCase()) && queryText.length >0);
    setData(tempData);
  };

  return (
    <View>
      {loading === true ? (
        <View style={styles.overlay}>
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../assets/animations/loader.json")}
          />

          <Header_custom
            query={query}
            handleSearch={handleSearch}
            language={language}
            changeLanguage={changeLanguage}
          />
          <View
            style={{
              marginTop: 105,
            }}
          >
            <ProductList data={data} query={query}/>
          
          </View>
        </View>
      ) : (
        <View>
          
          <Header_custom
            query={query}
            handleSearch={handleSearch}
            language={language}
            changeLanguage={changeLanguage}
          />
          <View
            style={{
              marginTop: 105,
            }}
          >
            <ProductList data={data} query={query}/>
          </View>
        </View>
      )}
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
export default ProductListings;
