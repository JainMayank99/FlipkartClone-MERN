import React, { useState } from "react";

import { productsByCategoryId } from "./../Screens/ProductListing/APICall/CategoryProductAPI";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const Categories = ({ language, navigation }) => {
  const titleEng = [
    "Clothing ",
    "Jewellery",
    "Accessories",
    "Home",
    "Covid",
    "Essentials",
  ];
  const titleHin = ["कपड़े", "आभूषण", "बैग", "घर", "कोविड", "अनिवार्य"];
  const titleKan = [
    "ಉಡುಪು",
    "ಜ್ಯುವೆಲ್ಲರಿ",
    "ಚೀಲಗಳು",
    "ಮನೆ",
    "ಕೋವಿಡ್",
    "ಎಸೆನ್ಷಿಯಲ್ಸ್य",
  ];
  const titleTam = ["ஆங்கிலம்", "கன்னடம்", "தமிழ்", "தெலுங்கு"];
  const titleTel = ["ఇంగ్లీష్", "కన్నడ", "తమిళం", "తెలుగు"];

  const checkLanguage = (language, key) => {
    if (language === "en") {
      return titleEng[key];
    } else if (language === "hi") {
      return titleHin[key];
    } else if (language === "ka") {
      return titleKan[key];
    } else if (language === "ta") {
      return titleTam[key];
    } else {
      return titleTel[key];
    }
  };

  const [gallery, setgallery] = useState([
    {
      image: require("../assets/catIcons/dress.png"),
      key: "60d84e49bef91815c42982df",
      id: "0",
    },
    {
      image: require("../assets/catIcons/jewellery.png"),
      key: "60b1016409ad9b40444d8855",
      id: "1",
    },
    {
      image: require("../assets/catIcons/bag.png"),
      key: "609fc8f8d36dae0fe8386e6d",
      id: "2",
    },
    {
      image: require("../assets/catIcons/home.png"),
      key: "60ae8233514d2921647c7d23",
      id: "3",
    },
    {
      image: require("../assets/catIcons/doctor.png"),
      key: "60ab96e8e6b6cf25a841486c",
      id: "4",
    },
    {
      image: require("../assets/catIcons/food.png"),
      key: "60aba4ff7f4a1f404489ad56",
      id: "5",
    },
  ]);
  const [data, setData] = useState([]);

  const getData = (key) => {
    productsByCategoryId(key)
      .then((res) => {
        setData(res.data);
        navigation.navigate("CategorySearch", {
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("Category Product Search Screen error", err);
      });
  };

  return (
    <FlatList
      horizontal={true}
      data={gallery}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              getData(item.key);
            }}
            style={{
              height: 65,
              width: 65,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
              marginHorizontal: 6.5,
              paddingLeft: 12,
              zIndex: 10000,
            }}
          >
            <View
              style={{
                height: 65,
                width: 65,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 3,
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ff5d42",
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              </View>
              <Text style={styles.text}>
                {checkLanguage(language, item.id)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 5,
    fontFamily: "popins-reg",
    fontSize: 12,
    color: "#20263e",
  },
});
export default Categories;
