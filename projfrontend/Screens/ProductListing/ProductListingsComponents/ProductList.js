import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import LottieView from "lottie-react-native";

import SelectSort from "./SelectSort";
import ProductDetails from "./ProductDetails";

const ProductList = ({ data, query, navigation }) => {
  const refRBSheet = useRef();
  const height = Dimensions.get("screen").height;
  const [sortBy, setSortBy] = useState("");

  const onClickSortBy = (key) => {
    setSortBy(key);
    console.log(key);
    data.sort((a, b) => {
      if (key === "1") {
        return b.avgRating - a.avgRating;
      }
      if (key === "2") {
        return a.price - b.price;
      }

      if (key === "3") {
        return b.price - a.price;
      }

      if (key === "4") {
        return Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
      }
    });
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {});
  }, [navigation]);

  return (
    <View
      style={{
        paddingBottom: 207.5,
      }}
    >
      <View style={styles.body}>
        <Text style={styles.text}>Search Results</Text>

        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={styles.slider}
        >
          <Feather name="sliders" size={22} color="#FF6B3C" />
        </TouchableOpacity>
      </View>
      <RBSheet
        height={225}
        animation={"fade"}
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(240, 245, 241,0.45)",
            alignItems: "center",
            justifyContent: "center",
          },
          draggableIcon: {
            backgroundColor: "#FF6B3C",
          },
        }}
      >
        <View style={styles.bottomTab}>
          <Text style={styles.heading}>Sort By :</Text>
        </View>
        <SelectSort
          onPress={() => refRBSheet.current.open()}
          onClickSortBy={onClickSortBy}
          sortBy={sortBy}
        />
      </RBSheet>

      {data.length === 0 && query.length > 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height * 0.6,
          }}
        >
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require("../../../assets/animations/noResult.json")}
          />
        </View>
      ) : data.length === 0 && query.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height * 0.6,
          }}
        >
          <Text style={styles.errorText}>Start Searching !</Text>
        </View>
      ) : null}
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <ProductDetails item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    marginBottom: 16,
  },
  text: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "#20263e",
    paddingVertical: 10,
    marginLeft: 3,
  },
  errorText: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "#20263e",
    paddingVertical: 10,
  },
  view: {
    fontFamily: "popins-med",
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
  overlay: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
});

export default ProductList;
