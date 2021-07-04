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

const SellerItems = ({ itemList, navigation, onChangeSellerList }) => {
  return (
    <View
      style={{
        marginBottom: 150,
        borderBottomWidth: 10,
        borderColor: "#edeeef",
      }}
    >
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
    zIndex: 10,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    position: "absolute",
    top: Dimensions.get("screen").height * 0.815,
    backgroundColor: "white",
    zIndex: 10,
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
  },
});

export default SellerItems;
