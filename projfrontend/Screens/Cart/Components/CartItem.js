import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Image as ExpoImage } from "react-native-expo-image-cache";

import { isAuthenticated } from "../../Auth/AuthAPICalls/authCalls";
import { addProductToWishList } from './../../WishList/APICall/WishlistAPI';
import {
  updateQuantityInCart,
  removeProductFromCart,
  toggleIsSavedForLater,
  getAllCartItemsByUserId,
} from "../APICall/cartAPI";

const CartItem = ({
  item,
  navigation,
  onChangeCartItemList,
  onChangeSavedItemList,
  changeLoading,
}) => {
  // console.log("item", item);
  const [quantity, setQuantity] = useState(item.Quantity);
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
        console.log("isAuthenticated in CartItem", err);
      });
  }, [quantity]);

  const changeQuantity = (newQuantity) => {
    changeLoading(true)
    if (newQuantity <= 0) {
      // Alert.alert("");
    } else {
      setQuantity(newQuantity);
      updateQuantityInCart(user, item.product._id, token, newQuantity);
      getAllCartItemsByUserId(user, token)
        .then((res) => {
          onChangeCartItemList(
            res.data.filter((item) => item.isSavedForLater == false)
          );
		  changeLoading(false)
        })
        .catch((err) => {
          console.log("updateQuantityInCart error", err);
        });
    }
  };

  const removeItemFromCart = () => {
    removeProductFromCart(user, item.product._id, token)
      .then((res) => {
        getAllCartItemsByUserId(user, token)
          .then((res) => {
            onChangeCartItemList(
              res.data.filter((item) => item.isSavedForLater == false)
            );
          })
          .catch((err) => {
            console.log("cart list fetching error: " + err);
          });
      })
      .catch((err) => {
        console.log("updateQuantityInCart error", err);
      });
  };

  const savedForLater = () => {
    toggleIsSavedForLater(user, item.product._id, token)
      .then((res) => {
        getAllCartItemsByUserId(user, token)
          .then((res) => {
            onChangeCartItemList(
              res.data.filter((item) => item.isSavedForLater == false)
            );
            onChangeSavedItemList(
              res.data.filter((item) => item.isSavedForLater == true)
              );
          })
          .catch((err) => {
            console.log("cart list fetching error: " + err);
          });
      })
      .catch((err) => {
        console.log("updateQuantityInCart error", err);
      });
  };

  const addToWishlist = () => {
    addProductToWishList(user, item.product._id, token)
      .then((res) => {
       console.log(res.data)
      })
      .catch((err) => {
        console.log("updateQuantityInCart error", err);
      });
  };

  const image = {
    uri: require("../../../assets/catIcons/like.png"),
  };
  const trash = {
    uri: require("../../../assets/catIcons/trash.png"),
  };
  const image1 = {
    uri: require("../../../assets/catIcons/download.png"),
  };
  const minus = {
    uri: require("../../../assets/catIcons/minus-circle.png"),
  };
  const plus = {
    uri: require("../../../assets/catIcons/plus-circle.png"),
  };
  const width = Dimensions.get("screen").width;

  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: Dimensions.get("screen").width * 0.02041,
      }}
    >
       <TouchableOpacity onPress={() => addToWishlist()} style={styles.like}>
        <Image
          source={image.uri}
          style={{
            width: 22.5,
            marginRight: 8,
            height: 22.5,
          }}
        />
      </TouchableOpacity>
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
                  uri: item.product.image[0].url
                    .slice(0, 48)
                    .concat("t_media_lib_thumb/")
                    .concat(item.product.image[0].url.slice(48)),
                }}
                uri={item.product.image[0].url}
              />
            </TouchableOpacity>
            <View style={styles.discountBox}>
              <Text style={styles.textDiscount}>
                {item.product.discount + " %"}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.textDetails}>{item.product.name}</Text>
            {/* <Text style={styles.tribeDetails}>{item.desc}</Text> */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: 200,
              }}
            >
              {/* <Text style={styles.rating}>
								<Feather name="star" size={22} style={styles.icon} />
								<Text>4.5</Text>
								<Text>/5</Text>
							</Text> */}
              <Text style={styles.price}>
                <Text style={{ fontSize: 22 }}>₹</Text>
                <Text>{item.product.price}</Text>
              </Text>
            </View>
            <View style={styles.quantity}>
              <TouchableOpacity onPress={() => changeQuantity(quantity - 1)}>
                <Image
                  source={minus.uri}
                  style={{
                    width: 22.5,
                    height: 22.5,
                  }}
                />
              </TouchableOpacity>

              <Text style={styles.qText}>{quantity}</Text>
              <TouchableOpacity onPress={() => changeQuantity(quantity + 1)}>
                <Image
                  source={plus.uri}
                  style={{
                    width: 22.5,
                    height: 22.5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            savedForLater();
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
          <Text style={styles.buttonText}>Save For Later</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            removeItemFromCart();
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
  like: {
    position: "absolute",
    top: 20,
    right: -15,
    alignItems: "center",
    width: 80,
    borderRadius: 5,
    padding: 2,
    zIndex:999
  },

  discountBox: {
    position: "absolute",
    bottom: -10,
    left: 12.5,
    alignItems: "center",
    backgroundColor: '#FF6B3C',
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

  quantity: {
    flex: 1,
    flexDirection: "row",
  },
  qText: {
    fontFamily: "popins-bold",
    fontSize: 16,
    color: "#4d4b50",
    paddingHorizontal: 16,
  },
});

export default CartItem;
