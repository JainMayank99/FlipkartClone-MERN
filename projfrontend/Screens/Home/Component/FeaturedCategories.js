import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";

const FeaturedCategories = ({ language,navigation,category }) => {
  const width = Dimensions.get("screen").width;
  const [gallery, setgallery] = useState([
    {
      image: require("../../../assets/main/cat2.png"),
      key: "60d84e49bef91815c42982df",
      id: "0"

    },
    {
      image: require("../../../assets/main/bsj1.jpg"),
      key: "60b1016409ad9b40444d8855",
      id: "1"
    },
    {
      image: require("../../../assets/main/spot1.webp"),
      key: "609fc8f8d36dae0fe8386e6d",
      id: "2"
    },
    {
      image: require("../../../assets/main/deal6.webp"),
      key: "60ae8233514d2921647c7d23",
      id: "3"
    },
    {
      image: require("../../../assets//main/mask.webp"),
      key: "60ab96e8e6b6cf25a841486c",
      id: "4"
    },
    {
      image: require("../../../assets/main/spot4.webp"),
      key: "60aba4ff7f4a1f404489ad56",
      id: "5"
    },
  ]);

  const getImage = (id) => {
    const res=gallery.filter(item=>item.key===id);
    return res[0].image;
    }


  const image = {
    uri: require("../../../assets/catIcons/trending.png"),
  };

  return (
    <View
      style={{
        paddingBottom: 16,
        borderBottomWidth: 10,
        borderColor: "#edeeef",
      }}
    >
      <View style={styles.sub}>
        <Image
          source={image.uri}
          style={{
            width: 24,
            marginRight: 8,
            height: 24,
          }}
        />
        <Text style={styles.text}>
          {language === "en"
            ? "Featured Categories"
            : language === "hi"
            ? "विशेष रुप से प्रदर्शित श्रेणियाँ"
            : language === "ka"
            ? "ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ವರ್ಗಗಳು"
            : language === "ta"
            ? "சிறப்பு வகைகள்"
            : "ఫీచర్ చేసిన వర్గాలు"}
        </Text>
      </View>
      <FlatList
        horizontal
        horizontal={true}
        data={category}
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
              {console.log(getImage(item._id))}
              <TouchableOpacity>
                <Image
                  source={getImage(item._id)}
                  style={{
                    width: width * 0.43366,
                    height: 220,
                    borderRadius: 5,
                    resizeMode: "cover",
                  }}
                />
                
                <View style={styles.discountBox}>
                  <Text style={styles.textDiscount}>{item.CategoryName}</Text>
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
  sub: {
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
  discountBox: {
    position: "absolute",
    bottom: -10,
    left: 15,
    alignItems: "center",
    backgroundColor: "#ff5d42",
    width: 140,
    borderRadius: 5,
    padding: 2,
  },
  textDiscount: {
    fontFamily: "popins-bold",
    textTransform: "uppercase",
    fontSize: 14,
    color: "white",
  },
});

export default FeaturedCategories;
