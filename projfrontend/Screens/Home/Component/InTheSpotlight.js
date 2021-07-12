import React, { useRef, useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Carousel from "react-native-anchor-carousel";

import { Image as ExpoImage } from "react-native-expo-image-cache";

import { randomProduct } from "../APICall/HomeCall";
import { truncate } from "./../../../components/Truncate";

const image = {
  uri: require("../../../assets/catIcons/camera.png"),
};
const imageChevron = {
  uri: require("../../../assets/catIcons/chevron-right.png"),
};

const InTheSpotlight = ({ navigation, language }) => {
  const { width, height } = Dimensions.get("window");
  const carouselRef = useRef(null);

  const [gallery, setGallery] = useState();

  useEffect(() => {
    randomProduct(5)
      .then((res) => {
        setGallery(res.data);
      })
      .catch((err) => {
        console.log("Top Picks Home Screen error", err);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductDescription", {
              item,
            });
          }}
        >
          <ExpoImage
            preview={{
              uri: item.image[0].url
                .slice(0, 48)
                .concat("t_media_lib_thumb/")
                .concat(item.image[0].url.slice(48)),
            }}
            uri={item.image[0].url}
            style={styles.carouselImage}
          />
          <View style={styles.discountBox}>
            <Text style={styles.textDiscount} numberOfLines={1}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        paddingBottom: 16,
        borderBottomWidth: 10,
        borderColor: "#edeeef",
      }}
    >
      <View style={styles.body}>
        <Image
          source={image.uri}
          style={{
            width: 26,
            marginRight: 8,
            height: 26,
          }}
        />
        <Text style={styles.text}>
          {language === "te"
            ? "స్పాట్‌లైట్‌లో"
            : language === "hi"
            ? "सुर्खियों में"
            : language === "ka"
            ? "ಸ್ಪಾಟ್‌ಲೈಟ್‌ನಲ್ಲಿ"
            : language === "ta"
            ? "ஸ்பாட்லைட்டில்"
            : "In The SpotLight"}
        </Text>
        {/* <Text style={styles.view}>View All</Text>
        <Image
          source={imageChevron.uri}
          style={{
            position: "absolute",
            right: 6,
            width: 24,
            marginRight: 8,
            height: 20,
            bottom: 19,
          }}
        /> */}
      </View>
      <ScrollView>
        <View style={styles.carouselContentContainer}>
          <View style={styles.carouselContainerView}>
            <Carousel
              style={styles.carousel}
              data={gallery}
              renderItem={renderItem}
              itemWidth={200}
              containerWidth={width - 20}
              seperatorWidth={0}
              ref={carouselRef}
              inActiveOpacity={0.4}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 24,
    color: "#20263e",
    paddingTop: 10,
    marginLeft: 3,
  },
  view: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "#20263e",
    paddingTop: 8,
    position: "absolute",
    right: Dimensions.get("screen").width * 0.10714,
  },
  discountBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    backgroundColor: "white",
    width: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: Dimensions.get("screen").width * 0.005102,
    shadowColor: "#f4f4f4",
    shadowOffset: { width: 0.5, height: 0.25 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1.5,
  },
  textDiscount: {
    fontFamily: "popins-bold",
    fontSize: 16,
    color: "black",
    padding: 8,
  },
  carouselImage: {
    width: 200,
    height: 320,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  carouselContentContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
export default InTheSpotlight;
