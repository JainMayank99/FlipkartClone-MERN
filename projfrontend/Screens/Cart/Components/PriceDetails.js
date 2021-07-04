import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Dash from "react-native-dash";

const PriceDetails = ({
  itemList,
  totalPrice,
  totalDiscount,
  language,
}) => {
  return (
    <View>
      <View style={styles.container}>
        {console.log("cartItemList Re")}
        <Text style={styles.heading}>
          {language === "te"
            ? "ధర వివరాలు"
            : language === "hi"
            ? "मूल्य विवरण"
            : language === "ka"
            ? "ಬೆಲೆ ವಿವರಗಳು"
            : language === "ta"
            ? "விலை விவரங்கள்"
            : "Price Details"}
        </Text>
        <View style={styles.view}>
          <Text style={styles.subText}>
            {language === "te"
              ? "ధర"
              : language === "hi"
              ? "मूल्य"
              : language === "ka"
              ? "ಬೆಲೆ"
              : language === "ta"
              ? "விலை"
              : "Price"}
            ({itemList.length} Items)
          </Text>
          <Text style={styles.subText}>₹{totalPrice}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.subText}> {language === "te"
              ? "డిస్కౌంట్"
              : language === "hi"
              ? "छूट"
              : language === "ka"
              ? "ರಿಯಾಯಿತಿ"
              : language === "ta"
              ? "தள்ளுபடி"
              : "Discount"}</Text>
          <Text style={styles.green}>₹{totalDiscount}</Text>
        </View>
        <Dash
          dashGap={5}
          dashLength={7.5}
          dashThickness={1.5}
          dashColor="#20263e"
          dashStyle={{ borderRadius: 100, overflow: "hidden" }}
          style={{
            paddingTop: 4,
            width: "100%",
            height: 10,
            borderRadius: 100,
          }}
        />
        <View style={styles.view}>
          <Text style={styles.subText}>{language === "te"
              ? "మొత్తం మొత్తం"
              : language === "hi"
              ? "कुल राशि"
              : language === "ka"
              ? "ಒಟ್ಟು ಮೊತ್ತ"
              : language === "ta"
              ? "மொத்த தொகை"
              : "Total Amount"}</Text>
          <Text style={styles.subText}>₹{totalPrice - totalDiscount}</Text>
        </View>

        <Dash
          dashGap={-1}
          dashLength={7.5}
          dashThickness={1.5}
          dashColor="#20263e"
          dashStyle={{ borderRadius: 100, overflow: "hidden" }}
          style={{
            width: "100%",
            height: 10,
            borderRadius: 100,
          }}
        />
        <View style={styles.view}>
          <Text style={styles.green}>{language === "te"
              ? "మొత్తం పొదుపు"
              : language === "hi"
              ? "कुल बचत"
              : language === "ka"
              ? "ಒಟ್ಟು ಉಳಿತಾಯ"
              : language === "ta"
              ? "மொத்த சேமிப்பு"
              : "Total Savings"}</Text>
          <Text style={styles.green}>₹{totalDiscount}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 10,
          borderColor: "#edeeef",
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  heading: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
  },
  subText: {
    fontFamily: "popins-med",
    fontSize: 17,
  },
  green: {
    fontFamily: "popins-med",
    fontSize: 17,
    color: "#50c878",
  },
});

export default PriceDetails;
