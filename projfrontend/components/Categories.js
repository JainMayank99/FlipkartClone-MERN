import React, { useState } from "react";
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
    "Stationery",
    "Jewellery",
    "Bags",
    "Home",
    "Covid",
    "Essentials",
  ];
  const titleHin = ["कपड़े", "लेखन", "आभूषण", "बैग", "घर", "कोविड", "अनिवार्य"];
  const titleKan = [
    "ಉಡುಪು",
    "ಸ್ಟೇಷನರಿ",
    "ಜ್ಯುವೆಲ್ಲರಿ",
    "ಚೀಲಗಳು",
    "ಮನೆ",
    "ಕೋವಿಡ್",
    "ಎಸೆನ್ಷಿಯಲ್ಸ್य",
  ];
  const titleTam = ["ஆங்கிலம்", "இந்தி", "கன்னடம்", "தமிழ்", "தெலுங்கு"];
  const titleTel = ["ఇంగ్లీష్", "హిందీ", "కన్నడ", "తమిళం", "తెలుగు"];

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
      key: "0",
    },
    {
      image: require("../assets/catIcons/book.png"),
      key: "1",
    },
    {
      image: require("../assets/catIcons/jewellery.png"),
      key: "2",
    },
    {
      image: require("../assets/catIcons/bag.png"),
      key: "3",
    },
    {
      image: require("../assets/catIcons/home.png"),
      key: "4",
    },
    {
      image: require("../assets/catIcons/doctor.png"),
      key: "5",
    },
    {
      image: require("../assets/catIcons/food.png"),
      key: "6",
    },
  ]);

  return (
    <View>
      <FlatList
        horizontal={true}
        data={gallery}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: 65,
                width: 65,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
                marginHorizontal: 6.5,
                paddingLeft: 12,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 65,
                  width: 65,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 3,
                }}
                onPress={() => {
                  navigation.navigate("Search", {
                    category: "6056e7146e98663c74f5b84a",
                  });
                
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
                  {checkLanguage(language, item.key)}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
  text: {
    marginTop: 5,
    fontFamily: "popins-reg",
    fontSize: 12,
    color: "#20263e",
  },
});
export default Categories;
