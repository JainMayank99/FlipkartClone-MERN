import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButtonHeader from "../../components/BackButtonHeader";

const SelectTribe = ({ navigation }) => {
  //   const { screenName } = route.params;
  const [language, setLanguage] = useState("en");
  const [defaultTribe,setDefaultTribe] = useState("")
  const tribe = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  React.useEffect(() => {
    navigation.addListener("focus", () => {});
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: Dimensions.get("screen").height,
        paddingBottom:16
      }}
    >
      {/* <BackButtonHeader screenName={screenName} navigation={navigation} /> */}
      <View style={{ marginTop: 32 }}>
        <View
          style={{
            paddingVertical: 4,
          }}
        ></View>
        <View style={{ paddingLeft: 16 }}>
          <Text style={styles.heading2}>
            {language === "te"
              ? "డిఫాల్ట్ చిరునామాను ఎంచుకోండి :"
              : language === "hi"
              ? "डिफ़ॉल्ट पता चुनें :"
              : language === "ka"
              ? "ಡೀಫಾಲ್ಟ್ ವಿಳಾಸವನ್ನು ಆಯ್ಕೆಮಾಡಿ :"
              : language === "ta"
              ? "இயல்புநிலை முகவரியைத் தேர்ந்தெடுக்கவும் :"
              : "Select Your Tribe :"}
          </Text>
          <FlatList
            data={tribe}
            extraData={tribe}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              return (
                <View style={styles.addressHolder}>
                  <View
                    style={{
                      minWidth: Dimensions.get("screen").width * 0.875,
                    }}
                  >
                    <Text style={styles.text1}>{item}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      changeDefault(user, token, item);
                    }}
                  >
                    <Feather
                      // name={defaultAddressTester === item ? "disc" : "circle"}
                      name="circle"
                      size={22}
                      color="#FF6B3C"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 8,
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
  notFound: {
    position: "relative",
    height: "100%",
    width: Dimensions.get("screen").width,
  },
  globe: {
    position: "absolute",
    top: "-10%",
    backgroundColor: "rgba(255,255,255,0)",
    height: "100%",
    width: "100%",
  },
  buttonHolder: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(255,255,255,0)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  notFoundText: {
    color: "#FF6B3C",
    fontFamily: "popins-med",
    fontSize: 20,
  },
  heading: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "black",
  },
  heading2: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "black",
    paddingTop: 10,
  },
  subHeading: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    paddingVertical: 6,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  addressHolder: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 8,
    maxWidth: Dimensions.get("screen").width * 0.875,
  },
  text: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
  },
  text1: {
    fontFamily: "popins-med",
    fontSize: 18,
    color: "#FF6B3C",
    textTransform: "uppercase",
  },
  add: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "#FF6B3C",
  },
});

export default SelectTribe;
