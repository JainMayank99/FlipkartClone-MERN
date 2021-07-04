import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductReturnPolicy = ({ language }) => {
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
          ? "సులువు 30 రోజులు తిరిగి మరియు మార్పిడి"
          : language === "hi"
          ? "आसान 30 दिन वापसी और विनिमय"
          : language === "ka"
          ? "ಸುಲಭ 30 ದಿನಗಳ ರಿಟರ್ನ್ ಮತ್ತು ವಿನಿಮಯ"
          : language === "ta"
          ? "எளிதாக 30 நாட்கள் திரும்பவும் பரிமாறவும்"
          : "Easy 30 days return and exchange"}
      </Text>

      <Text style={styles.subTitle}>
        {language === "te"
          ? "30 రోజుల్లో తిరిగి రావడానికి లేదా మార్పిడి చేయడానికి ఎంచుకోండి"
          : language === "hi"
          ? "३० दिनों के भीतर वापसी या विनिमय करना चुनें"
          : language === "ka"
          ? "30 ದಿನಗಳಲ್ಲಿ ಮರಳಲು ಅಥವಾ ವಿನಿಮಯ ಮಾಡಿಕೊಳ್ಳಲು ಆಯ್ಕೆಮಾಡಿ"
          : language === "ta"
          ? "30 நாட்களுக்குள் திரும்ப அல்லது பரிமாற தேர்வு செய்யவும்"
          : "Choose to return or exchange within 30 days "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "#1a2228",
  },
  subTitle: {
    fontFamily: "popins-semibold",
    fontSize: 16,
    color: "#444d56",
  },
});
export default ProductReturnPolicy;
