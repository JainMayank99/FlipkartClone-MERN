import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { isAuthenticated } from "../Screens/Auth/AuthAPICalls/authCalls";

const image = {
  uri: require("../assets/catIcons/cart.png"),
};

const width = Dimensions.get("screen").width;

const Sell = ({ navigation }) => {
  const [role, setRole] = useState(0);
  React.useEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res.user) {
          setRole(res.user.role);
        }
      })
      .catch((err) => {
        console.log(" address book screen error: " + err);
      });
  });
  return (
    <View
      style={{
        paddingVertical: 8,
        borderBottomWidth: 10,
        borderColor: "#edeeef",
      }}
    >
      <View style={styles.sellingCard}>
        <View style={styles.textBox}>
          <Text style={styles.text}>Sell your homemade </Text>
          <Text style={styles.text}>items online. </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              role === 1
                ? navigation.navigate("SellerProducts")
                : navigation.navigate("SellerVerification");
            }}
          >
            <Text style={styles.textButton}>
              {role === 0 ? "Start Selling Now" : "My Products"}
            </Text>
            <View style={styles.iconHolder}>
              <Feather
                name="chevron-right"
                size={30}
                style={styles.icon}
                color="#20263e"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.imageHolder}>
            <Image
              source={image.uri}
              style={{
                width: width * 0.26785,
                height: 130,
                borderRadius: 5,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sellingCard: {
    height: 180,
    width: width - 20,
    backgroundColor: "#fde76f",
    marginLeft: 10,
    borderRadius: 7,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
  },
  textButton: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "white",
  },
  textBox: {
    position: "relative",
    top: 30,
    left: 20,
  },
  iconHolder: {
    position: "absolute",
    top: 4,
    left: width / 1.82,
    backgroundColor: "#fde76f",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#242a46",
    padding: 8,
    width: width / 1.5,
    borderRadius: 7.5,
    marginVertical: 20,
  },
  imageHolder: {
    position: "absolute",
    top: -20,
    left: width / 1.6,
    transform: [{ rotate: "-10deg" }],
  },
});
export default Sell;
