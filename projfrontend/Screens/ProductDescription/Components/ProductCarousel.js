import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ProductCarouselItem from "./ProductCarouselItem";
import Icon from "../../../components/Icon";
import Paginator from "../../../components/Paginator";

import { isAuthenticated } from "../../Auth/AuthAPICalls/authCalls";
import { addProductToWishList } from "../../WishList/APICall/WishlistAPI";
import { isProductInWishlist } from "../APICalls/ProductReviewAPI";
import { removeProductFromWishList } from "./../../WishList/APICall/WishlistAPI";

const ProductCarousel = ({
  data,
  navigation,
  item,
  itemId,
  user,
  token,
  loggedIn,
  setLoading
}) => {
  const [dataList, setDataList] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inWishlist, setInWishlist] = useState();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;



  useFocusEffect(
    React.useCallback(() => {
      setDataList(data);
      if (loggedIn !== false) {
        isProductInWishlist(user, itemId, token)
          .then((res) => {
            console.log(inWishlist)
            if (res.data.result === true) setInWishlist(true);
            else setInWishlist(false);
          })
          .catch((err) => {
            console.log("wishlist screen error in carousel: " + err);
          });
      } else {
        setInWishlist(false);
      }
    }, [item])
  );

  const addItemToWishList = () => {
    if (user.length !== 0) {
     setLoading(4)
      addProductToWishList(user, itemId, token)
        .then((res) => {
          setInWishlist(true);
          setTimeout(() => {
            setLoading(0)
          }, 1000);
        })
        .catch((err) => {
          console.log(
            "Error in adding item to wish list from product description",
            err
          );
        });
    } else {
      navigation.navigate("Login");
    }
  };

  const removeItemFromWishlist = () => {
    setLoading(5)
    removeProductFromWishList(user, itemId, token)
      .then((res) => {
        setInWishlist(false);
        setTimeout(() => {
          setLoading(0)
        }, 1000);
      })
      .catch((err) => {
        console.log("Wishlist error", err);
      });
  };

  if (data && data.length) {
    return (
      <View style={styles.container}>
        
        <StatusBar hidden />
        <View style={{ flex: 3 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <ProductCarouselItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            scrollEventThrottle={32}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slideRef}
          />

          <View style={styles.nav}>
            <Icon name="arrow-left" align="left" />
          </View>
          <TouchableOpacity
            style={styles.navend}
            onPress={() => navigation.navigate("Cart")}
          >
            <Icon name="shopping-cart" align="right" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wishlist}
            onPress={() => {
              inWishlist === true
                ? removeItemFromWishlist()
                : addItemToWishList();
            }}
          >
            <Icon
              name={inWishlist === true ? "heart" : "heart-o"}
              align="rightbottom"
            />
			
          </TouchableOpacity>
        </View>
        <Paginator data={data} scrollX={scrollX} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nav: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  wishlist: {
    position: "absolute",
    bottom: 0,
    right: 0,
	
  },
  navend: {
    position: "absolute",
    top: 0,
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
  },
});

export default ProductCarousel;
