import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header";
import PriceDetails from "../Cart/Components/PriceDetails";
import { paymentByCash } from "./APICall/PaymentAPI";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllAddress } from "./../Profile/APICall/AddressAPI";
import { truncate } from "./../../components/Truncate";

const PaymentSelection = ({ navigation, route }) => {
  const { itemList, totalPrice, totalDiscount, totalAmount } = route.params;
  const [defaultAddress, setDefaultAddress] = useState("");
  const [allAddresses, setAllAddressses] = useState([]);
  const [selectedMode, setSelectedMode] = useState(0);
  const [loading, setLoading] = useState(0);
  const [loadinhMsg, setLoadingMsg] = useState("");
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [language, setLanguage] = useState("en");

  const onChange = (data1, data2) => {
    setDefaultAddress(JSON.parse(data1));
    setAllAddressses(data2);
  };

  const getAddresses = (user, token) => {
    setLoading(1);
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
        setLoading(0);
      })
      .catch((err) => {
        console.log("get address book  error: " + err);
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
          console.log("Payment screen error: " + err);
        });
      itemList.map((item) =>
        products.push({ quantity: item.Quantity, _id: item.product._id })
      );
    });
  }, [navigation]);

  const [modeOfPayment, setModeOfPayment] = useState([
    {
      key: "1",
      title: "Cash On Delivery",
    },
    {
      key: "2",
      title: "Online Payment",
    },
  ]);

  const pushToHome = () => {
    navigation.navigate("Home");
  };
  const onPress = () => {
    if (selectedMode === "1") {
      setLoading(1);
      setLoadingMsg("Placing Your Order...");
      console.log("Cash On Delivery");
      paymentByCash(user, token, products)
        .then((res) => {
          setLoading(2);
          setLoadingMsg("Order Placed Successfully");
          setTimeout(() => {
            pushToHome();
          }, 100);
        })
        .catch(() => {
          console.log("Failed Cash Payment");
        });
    } else {
      navigation.navigate("PaymentScreen", {
        itemList: itemList,
        totalPrice: totalPrice,
        totalDiscount: totalDiscount,
        totalAmount: totalPrice - totalDiscount,
      });
    }
  };

  return (
    <View style={loading !== 0 ? styles.overlay : null}>
      {console.log(selectedMode)}
      {loading === 1 ? (
        <>
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/loader.json")}
          />
          <View
            style={{
              position: "absolute",
              top: "55%",
              left: Dimensions.get("window").width * 0.5,
              translateX: -Dimensions.get("window").width * 0.25,
              zIndex: 11,
            }}
          >
            <Text style={styles.someText}>{loadinhMsg}</Text>
          </View>
        </>
      ) : loading === 2 ? (
        <>
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../assets/animations/done.json")}
          />
          <View
            style={{
              position: "absolute",
              top: "55%",
              left: Dimensions.get("window").width * 0.5,
              translateX: -Dimensions.get("window").width * 0.35,
              zIndex: 11,
            }}
          >
            <Text style={styles.someText}>{loadinhMsg}</Text>
          </View>
        </>
      ) : null}
      <Header />
      <ScrollView
        style={{
          marginTop: 105,
        }}
      >
        <View style={styles.addressHolder}>
          <View style={styles.test}>
            <Text style={styles.subText}>Deliver To : Rajender Singh </Text>
            <Feather name="home" size={20} color="#FF6B3C" />
          </View>
          <View style={styles.userAddress}>
            <Text style={styles.userInfo}>
              {truncate(
                defaultAddress.house +
                  "," +
                  defaultAddress.city +
                  "," +
                  defaultAddress.state +
                  "," +
                  defaultAddress.postalCode,
                35
              )}
            </Text>
            <TouchableOpacity
              style={styles.change}
              onPress={() =>
                navigation.navigate("SetDefaultAddressScreen", {
                  screenName: "PaymentSelection",
                })
              }
            >
              <Text style={styles.changeText}>CHANGE </Text>
            </TouchableOpacity>
          </View>
        </View>
        <PriceDetails
          itemList={itemList}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
          language={language}
        />
        <View
          style={{
            padding: 8,
            paddingBottom: 16,
            borderBottomWidth: 10,
            borderColor: "#edeeef",
          }}
        >
          <Text style={styles.select}>
            {language === "te"
              ? "చెల్లింపు మోడ్‌ను ఎంచుకోండి"
              : language === "hi"
              ? "भुगतान का तरीका चुनें"
              : language === "ka"
              ? "ಪಾವತಿ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ"
              : language === "ta"
              ? "கட்டணம் செலுத்தும் முறையைத் தேர்ந்தெடுக்கவும்"
              : "Select Mode Of Payment"}
          </Text>
          <FlatList
            vertical={true}
            data={modeOfPayment}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    height: 25,
                    borderRadius: 50,
                    justifyContent: "center",
                    marginVertical: 4,
                    marginHorizontal: 6.5,
                  }}
                >
                  <View style={styles.container}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableWithoutFeedback
                      onPress={() => setSelectedMode(item.key)}
                    >
                      {selectedMode !== item.key ? (
                        <Feather
                          styles={styles.circle}
                          name="circle"
                          size={22}
                          color="#FF6B3C"
                        />
                      ) : (
                        <Feather
                          styles={styles.circle}
                          name="disc"
                          size={22}
                          color="#FF6B3C"
                        />
                      )}
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            paddingVertical: 16,
            marginHorizontal: 16,
          }}
        >
          <View style={styles.button}>
            <Text style={styles.submit}>Proceed To Pay</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 10,
            borderColor: "#edeeef",
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default PaymentSelection;

const styles = StyleSheet.create({
  body: {
    marginLeft: 10,
    padding: 8,
  },
  addressHolder: {
    paddingHorizontal: 10,
    marginLeft: 10,
    paddingBottom: 8,
    borderBottomWidth: 10,
    borderColor: "#edeeef",
  },
  userInfo: {
    fontFamily: "popins-med",
    fontSize: 18,
    color: "black",
  },
  subText: {
    fontFamily: "popins-med",
    fontSize: 18,
    color: "black",
  },
  someText: {
    fontFamily: "popins-semibold",
    fontSize: 20,
    color: "#FF6B3C",
    marginTop: 25,
  },
  test: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userAddress: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  change: {
    position: "absolute",
    right: 0,
  },
  changeText: {
    fontFamily: "popins-med",
    fontSize: 16,
    color: "#FF6B3C",
  },
  select: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    marginTop: 5,
    fontFamily: "popins-med",
    fontSize: 16,
    color: "#20263e",
    paddingHorizontal: 8,
    letterSpacing: 0.5,
    textAlign: "left",
    width: Dimensions.get("screen").width * 0.85,
  },
  button: {
    backgroundColor: "#FF6B3C",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  submit: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "white",
  },
  overlay: {
    position: "relative",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
});
