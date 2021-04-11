import React, { useState } from "react";
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

import Header from "../../../components/Header";
import PriceDetails from "./PriceDetails";

const PaymentSelection = ({ navigation, route }) => {
  const { itemList, totalPrice, totalDiscount, totalAmount } = route.params;
  const [selectedMode, setSelectedMode] = useState();
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

  const onPress = () => {
    if (selectedMode == 1) {
      console.log("Cash On Delivery");
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
    <View>
      <Header />
      <ScrollView
        style={{
          marginTop: 105,
        }}
      >
        <View style={styles.addressHolder}>
          <View style={styles.test}>
            <Text style={styles.subText}>Deliver To : Rajender Singh </Text>
            <Feather name="home" size={20} color="#fc8019" />
          </View>
          <View style={styles.userAddress}>
            <Text style={styles.userInfo}>House No. ...................</Text>
            <TouchableOpacity style={styles.change}>
              <Text style={styles.changeText}>CHANGE </Text>
            </TouchableOpacity>
          </View>
        </View>

        <PriceDetails
          itemList={itemList}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
        <View
          style={{
            padding: 8,
            paddingBottom: 16,
            borderBottomWidth: 10,
            borderColor: "#edeeef",
          }}
        >
          <Text style={styles.select}>Select Mode Of Payment</Text>
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
                          color="#FC8019"
                        />
                      ) : (
                        <Feather
                          styles={styles.circle}
                          name="disc"
                          size={22}
                          color="#FC8019"
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
    paddingBottom: 16,
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

  test: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
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
    color: "#fc8019",
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
    backgroundColor: "#fc8019",
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
});
