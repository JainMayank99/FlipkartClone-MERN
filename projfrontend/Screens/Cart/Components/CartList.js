import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Dimensions } from "react-native";

import CartItem from "./CartItem";
import PriceDetails from "./PriceDetails";
import SavedItem from "./SavedItem";

const CartList = ({
  itemList,
  navigation,
  cartItemList,
  savedForLaterList,
  onChangeCartItemList,
  onChangeSavedItemList,
  totalPrice,
  totalDiscount,
  changeLoading,
  language,
}) => {
  const [change, setChange] = useState(true);
  const image1 = {
    uri: require("../../../assets/catIcons/download.png"),
  };

  return (
    <ScrollView
      style={{
        paddingBottom: 150,
        backgroundColor: "white",
      }}
    >
      {cartItemList.length > 0 ? (
        <>
          <View style={styles.body}>
            <Text style={styles.text}>
              {language === "te"
                ? "నా షాపింగ్ బండి"
                : language === "hi"
                ? "मेरी शॉपिंग कार्ट"
                : language === "ka"
                ? "ನನ್ನ ಶಾಪಿಂಗ್ ಕಾರ್ಟ್"
                : language === "ta"
                ? "எனது வணிக வண்டி"
                : "My Cart"}
            </Text>
          </View>

          <FlatList
            data={cartItemList}
            extraData={cartItemList}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  navigation={navigation}
                  onChangeCartItemList={onChangeCartItemList}
                  onChangeSavedItemList={onChangeSavedItemList}
                  changeLoading={changeLoading}
                  language={language}
                />
              );
            }}
          />
          <View
            style={{
              borderBottomWidth: 10,
              borderColor: "#edeeef",
              paddingVertical: 4,
            }}
          ></View>

          <PriceDetails
            itemList={cartItemList}
            totalPrice={totalPrice}
            totalDiscount={totalDiscount}
            navigation={navigation}
            language={language}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PaymentSelection", {
                itemList: itemList,
                totalPrice: totalPrice,
                totalDiscount: totalDiscount,
                totalAmount: totalPrice - totalDiscount,
              });
            }}
            style={{
              paddingVertical: 16,
              marginHorizontal: 16,
            }}
          >
            <View style={styles.button}>
              <Text style={styles.submit}>{language === "te"
              ? "చెల్లించడానికి కొనసాగండి"
              : language === "hi"
              ? "चुकाने के लिए कार्रवाई शुरू करो "
              : language === "ka"
              ? "ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ"
              : language === "ta"
              ? "செலுத்த தொடரவும்"
              : "Proceed To Pay"}</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              borderBottomWidth: 10,
              borderColor: "#edeeef",
            }}
          ></View>
        </>
      ) : null}
      {savedForLaterList.length > 0 ? (
        <React.Fragment>
          <View style={styles.saved}>
            <Image
              source={image1.uri}
              style={{
                width: 22.5,
                marginRight: 8,
                height: 22.5,
              }}
            />
            <Text style={styles.savedText}>{language === "te"
              ? "తరువాత సేవ్ చేయబడింది"
              : language === "hi"
              ? "भविष्य के लिए बचाया हुआ "
              : language === "ka"
              ? "ನಂತರ ಉಳಿಸಲಾಗಿದೆ"
              : language === "ta"
              ? "பின்னர் சேமிக்கப்பட்டது"
              : "Saved For Later"}</Text>
          </View>
          <FlatList
            data={savedForLaterList}
            extraData={savedForLaterList}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <SavedItem
                  item={item}
                  navigation={navigation}
                  onChangeSavedItemList={onChangeSavedItemList}
                  onChangeCartItemList={onChangeCartItemList}
                  changeLoading={changeLoading}
                  language={language}
                />
              );
            }}
          />
        </React.Fragment>
      ) : null}
      <View style={{ padding: 88, backgroundColor: "white" }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    marginBottom: -4,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    marginLeft: 3,
  },
  view: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "#20263e",
    paddingTop: 10,
    position: "absolute",
    right: Dimensions.get("screen").width * 0.10714,
  },

  slider: {
    position: "absolute",
    top: -5,
    right: -10,
    alignItems: "center",
    width: 80,
    borderRadius: 5,
    padding: 2,
  },
  heading: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "#20263e",
    paddingHorizontal: 8,
    letterSpacing: 0.5,
    textAlign: "left",
  },
  saved: {
    paddingTop: 8,
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  savedText: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    marginLeft: 3,
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
});

export default CartList;
