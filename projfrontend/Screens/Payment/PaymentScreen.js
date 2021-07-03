import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { v1 as uuidv1 } from "uuid";
const axios = require("axios");

import { BACKEND_URL } from "@env";
import Header from "../../components/Header";
import { PaymentView } from "./PaymentView";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

import LottieView from "lottie-react-native";

const PaymentScreen = ({ route }) => {
  // console.log("Screen", route.params);
  const { itemList } = route.params;

  //
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [phone, setPhone] = useState("");

  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res.user) {
          setUser(res.user._id);
          setToken(res.token);
          setPhone(res.user.phone);
        }
      })
      .catch((err) => {
        console.log("isAuthenticated error is Payment", err);
      });

    itemList.map((item) =>
      products.push({ quantity: item.Quantity, _id: item.product._id })
    );
  }, []);

  const cartInfo = {
    id: "5eruyt7asdas647623a5asd1612asd545423", //use uuid here uuidv1()
    description: "BhartiyaHandiCraft Order",
    amount: route.params.totalAmount, //get from cart
  };

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus("Please wait !");
    setResponse(paymentResponse);
    setLoading(1);
    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status

    try {
      //API CALL
      // "http://192.168.29.45:8000/api/payment",
      const stripeResponse = await axios({
        method: "post",
        url: `${BACKEND_URL}/paymentByCard/${user}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          email: `${phone}@bhartiyahandicraft.com`, //"mayank@gmail.com",
          product: cartInfo,
          authToken: jsonResponse,
          totalPrice: route.params.totalAmount, //get from cart
          products: products,
        },
      });

      // console.log("stripeResponse", stripeResponse);
      if (stripeResponse) {
        const { paid } = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus("Payment Success");
          setLoading(2);
          // console.log("Payment Success");
        } else {
          setPaymentStatus("Payment failed due to some issue");
          setLoading(3);
          // console.log("Payment failed due to some issue");
        }
      } else {
        setPaymentStatus(" Payment failed due to some issue");
        setLoading(3);
        // console.log(" Payment failed due to some issue");
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(" Payment failed due to some issue");
    }
  };

  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View>
          {/* <Header /> */}

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 25, margin: 10, fontFamily: "zilla-med" }}>
              Make Payment
            </Text>
            <Text style={{ fontSize: 16, margin: 10, fontFamily: "zilla-med" }}>
              Product Description: {cartInfo.description}
            </Text>
            <Text style={{ fontSize: 16, margin: 10, fontFamily: "zilla-med" }}>
              Payable Amount: {route.params.totalAmount}
            </Text>

            <TouchableOpacity
              style={{
                height: 60,
                width: 300,
                backgroundColor: "#FF5733",
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setMakePayment(true);
              }}
            >
              <Text
                style={{ color: "#FFF", fontSize: 20, fontFamily: "zilla-med" }}
              >
                Proceed To Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );

      // show to make payment
    } else {
      if (response !== undefined) {
        return (
          <View style={loading !== 0 ? styles.overlay : { flex: 1 }}>
            {loading === 1 ? (
              <LottieView
                style={styles.lottie}
                autoPlay
                loop
                source={require("../../assets/animations/loader.json")}
              />
            ) : loading === 2 ? (
              <LottieView
                style={styles.lottie}
                autoPlay
                loop={false}
                source={require("../../assets/animations/done.json")}
              />
            ) : null}
            <View style={styles.screen}>
              <Text style={styles.text}>{paymentStatus}</Text>
            </View>
          </View>
        );
      } else {
        /* <Header /> */
        return (
          <PaymentView
            onCheckStatus={onCheckStatus}
            product={cartInfo.description}
            amount={cartInfo.amount}
          />
        );
      }
    }
  };

  return <View style={styles.container}>{paymentUI()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  navigation: { flex: 2, backgroundColor: "red" },
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  body: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  overlay: {
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.75)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: "cyan",
  },
  text: {
    fontFamily: "popins-med",
    fontSize: 24,
    color: "#FF6B3C",
  },
});

export default PaymentScreen;
