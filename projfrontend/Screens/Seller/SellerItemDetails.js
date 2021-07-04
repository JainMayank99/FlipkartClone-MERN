import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image as ExpoImage } from "react-native-expo-image-cache";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";


import { removeSellerProduct,getSellerProducts } from "./SellerAPI/sellerAPI";
import { truncate } from './../../components/Truncate';

const SellerItemDetails = ({ item, navigation, onChangeSellerList }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [product, setProduct] = useState(item.product);

  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        setUser(res.user._id);
        setToken(res.token);
      })
      .catch((err) => {
        console.log("isAuthenticated in SellerList", err);
      });
  }, []);

  const removeItemFromSellerList = () => {
    console.log("removeItemFromSellerList",item._id);
    removeSellerProduct(user, token ,item._id)
      .then((res) => {
        getSellerProducts(user,token)
          .then((res) => {
            onChangeSellerList(res.data);
          })
          .catch((err) => {
            console.log("SellerList fetching error: " + err);
          });
      })
      .catch((err) => {
        console.log("Remove Product error", err);
      });
  };

  const updateProduct = (item) => {
   navigation.navigate('SellerUpdateScreen',{item:item})
  };

  const width = Dimensions.get("screen").width;
  const trash = {
    uri: require("../../assets/catIcons/trash.png"),
  };
  const image1 = {
    uri: require("../../assets/catIcons/upload.png"),
  };
  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: Dimensions.get("screen").width * 0.02041,
        borderColor: "#edeeef",
        borderRadius: 2,
      }}
    >
      <TouchableWithoutFeedback>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              marginLeft: Dimensions.get("screen").width * 0.02041,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductDescription", {
                  item: product,
                });
              }}
            >
              <ExpoImage
                style={{
                  width: width * 0.26785,
                  height: 130,
                  borderRadius: 5,
                  resizeMode: "cover",
                }}
                preview={{
                  uri: item.image[0].url
                    .slice(0, 48)
                    .concat("t_media_lib_thumb/")
                    .concat(item.image[0].url.slice(48)),
                }}
                uri={item.image[0].url}
              />
            </TouchableOpacity>
            <View style={styles.discountBox}>
              <Text style={styles.textDiscount}>{item.discount + " %"} </Text>
            </View>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.textDetails}>{truncate(item.name, 20)}</Text>
            <Text style={styles.tribeDetails}>{item.description}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: 200,
              }}
            >
              <Text style={styles.rating}>
                <Feather name="star" size={22} style={styles.icon} />
                <Text>{item.avgRating}</Text>
                <Text>/5</Text>
              </Text>
              <Text style={styles.price}>
                <Text style={{ fontSize: 22 }}>₹</Text>
                <Text>{item.price}</Text>
              </Text>
            </View>
            <Text style={styles.price}>
              Remaining stocks : {item.stock}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateProduct(item);
          }}
        >
          <Image
            source={image1.uri}
            style={{
              width: 22.5,
              marginRight: 8,
              height: 22.5,
            }}
          />
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            removeItemFromSellerList();
          }}
        >
          <Image
            source={trash.uri}
            style={{
              width: 22.5,
              marginRight: 8,
              height: 22.5,
            }}
          />
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "#20263e",
    paddingTop: 10,
    position: "absolute",
    right: Dimensions.get("screen").width * 0.10714,
  },
  trash: {
    position: "absolute",
    top: 20,
    right: -15,
    alignItems: "center",
    width: 80,
    borderRadius: 5,
    padding: 2,
  },

  discountBox: {
    position: "absolute",
    bottom: -10,
    left: 12.5,
    alignItems: "center",
    backgroundColor: "#FF6B3C",
    width: 80,
    borderRadius: 5,
    padding: 2,
  },
  textDiscount: {
    fontFamily: "popins-bold",
    fontSize: 14,
    color: "white",
  },
  detailsBox: {
    padding: 4,
    marginLeft: 24,
    width: 200,
  },
  textDetails: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "black",
    paddingVertical: 2,
  },
  tribeDetails: {
    fontFamily: "popins-semibold",
    fontSize: 17,
    color: "#4d4b50",
    paddingVertical: 2,
  },
  rating: {
    fontFamily: "popins-semibold",
    fontSize: 16,
    color: "#4d4b50",
    paddingVertical: 4,
  },
  price: {
    fontFamily: "popins-semibold",
    fontSize: 16,
    color: "#4d4b50",
  },
  nav: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 24,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#edeeef",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontFamily: "popins-med",
    fontSize: 16,
  },
});

export default SellerItemDetails;
