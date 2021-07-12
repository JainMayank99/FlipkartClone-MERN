import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "./Icon";

function CategoryPickerItem({ icon, item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FF6B3C",
          }}
        >
          <Image
            source={
              item.name === "dress"
                ? require("../../assets/catIcons/dress.png")
                : item.name === "food"
                ? require("../../assets/catIcons/food.png")
                : item.name === "bag"
                ? require("../../assets/catIcons/bag.png")
                : item.name === "jewellery"
                ? require("../../assets/catIcons/jewellery.png")
                : item.name === "home"
                ? require("../../assets/catIcons/home.png")
                : require("../../assets/catIcons/doctor.png")
            }
            style={{
              height: 24,
              width: 24,
            }}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    fontFamily: "popins-reg",
    fontSize: 12,
    color: "#20263e",
  },
});

export default CategoryPickerItem;
