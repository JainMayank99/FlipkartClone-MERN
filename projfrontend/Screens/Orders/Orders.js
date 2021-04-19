import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import OrderList from "./Components/OrdersList";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getOrdersByUser } from "./APICall/OrderAPI";

const Orders = ({ navigation }) => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [itemList, setItemList] = useState([]);

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

  React.useEffect(() => {
    setLoading(true);
    navigation.addListener("focus", () => {
      console.log("I am Order Screen");
      isAuthenticated()
        .then((res) => {
          if (res.user) {
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
        <Header
          language={language}
          changeLanguage={changeLanguage}
          navigation={navigation}
        />
        <View
          style={{
            marginTop: 105,
          }}
        >
          <OrderList itemList={itemList} />
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
});
export default Orders;
