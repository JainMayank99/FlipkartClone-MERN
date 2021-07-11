import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Dash from "react-native-dash";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header";

import { getUser } from "./APICall/ProfileAPI";
import { isAuthenticated, signout } from "../Auth/AuthAPICalls/authCalls";
import { truncate } from "./../../components/Truncate";
import BackButtonHeader from "./../../components/BackButtonHeader";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(0);
  const [language, setLanguage] = useState("en");

  const getLanguage = async () => {
    setLanguage(await AsyncStorage.getItem("lang"));
  };

  const fetchUser = (userId, tokenId) => {
    getUser(userId, tokenId)
      .then((res) => {
        setName(truncate(res.data.name, 20));
        setPhone(res.data.phone);
        setLoading(false);
      })
      .catch((err) => {
        console.log("User fetch error: " + err);
      });
  };

  const logOff = () => {
    signout();
    navigation.goBack()
  }

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getLanguage();
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setLoading(true);
            setUser(res.user._id);
            setToken(res.token);
            fetchUser(res.user._id, res.token);
          }
          else{
            setUser("")
          }
        })
        .catch((err) => {
          console.log("Profile screen error: " + err);
        });
    });
  }, [navigation]);

  const image = {
    uri: require("../../assets/main/profile.webp"),
  };
  const wishlist = {
    uri: require("../../assets/catIcons/wish.png"),
  };
  const address = {
    uri: require("../../assets/catIcons/addressbook.png"),
  };
  const settings = {
    uri: require("../../assets/catIcons/setting.png"),
  };
  const logOut = {
    uri: require("../../assets/catIcons/power.png"),
  };
  const shopping = {
    uri: require("../../assets/catIcons/shopping-bag.png"),
  };
  return (
    <View style={loading === true ? styles.overlay : null}>
      {loading === true ? (
        <LottieView
          style={styles.lottie}
          autoPlay
          loop={false}
          source={require("../../assets/animations/loader.json")}
        />
      ) : null}
      <View>
        <BackButtonHeader screenName="Home" navigation={navigation} />
        {user !== "" ? (
          <View style={{ paddingHorizontal: 16 }}>
            <View style={styles.header}>
              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.mail}>
                  {language === "te"
                    ? "పరిచయం : "
                    : language === "hi"
                    ? "से संपर्क करें : "
                    : language === "ka"
                    ? "ಸಂಪರ್ಕ : "
                    : language === "ta"
                    ? "தொடர்பு : "
                    : "Contact : "}
                  {phone}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.edit}
                    onPress={() =>
                      navigation.navigate("EditProfile", {
                        screenName: "Profile",
                      })
                    }
                  >
                    {language === "te"
                      ? "ప్రొఫైల్‌ను సవరించండి"
                      : language === "hi"
                      ? "प्रोफ़ाइल संपादित करें"
                      : language === "ka"
                      ? "ಪ್ರೊಫೈಲ್ ಬದಲಿಸು"
                      : language === "ta"
                      ? "சுயவிவரத்தைத் திருத்து"
                      : "Edit Profile"}
                    {" >"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                style={styles.image}
                source={image.uri}
                style={{
                  marginVertical: 4,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
              />
            </View>
            <Dash
              dashGap={-1}
              dashLength={7.5}
              dashThickness={1.5}
              dashColor="#edeeef"
              dashStyle={{ borderRadius: 100, overflow: "hidden" }}
              style={{
                width: "100%",
                height: 8,
                borderRadius: 100,
              }}
            />
            <Text style={styles.tag1}>
              {language === "te"
                ? "వినియోగదారు వివరాలు"
                : language === "hi"
                ? "उपयोगकर्ता विवरण"
                : language === "ka"
                ? "ಬಳಕೆದಾರರ ವಿವರಗಳು"
                : language === "ta"
                ? "பயனர் விவரங்கள்"
                : "User Details"}
            </Text>
            <View style={styles.view}>
              <View style={styles.image}>
                <Image
                  source={shopping.uri}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orders", { screenName: "Profile" })
                }
              >
                <Text style={styles.subHeader}>
                  {language === "te"
                    ? "నా ఆదేశాలు"
                    : language === "hi"
                    ? "मेरे आदेश"
                    : language === "ka"
                    ? "ನನ್ನ ಆಜ್ಞೆಗಳು"
                    : language === "ta"
                    ? "என்னுடைய உத்தரவுகள்"
                    : "My Orders"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.view}>
              <View style={styles.image}>
                <Image
                  source={wishlist.uri}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Wishlist", { screenName: "Profile" })
                }
              >
                <Text style={styles.subHeader}>
                  {language === "te"
                    ? "కోరికల జాబితా"
                    : language === "hi"
                    ? "इच्छा-सूची"
                    : language === "ka"
                    ? "ಬಯಕೆಪಟ್ಟಿ"
                    : language === "ta"
                    ? "விருப்பப்பட்டியல்"
                    : "Wishlist"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.view}>
              <View style={styles.image}>
                <Image
                  source={address.uri}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Address", { screenName: "Profile" })
                }
              >
                <Text style={styles.subHeader}>
                  {language === "te"
                    ? "చిరునామా పుస్తకం"
                    : language === "hi"
                    ? "पता पुस्तिका"
                    : language === "ka"
                    ? "ವಿಳಾಸ ಪುಸ್ತಕ"
                    : language === "ta"
                    ? "முகவரி புத்தகம்"
                    : "Address Book"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.view1}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <Text style={styles.tag}>
                  {language === "te"
                    ? "పాస్వర్డ్ మార్చండి"
                    : language === "hi"
                    ? "पासवर्ड बदलें"
                    : language === "ka"
                    ? "ಗುಪ್ತಪದವನ್ನು ಬದಲಿಸಿ"
                    : language === "ta"
                    ? "கடவுச்சொல்லை மாற்று"
                    : "Change Password"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <View style={styles.image}>
                  <Image
                    source={settings.uri}
                    style={{
                      width: 25,
                      marginRight: 8,
                      height: 25,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.view2}>
              <TouchableOpacity
                onPress={() => logOff()}
              >
                <Text style={styles.tag}>
                  {language === "te"
                    ? "లాగ్ అవుట్"
                    : language === "hi"
                    ? "लॉग आउट"
                    : language === "ka"
                    ? "ಲಾಗ್ ಔಟ್"
                    : language === "ta"
                    ? "வெளியேறு"
                    : "Log Out"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => logOff()}
              >
                <View style={styles.image}>
                  <Image
                    source={logOut.uri}
                    style={{
                      width: 25,
                      marginRight: 8,
                      height: 25,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.login}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login to continue {">>"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header: {
    marginTop: 32,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  view1: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "popins-reg",
    fontSize: 22,
    color: "black",
    paddingVertical: 8,
  },
  mail: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    paddingTop: 5,
  },
  edit: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "#FF6B3C",
  },
  image: {
    height: 30,
    paddingHorizontal: 8,
  },
  subHeader: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "#444d56",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  tag: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    paddingVertical: 6,
  },
  tag1: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "black",
    paddingVertical: 6,
  },
  version: {
    fontFamily: "popins-med",
    fontSize: 18,
    color: "#d1d1d1",
    textAlign: "center",
    paddingVertical: 32,
    borderBottomWidth: 7.5,
    borderBottomColor: "#edeeef",
  },
  login: {
    marginTop: "65%",
    textAlign: "center",
    zIndex: 10,
  },
  loginText: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    textAlign: "center",
    color: "#FF6B3C",
    zIndex: 10,
  },
});

export default Profile;
