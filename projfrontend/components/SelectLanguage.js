import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const SelectLanguage = ({ language, changeLanguage }) => {
  const [gallery, setgallery] = useState([
    {
      image: require("../assets/catIcons/english.png"),
      title: "English",
      key: "9",
      language: "en",
    },
    {
      image: require("../assets/catIcons/hindi.png"),
      title: "हिंदी",
      key: "2",
      language: "hi",
    },
    {
      image: require("../assets/catIcons/kanada.png"),
      title: "ಕನ್ನಡ",
      key: "3",
      language: "ka",
    },
    {
      image: require("../assets/catIcons/tamil.png"),
      title: "தமிழ்",
      key: "4",
      language: "ta",
    },
    {
      image: require("../assets/catIcons/telugu.png"),
      title: "తెలుగు",
      key: "5",
      language: "te",
    },
  ]);
  return (
    <View
      style={{
        paddingVertical: 8,
      }}
    >
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
                onPress={() => changeLanguage(item.language)}
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
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <Text style={styles.text}>{item.title}</Text>
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
  title: {
    marginTop: 5,
    fontFamily: "popins-reg",
    fontSize: 10,
    color: "#20263e",
  },
});
export default SelectLanguage;
