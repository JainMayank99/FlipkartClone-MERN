import React, { useState } from "react";
import StarRating from "react-native-star-rating";
import Screen from "./../../../components/Screen";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { addReview } from "../APICall/OrderAPI";

function StartRatingComponent({route}) {
  const {itemId,user,token}=route.params;
  console.log(user, itemId)
  const [rating, setRating] = useState(2);
  const [text, setText] = useState("");
  const onRatingChange = (rating) => {
    setRating(rating);
  };
  const onSubmit = () => {
    addReview(user,token,itemId,text,rating)
    .then((res) =>{
        console.log("Successfully Added")
    })
    .catch((err) =>{
        console.log("Add review Error",err)
    })
    console.log(text, rating);
  };
  return (
    <Screen>
      <View style={styles.body}>
        <Text style={styles.heading}>Review Product</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Detailed reviews get more focus!"
          multiline={true}
          numberOfLines={8}
          onChangeText={(text) => setText(text)}
          value={text}
          autoCorrect={false}
          blurOnSubmit={true}
          selectionColor={"#FF6B3C"}
        />

        <StarRating
          disabled={false}
          emptyStar={require("../../../assets/catIcons/star-regular.png")}
          fullStar={require("../../../assets/catIcons/star-solid.png")}
          maxStars={5}
          rating={rating}
          selectedStar={(rating) => onRatingChange(rating)}
          fullStarColor={"#FF6B3C"}
          starSize={30}
          animation={"tada"}
        />

        <TouchableOpacity
          onPress={() => onSubmit()}
          style={{
            marginVertical: 60,
          }}
        >
          <View style={styles.button}>
            <Text style={styles.submit}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.version}>App Version : 1.0</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 24,
    paddingVertical: 8,
  },
  heading: {
    fontFamily: "zilla-bold",
    fontSize: 24,
    paddingVertical: 8,
    paddingBottom: 24,
  },
  textInput: {
    height: 120,
    textAlignVertical: "top",
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#FF6B3C",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  submit: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "white",
  },
  version: {
    fontFamily: "zilla-med",
    fontSize: 20,
    color: "#d1d1d1",
    textAlign: "center",
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 7.5,
    borderBottomColor: "#edeeef",
  },
});
export default StartRatingComponent;
