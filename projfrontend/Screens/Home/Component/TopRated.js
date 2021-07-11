import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image as ExpoImage } from "react-native-expo-image-cache";

const TopRated = ({ topRatedItems, language }) => {

  const image = {
    uri: require("../../../assets/catIcons/star.png"),
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
            ? "టాప్ రేట్"
            : language === "hi"
            ? "टॉप रेटेड"
            : language === "ka"
            ? "ಅತ್ಯುತ್ತಮವಾದ"
            : language === "ta"
            ? "சிறந்த மதிப்பீடு"
            : "Top Rated"}
        </Text>
      </View>

      <FlatList
        horizontal
        horizontal={true}
        data={topRatedItems}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginLeft: 8,
                paddingBottom: 16,
                paddingHorizontal: 8,
              }}
            >
              <TouchableOpacity>
                <ExpoImage
                  style={{
                    width: 87.5,
                    height: 105,
                    borderRadius: 5,
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
                    <Feather name="star" size={18} style={styles.icon} />
                    <Text>{item.avgRating}</Text>/5
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
    position: "absolute",
    bottom: -10,
    left: 6.25,
    alignItems: "center",
    backgroundColor: "#ff5d42",
    width: 75.5,
    borderRadius: 5,
    padding: 2,
  },
  textDiscount: {
    fontFamily: "popins-semibold",
    fontSize: 14,
    color: "white",
  },
  icon: {
    color: "white",
  },
});
export default TopRated;
