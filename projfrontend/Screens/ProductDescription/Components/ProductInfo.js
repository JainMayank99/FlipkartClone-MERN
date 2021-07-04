import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductInfo = ({ description,language }) => {
  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 8,
        borderColor: "#edeeef",
      }}
    >
      <Text style={styles.title}>
        {language === "te"
          ? "விளக்கம்"
          : language === "hi"
          ? "विवरण"
          : language === "ka"
          ? "ವಿವರಣೆ"
          : language === "ta"
          ? "விளக்கம்"
          : "Description"}
      </Text>

      <Text style={styles.subTitle}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#1a2228",
  },
  subTitle: {
    fontFamily: "popins-semibold",
    fontSize: 16,
    color: "#444d56",
    textAlign: "justify",
  },
});
export default ProductInfo;
