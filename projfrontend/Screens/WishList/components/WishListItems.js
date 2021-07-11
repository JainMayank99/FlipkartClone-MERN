import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";

import WishListItemDetails from "./WishListItemDetails";

const WishListItems = ({
  itemList,
  navigation,
  onChangeWishlist,
  changeLoading,
  language
}) => {
  return (
    <View
      style={{
        marginBottom: 175,
        maxHeight:Dimensions.get("screen").height*0.7,
      }}
    >
      <View style={styles.body}>
        <Text style={styles.text}>  {language === "te"
                    ? "కోరికల జాబితా"
                    : language === "hi"
                    ? "इच्छा-सूची"
                    : language === "ka"
                    ? "ಬಯಕೆಪಟ್ಟಿ"
                    : language === "ta"
                    ? "விருப்பப்பட்டியல்"
                    : "Wishlist"}</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <FlatList
          data={itemList}
          extraData={itemList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <WishListItemDetails
                item={item}
                navigation={navigation}
                onChangeWishlist={onChangeWishlist}
                changeLoading={changeLoading}
                language={language}
              />
            );
          }}
        />
        <View style={{ padding: 88 }}></View>
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
    marginBottom: 16,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    marginLeft: -8,
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
});

export default WishListItems;
