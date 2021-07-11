import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { getProductBasedOnTribe } from "../Screens/Home/APICall/HomeCall";

const PopularTribes = ({ navigation, language }) => {
  const [gallery, setgallery] = useState([
    {
      image: require("../assets/states/assam.jpg"),
      key: "1",
      location: "Assam",
    },
    {
      image: require("../assets/states/bangalore.png"),
      key: "2",
      location: "Karnataka",
    },
    {
      image: require("../assets/states/rajasthan.png"),
      key: "3",
      location: "Rajasthan",
    },
    {
      image: require("../assets/states/gujarat.png"),
      key: "4",
      location: "Gujarat",
    },
    {
      image: require("../assets/states/nagaland.jpg"),
      key: "5",
      location: "Nagaland",
    },
  ]);

  const image = {
    uri: require("../assets/catIcons/thumbs-up.png"),
  };

  const getProducts = (tribeName) => {
    getProductBasedOnTribe(tribeName)
      .then((res) => {
        // console.log("My Result", res.data);
        navigation.navigate("TribeSearch", {
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("Tribe Screen error", err);
      });
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
            width: 24,
            marginRight: 8,
            height: 24,
          }}
        />
        <Text style={styles.text}>
          {language === "te"
            ? "జనాదరణ పొందిన తెగలు"
            : language === "hi"
            ? "लोकप्रिय जनजाति"
            : language === "ka"
            ? "ಜನಪ್ರಿಯ ಬುಡಕಟ್ಟುಗಳು"
            : language === "ta"
            ? "பிரபல பழங்குடியினர்"
            : "Popular Tribes"}
        </Text>
      </View>

      <FlatList
        horizontal
        horizontal={true}
        data={gallery}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginLeft: 8,
                paddingBottom: 24,
                paddingHorizontal: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: 0.25,
                  borderColor: "#f7f7f7",
                }}
                onPress={() => getProducts(item.location)}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    resizeMode: "cover",
                  }}
                />
                <View style={styles.discountBox}>
                  <Text style={styles.textDiscount}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    paddingTop: 10,
    marginLeft: 3,
  },
  discountBox: {
    alignItems: "center",
    width: 90,
    borderRadius: 5,
    padding: 2,
  },
  textDiscount: {
    fontFamily: "popins-bold",
    fontSize: 14,
    color: "black",
  },
});
export default PopularTribes;
