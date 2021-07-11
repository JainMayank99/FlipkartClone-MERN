import React, { useEffect, useRef, useState, useContext } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import { dummyData } from "../../data/Data";
import { minData } from "../../data/MiniData";
import Header from "../../components/Header";
import AppCarousel from "../../components/AppCarousel";
import Categories from "../../components/Categories";
import TopPicks from "./Component/TopPicks";
import FeaturedCategories from "./Component/FeaturedCategories";
import DealOfTheDay from "./Component/DealOfTheDay";
import MiniTextBox from "../../components/MiniTextBox";
import PopularTribes from "../../components/PopularTribes";
import NewlyArrived from "./Component/NewlyArrived";
import InTheSpotlight from "./Component/InTheSpotlight";
import TopRated from "./Component/TopRated";
import BestSellingInCat from "./Component/BestSellingInCat";
import Sell from "../../components/Sell";
import BestSellingInJew from "../../components/BestSellingInJew";
import {
  getNewlyArrivedProduct,
  getRandomCategory,
  getTopRatedProductsBasedOnCategoryId,
  getTopRatedProducts,
} from "./APICall/HomeCall";
import BestSellingInClothing from "./Component/BestSellingInClothing";
import BestSellingInCovid from './Component/BestSellingInCovid';

const Home = ({ route, navigation }) => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [jewellery, setJewellery] = useState([]);
  const [covid, setCovid] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topRatedItems, setTopRatedItems] = useState([]);
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
      getLanguage();
      setLoading(true);
      getRandomCategory()
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.log("Deals of the Day Gallery2 Home Screen error", err);
        });

      getTopRatedProductsBasedOnCategoryId("60d84e49bef91815c42982df")
        .then((res) => {
          setClothes(res.data);
        })
        .catch((err) => {
          console.log("Best In clothing Gallery2 Home Screen error", err);
        });

      getTopRatedProductsBasedOnCategoryId("60ab96e8e6b6cf25a841486c")
        .then((res) => {
          setCovid(res.data);
        })
        .catch((err) => {
          console.log("Best In clothing Gallery2 Home Screen error", err);
        });

      getTopRatedProductsBasedOnCategoryId("60b1016409ad9b40444d8855")
        .then((res) => {
          setJewellery(res.data);
        })
        .catch((err) => {
          console.log("Best In clothing Gallery2 Home Screen error", err);
        });

      getNewlyArrivedProduct()
        .then((res) => {
          setNewItems(res.data);
        })
        .catch((err) => {
          console.log("Newly Arrived Gallery2 Home Screen error", err);
        });

      getTopRatedProducts()
        .then((res) => {
          setTopRatedItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Newly Arrived Gallery2 Home Screen error", err);
        });
  }, []);

  const getLanguage = async () => {
    setLanguage(await AsyncStorage.getItem("lang"));
  };

  const mainWork = async (lang) => {
    if (typeof window !== "undefined") {
      setLanguage(lang);
      await AsyncStorage.setItem("lang", lang);
    }
    setLoading(false);
  };
  const changeLanguage = (lang) => {
    setLoading(true);
    setTimeout(() => {
      mainWork(lang);
    }, 100);
  };

  const handleUserLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Console.log("Permission to access location was denied");
        return;
      }
    })();
  };
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            carouselRef.current.scrollToIndex(index);
            setBackground({
              uri: item.image,
              name: item.title,
              stat: item.released,
              desc: item.desc,
            });
          }}
        >
          <Image source={{ uri: item.image }} style={styles.carouselImage} />
          <Text style={styles.carouselText}>{item.title}</Text>
          <Feather
            name="terminal"
            size={30}
            color="white"
            style={styles.carouselIcon}
          />
        </TouchableOpacity>
      </View>
    );
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
        <Header
          language={language}
          changeLanguage={changeLanguage}
          navigation={navigation}
          showChangeLanguage={true}
        />

        <ScrollView
          style={{
            marginTop: 105,
          }}
        >
          <Categories language={language} navigation={navigation} />

          <AppCarousel data={dummyData} navigation={navigation} />
          <TopPicks language={language} navigation={navigation} />
          <FeaturedCategories
            language={language}
            navigation={navigation}
            category={category}
          />

          <DealOfTheDay language={language} navigation={navigation} />
          <MiniTextBox data={minData} navigation={navigation} />
          <BestSellingInCat
            title="Jewellery"
            navigation={navigation}
            categoryItems1={jewellery.slice(0, 3)}
            categoryItems2={jewellery.slice(3)}
            language={language}
          />
          <PopularTribes navigation={navigation} language={language}/>

          <NewlyArrived
            navigation={navigation}
            newItems1={newItems.slice(0, 3)}
            newItems2={newItems.slice(3)}
            language={language}
          />
          <InTheSpotlight navigation={navigation}  language={language}/>

          <BestSellingInClothing
            title="Clothing"
            navigation={navigation}
            categoryItems1={clothes.slice(0, 3)}
            categoryItems2={clothes.slice(3)}
            language={language}
          />
          <TopRated navigation={navigation} topRatedItems={topRatedItems} language={language} />
          <Sell navigation={navigation}/>
          <BestSellingInCovid
            title="Covid Related Items"
            navigation={navigation}
            categoryItems1={covid.slice(0, 3)}
            categoryItems2={covid.slice(3)}
            language={language}
          />
          <View style={{ paddingBottom: 112 }} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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

export default Home;
