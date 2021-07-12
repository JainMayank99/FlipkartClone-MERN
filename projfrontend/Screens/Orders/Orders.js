import React, { useState, useEffect } from "react";
import { View, StyleSheet,Text, TouchableOpacity, Dimensions} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import OrderList from "./Components/OrdersList";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getOrdersByUser } from "./APICall/OrderAPI";
import BackButtonHeader from './../../components/BackButtonHeader';

const Orders = ({ navigation }) => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const mainWork = (lang) => {
    setLanguage(lang);
    setLoading(false);
  };
  const changeLanguage = (lang) => {
    setLoading(true);
    setTimeout(() => {
      mainWork(lang);
    }, 500);
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
            setLoading(true);
            setUser(res.user._id);
            setToken(res.token);
            getOrdersByUser(res.user._id, res.token)
              .then((res) => {
                setItemList(res.data);
                setShowOrders(true);
                setLoading(false);
              })
              .catch((err) => {
                console.log("order list fetching error: " + err);
              });
          } else setShowOrders(false);
        })
        .catch((err) => {
          console.log("order screen error: " + err);
        });
    });
  }, [navigation]);

  return (
    <View style={{height:Dimensions.get("screen").height,backgroundColor: "white" }}>
    <View style={loading === true ? styles.overlay : {backgroundColor:'white'}}>
      {loading === true ? (
        <LottieView
          style={styles.lottie}
          autoPlay
          loop={false}
          source={require("../../assets/animations/loader.json")}
        />
      ) : null}

      <View>
      <BackButtonHeader screenName='Home' navigation={navigation}/>
        <View
          style={{
            marginTop: 40,
          }}
        >{showOrders && itemList.length > 0 ? (
          <OrderList itemList={itemList} navigation={navigation} user={user} token={token} language={language}/>
        ) : showOrders && itemList.length === undefined ? (
          <View style={styles.emptyCartAnimationHolder}>
            <LottieView
              style={styles.lottie1}
              autoPlay
              loop
              source={require("../../assets/animations/emptyCart.json")}
            />
            <Text style={styles.text}>
              {language === "te"
                ? "ఆర్డర్ జాబితా ఖాళీగా ఉంది!"
                : language === "hi"
                ? "आदेश सूची खाली है!"
                : language === "ka"
                ? "ಆದೇಶ ಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ!"
                : language === "ta"
                ? "ஆர்டர் பட்டியல் காலியாக உள்ளது!"
                : "Orderlist Is Empty!"}
            </Text>
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
  login: {
    marginTop: "55%", 
    textAlign: "center",
    zIndex: 10,
  },
  loginText: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    textAlign: "center",
    color: "#ff5d42",
    zIndex: 10,
  },
  emptyCartAnimationHolder: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 7.5,
  },
  text: {
    fontFamily: "popins-reg",
    fontSize: 20,
    position: "relative",
    top: "52.5%",
    textAlign: "center",
    zIndex: 7.5,
    color: "#FF6B3C",
  },
  lottie1: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "-7.5%",
    zIndex: 7.5,
  },
});
export default Orders;
