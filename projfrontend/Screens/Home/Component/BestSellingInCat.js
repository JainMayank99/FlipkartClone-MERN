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
import { Feather } from "@expo/vector-icons";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import { truncate } from "./../../../components/Truncate";

const BestSellingInCat = ({
  title,
  navigation,
  categoryItems1,
  categoryItems2,
  language,
}) => {
  const width = Dimensions.get("screen").width;

  const image = {
    uri: require("../../../assets/catIcons/heart.png"),
  };
  const imageChevron = {
    uri: require("../../../assets/catIcons/chevron-right.png"),
  };
  const getLanguage = async () => {
    setLanguage(await AsyncStorage.getItem("lang"));
  };

  return (
    <View
      style={{
        paddingBottom: 8,
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
            ? "ఆభరణాలలో బెస్ట్ సెల్లింగ్"
            : language === "hi"
            ? "ज्वैलरी में सबसे ज्यादा बिकने वाला"
            : language === "ka"
            ? "ಆಭರಣದಲ್ಲಿ ಹೆಚ್ಚು ಮಾರಾಟವಾಗಿದೆ"
            : language === "ta"
            ? "நகைகளில் சிறந்த விற்பனையாகும்"
            : "Best Selling In Jewellery"}
        </Text>
      </View>

      <FlatList
        horizontal
        horizontal={true}
        data={categoryItems1}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
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
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View>
                    <ExpoImage
                      style={{
                        width: width * 0.26785,
                        height: 130,
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
                        {item.discount}% off
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.textDetails} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.tribeDetails}>{item.tribe}</Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.rating}>
                        <Feather name="star" size={22} style={styles.icon} />
                        <Text>{item.avgRating}</Text>
                        <Text>/5</Text>
                      </Text>
                      <Text style={styles.price}>
                        <Text style={{ fontSize: 22 }}>₹</Text>
                        <Text>{item.price}</Text>
                      </Text>
                    </View>
                  </View>
                  {item.key === "3" ? (
                    <View
                      style={{
                        paddingRight: Dimensions.get("screen").width * 0.2,
                      }}
                    ></View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <FlatList
        horizontal
        horizontal={true}
        data={categoryItems2}
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
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View>
                    <ExpoImage
                      style={{
                        width: width * 0.26785,
                        height: 130,
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
                        {item.discount}% off
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.textDetails} numberOfLines={1}>
                    {item.name}
                    </Text>
                    <Text style={styles.tribeDetails}>{item.tribe}</Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.rating}>
                        <Feather name="star" size={22} style={styles.icon} />
                        <Text>{item.avgRating}</Text>
                        <Text>/5</Text>
                      </Text>
                      <Text style={styles.price}>
                        <Text style={{ fontSize: 22 }}>₹</Text>
                        <Text>{item.price}</Text>
                      </Text>
                    </View>
                  </View>
                  {item.key === "3" ? (
                    <View
                      style={{
                        paddingRight: Dimensions.get("screen").width * 0.2,
                      }}
                    ></View>
                  ) : null}
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
    bottom: -10,
    left: 12.5,
    alignItems: "center",
    backgroundColor: "#ff5d42",
    width: 80,
    borderRadius: 5,
    padding: 2,
  },
  textDiscount: {
    fontFamily: "popins-bold",
    fontSize: 14,
    color: "white",
  },
  detailsBox: {
    width: 180,
    padding: 8,
  },
  textDetails: {
    fontFamily: "popins-bold",
    textTransform: "capitalize",
    fontSize: 18,
    color: "black",
    paddingVertical: 2,
  },
  tribeDetails: {
    fontFamily: "popins-semibold",
    fontSize: 17,
    color: "#4d4b50",
    paddingVertical: 2,
  },
  rating: {
    fontFamily: "popins-semibold",
    fontSize: 16,
    color: "#4d4b50",
    paddingVertical: 4,
  },
  price: {
    fontFamily: "popins-semibold",
    fontSize: 16,
    color: "#4d4b50",
  },
});

export default BestSellingInCat;
