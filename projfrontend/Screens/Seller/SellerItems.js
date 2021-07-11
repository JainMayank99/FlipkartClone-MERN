import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SellerItemDetails from "./SellerItemDetails";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SellerItems = ({
  itemList,
  navigation,
  onChangeSellerList,
  language,
}) => {
  return (
    <View
      style={{
        marginBottom: 64,
        borderColor: "#edeeef",
        zIndex: 105,
      }}
    >
      {itemList.length > 0 ? (
        <>
          <View style={styles.body}>
            <Text style={styles.text}>My Products</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.viewAddr}
              onPress={() => navigation.navigate("SellerScreen")}
            >
              <View style={{ height: 30, paddingRight: 8 }}>
                <Feather name="plus" size={24} color="#FF6B3C" />
              </View>

              <Text style={styles.add}>Add New Product</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <FlatList
              data={itemList}
              extraData={itemList}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <SellerItemDetails
                    item={item}
                    navigation={navigation}
                    onChangeSellerList={onChangeSellerList}
                  />
                );
              }}
            />
            <View style={{ padding: 88 }} />
          </ScrollView>
        </>
      ) : (
        <>
          <View style={styles.emptyCartAnimationHolder}>
            <LottieView
              style={styles.lottie1}
              autoPlay
              loop
              source={require("../../assets/animations/emptyCart.json")}
            />

            <Text style={styles.message}>
              {language === "te"
                ? "தயாரிப்பு பட்டியல் காலியாக உள்ளது"
                : language === "hi"
                ? "उत्पाद सूची खाली है"
                : language === "ka"
                ? "ಉತ್ಪನ್ನ ಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ"
                : language === "ta"
                ? "தயாரிப்பு பட்டியல் காலியாக உள்ளது"
                : "Product List is Empty"}
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.viewAddr}
              onPress={() => navigation.navigate("SellerScreen")}
            >
              <View style={{ height: 30, paddingRight: 8 }}>
                <Feather name="plus" size={24} color="#FF6B3C" />
              </View>

              <Text style={styles.add}>Add New Product</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    marginVertical: 16,
  },
  addNewBody: {
    justifyContent: "flex-start",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    height: Dimensions.get("screen").height,
    marginVertical: 16,
    backgroundColor: "white",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    position: "absolute",
    top: Dimensions.get("screen").height * 0.825,
    backgroundColor: "white",
    width: Dimensions.get("screen").width,
    height: 50,
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
  viewAddr: {
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "#FF6B3C",
    backgroundColor: "white",
    zIndex:15
  },
  emptyCartAnimationHolder: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  lottie1: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "-2.5%",
  },
  message: {
    fontFamily: "popins-reg",
    fontSize: 20,
    position: "relative",
    top: "62.5%",
    textAlign: "center",
    zIndex: 7.5,
    color: "#ff5d42",
  },
});

export default SellerItems;
