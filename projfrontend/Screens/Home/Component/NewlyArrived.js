import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import { truncate } from "./../../../components/Truncate";

const NewlyArrived = ({ navigation, newItems1, newItems2,language }) => {
  const width = Dimensions.get("screen").width;

  const image = {
    uri: require("../../../assets/catIcons/bookmark.png"),
  };
  const imageChevron = {
    uri: require("../../../assets/catIcons/chevron-right.png"),
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
            ? "కొత్తగా వచ్చారు"
            : language === "hi"
            ? "नव आगमन"
            : language === "ka"
            ? "ಹೊಸದಾಗಿ ಆಗಮಿಸಿದೆ"
            : language === "ta"
            ? "புதிதாக வந்து சேர்ந்தார்"
            : "Newly Arrived"}
        </Text>
      </View>

      <FlatList
        horizontal
        horizontal={true}
        data={newItems1}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginLeft: Dimensions.get("screen").width * 0.02041,
                paddingBottom: 32,
                paddingHorizontal: Dimensions.get("screen").width * 0.02041,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDescription", {
                    item,
                  });
                }}
              >
                <ExpoImage
                  style={{
                    width: width * 0.26785,
                    height: 130,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    resizeMode: "cover",
                  }}
                  preview={{
                    uri: item.image[0].url
                      .slice(0, 48)
                      .concat("t_media_lib_thumb/")
                      .concat(item.image[0].url.slice(48)),
                  }}
                  uri={item.image[0].url}
                />
                <View style={styles.discountBox}>
                  <Text style={styles.textDiscount} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <FlatList
        horizontal
        horizontal={true}
        data={newItems2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginTop: 16,
                marginLeft: Dimensions.get("screen").width * 0.02041,
                paddingBottom: 32,
                paddingHorizontal: Dimensions.get("screen").width * 0.02041,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDescription", {
                    item,
                  });
                }}
              >
                <ExpoImage
                  style={{
                    width: width * 0.26785,
                    height: 130,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    resizeMode: "cover",
                  }}
                  preview={{
                    uri: item.image[0].url
                      .slice(0, 48)
                      .concat("t_media_lib_thumb/")
                      .concat(item.image[0].url.slice(48)),
                  }}
                  uri={item.image[0].url}
                />
                <View style={styles.discountBox}>
                  <Text style={styles.textDiscount}>
                    {truncate(item.name, 12)}
                  </Text>
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
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    paddingTop: 10,
    marginLeft: 3,
  },
  view: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "#20263e",
    paddingTop: 10,
    position: "absolute",
    right: Dimensions.get("screen").width * 0.10714,
  },
  discountBox: {
    position: "absolute",
    bottom: -25,
    left: 0,
    alignItems: "center",
    backgroundColor: "white",
    width: Dimensions.get("screen").width * 0.26785,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: Dimensions.get("screen").width * 0.005102,
    shadowColor: "#f4f4f4",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  textDiscount: {
    fontFamily: "popins-bold",
    fontSize: 14,
    color: "black",
  },
});

export default NewlyArrived;
