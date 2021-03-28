import React, { useState, useRef, useEffect } from "react";
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
import LottieView from "lottie-react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import SelectSort from "../SelectSort";
import ProductDetails from "./ProductDetails";

const ProductList = ({ data, query }) => {
  const refRBSheet = useRef();
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  const [sortBy, setSortBy] = useState("");
  const image = {
    uri: require("../../assets/animations/notFound.gif"),
  };
  const compare = (a, b, key) => {
    if (sortBy === "2") return b.cost - a.cost;

    if (sortBy === "3") {
      return a.cost - b.cost;
    }
  };
  const onClickSortBy = (key) => {
    setSortBy(key);
    data.sort(compare);
  };

  return (
    <View
      style={{
        paddingBottom: 207.5,
      }}
    >
      {console.log(query, query.length)}
      <View style={styles.body}>
        <Text style={styles.text}>Search Results</Text>

        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={styles.slider}
        >
          <Feather name="sliders" size={22} color="#FC8019" />
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
            backgroundColor: "#FC8019",
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
          <Image
            source={image.uri}
            style={{
              width: width * 0.75,
              marginRight: 8,
              height: height * 0.5,
            }}
          />
          <Text style={styles.errorText}>No Result Found !</Text>
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
        renderItem={({ item }) => {
          return <ProductDetails item={item} />;
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
    fontFamily: "zilla-med",
    fontSize: 24,
    color: "#20263e",
    paddingVertical: 10,
    marginLeft: 3,
  },
  errorText:{
    fontFamily: "zilla-med",
    fontSize: 24,
    color: "#20263e",
    paddingVertical: 10,
   
  },
  view: {
    fontFamily: "zilla-med",
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
    fontFamily: "zilla-med",
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
