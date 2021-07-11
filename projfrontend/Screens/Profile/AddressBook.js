import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Dimensions,
  Alert,
} from "react-native";
import Dash from "react-native-dash";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllAddress, removeAddress } from "./APICall/AddressAPI";
import BackButtonHeader from "../../components/BackButtonHeader";

const AddressBook = ({ navigation, route }) => {
  const { screenName } = route.params;
  const [defaultAddress, setDefaultAddress] = useState("");
  const [allAddresses, setAllAddressses] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const onChange = (data1, data2) => {
    setDefaultAddress(JSON.parse(data1));
    setAllAddressses(data2);
  };

  const getAddresses = (user, token) => {
    setLoading(true);
    getAllAddress(user, token)
      .then((res) => {
        if (
          res.data.defaultAddress.length === 0 &&
          res.data.addresses.length === 0
        ) {
          setDefaultAddress("");
          setAllAddressses([]);
        } else {
          onChange(res.data.defaultAddress, res.data.addresses);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("get address book  error: " + err);
      });
  };

  const removeAddr = (address) => {
    setLoading(true);
    removeAddress(user, token, address)
      .then((res) => {
        getAddresses(user, token);
        console.log("Succeffuly removeAddress");
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to remove address", err);
      });
  };

  const getLanguage = async () => {
    setLanguage(await AsyncStorage.getItem("lang"));
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getLanguage();
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
            getAddresses(res.user._id, res.token);
          }
        })
        .catch((err) => {
          console.log(" address book screen error: " + err);
        });
    });
  }, [navigation]);

  return (
    <View
        style={{
          backgroundColor: "white",
          height: Dimensions.get("screen").height,
        }}
      >
    <View
      style={loading === true ? styles.overlay : { backgroundColor: "white" }}
    >
      {loading === true ? (
        <LottieView
          style={styles.lottie}
          autoPlay
          loop={false}
          source={require("../../assets/animations/loader.json")}
        />
      ) : null}
      <View
        style={{
          backgroundColor: "white",
        
        }}
      >
        <BackButtonHeader screenName={screenName} navigation={navigation} />
        {loading === false &&
        defaultAddress.length !== 0 &&
        allAddresses.length !== 0 ? (
          <View style={{ marginTop: 32 }}>
            <View style={{ marginHorizontal: 16 }}>
              <Text style={styles.heading}>
                {language === "te"
                  ? "డిఫాల్ట్ చిరునామా :"
                  : language === "hi"
                  ? "डिफ़ॉल्ट पता :"
                  : language === "ka"
                  ? "ಡೀಫಾಲ್ಟ್ ವಿಳಾಸ :"
                  : language === "ta"
                  ? "இயல்புநிலை முகவரி :"
                  : "Default Address :"}
              </Text>
              <View style={styles.addressHolder}>
                <View
                  style={{ minWidth: Dimensions.get("screen").width * 0.875 }}
                >
                  <Text style={styles.text1}>{defaultAddress.addressType}</Text>
                  <Text style={styles.text}>{defaultAddress.house}</Text>

                  <Text style={styles.text}>
                    {defaultAddress.city},{defaultAddress.state}
                  </Text>

                  <Text style={styles.text}>{defaultAddress.postalCode}</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SetDefaultAddressScreen", {
                      screenName: "Address Book",
                    })
                  }
                >
                  <Feather name="feather" size={22} color="#FF6B3C" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 10,
                borderColor: "#edeeef",
                paddingVertical: 4,
              }}
            ></View>
            <View style={{ paddingLeft: 16 }}>
              <Text style={styles.heading2}>
                {language === "te"
                  ? "నా చిరునామాలు :"
                  : language === "hi"
                  ? "मेरे पते :"
                  : language === "ka"
                  ? "ನನ್ನ ವಿಳಾಸಗಳು :"
                  : language === "ta"
                  ? "எனது முகவரிகள் :"
                  : "My Addresses :"}
              </Text>
              <FlatList
                data={allAddresses}
                extraData={allAddresses}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  let addr = JSON.parse(item);
                  return (
                    <View style={styles.addressHolder}>
                      <View
                        style={{
                          minWidth: Dimensions.get("screen").width * 0.875,
                        }}
                      >
                        <Text style={styles.text1}>{addr.addressType}</Text>
                        <Text style={styles.text}>{addr.house}</Text>
                        <Text style={styles.text}>
                          {addr.city},{addr.state}
                        </Text>
                        <Text style={styles.text}>{addr.postalCode}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          removeAddr(item);
                        }}
                      >
                        <Feather name="trash" size={22} color="#FF6B3C" />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.view}
              onPress={() => navigation.navigate("AddAddress")}
            >
              <View style={{ height: 30, paddingRight: 8 }}>
                <Feather name="plus" size={24} color="#FF6B3C" />
              </View>

              <Text style={styles.add}>
                {language === "te"
                  ? "చిరునామాను జోడించండి"
                  : language === "hi"
                  ? "पता जोड़ें"
                  : language === "ka"
                  ? "ವಿಳಾಸವನ್ನು ಸೇರಿಸಿ"
                  : language === "ta"
                  ? "முகவரியைச் சேர்க்கவும்"
                  : "Add Address"}
              </Text>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 16 }}>
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
            </View>
          </View>
        ) : loading === false &&
          defaultAddress.length === 0 &&
          allAddresses.length === 0 ? (
          <View style={{ marginTop: 105 }}>
            <View style={styles.notFound}>
              <LottieView
                style={styles.globe}
                autoPlay
                loop
                source={require("../../assets/animations/globe.json")}
              />
            </View>
            <TouchableOpacity style={styles.buttonHolder}>
              <TouchableOpacity
                style={styles.view}
                onPress={() => navigation.navigate("AddAddress")}
              >
                <View style={{ height: 30, paddingRight: 8 }}>
                  <Feather name="plus" size={24} color="#FF6B3C" />
                </View>

                <Text style={styles.add}>Add Address</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ) : (
          console.log()
        )}
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
    paddingHorizontal: 12,
    paddingTop: 8,
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

export default AddressBook;
