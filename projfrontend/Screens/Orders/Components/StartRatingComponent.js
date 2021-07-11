import React, { useState } from "react";
import StarRating from "react-native-star-rating";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

import {
  addReviewAndRating,
  getReviewAndRating,
  updateReviewAndRating,
} from "../APICall/OrderAPI";
import BackButtonHeader from "../../../components/BackButtonHeader";

function StartRatingComponent({ route, navigation }) {
  const { itemId, user, token, language } = route.params;
  const [rating, setRating] = useState(2);
  const [text, setText] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [loading, setLoading] = useState(0);
  const [update, setUpdate] = useState();

  const onRatingChange = (rating) => {
    setRating(rating);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(1);
      getReviewAndRating(user, token, itemId)
        .then((res) => {
          setRating(res.data.starCount);
          setText(res.data.reviewText);
          setReviewId(res.data._id);
          if (res.data.reviewText.length === 0 || res.data.starCount === "")
            setUpdate(false);
          else setUpdate(true);
          setLoading(0);
        })
        .catch((err) => {
          console.log("Add review Error", err);
        });
    }, [itemId])
  );

  const pushToPreviousScreen = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    if (update !== true) {
      setLoading(1);
      addReviewAndRating(user, token, itemId, text, rating)
        .then((res) => {
          setLoading(2);
          setTimeout(() => {
            pushToPreviousScreen();
            setLoading(0);
          }, 2000);
        })
        .catch((err) => {
          console.log("Add review Error", err);
          setLoading(3);
        });
    } else {
      setLoading(1);
      updateReviewAndRating(user, token, reviewId, text, rating)
        .then((res) => {
          console.log("Successfully Updated");
          setLoading(2);
          setTimeout(() => {
            pushToPreviousScreen();
            setLoading(0);
          }, 2000);
        })
        .catch((err) => {
          console.log("Update review Error", err);
          setLoading(3);
        });
    }

    console.log(text, rating);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        minHeight: Dimensions.get("screen").height,
      }}
    >
      <View
        style={loading !== 0 ? styles.overlay : { backgroundColor: "white" }}
      >
        {loading !== 0 ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop={false}
            source={
              loading === 1
                ? require("../../../assets/animations/loader.json")
                : loading === 2
                ? require("../../../assets/animations/success.json")
                : require("../../../assets/animations/error.json")
            }
          />
        ) : null}

        <BackButtonHeader screenName='Orders' navigation={navigation}/>
        <View style={styles.body}>
          <Text style={styles.heading}>
            {language === "te"
              ? "ఉత్పత్తిని సమీక్షించండి"
              : language === "hi"
              ? "उत्पाद की समीक्षा करें"
              : language === "ka"
              ? "ಉತ್ಪನ್ನವನ್ನು ಪರಿಶೀಲಿಸಿ"
              : language === "ta"
              ? "தயாரிப்பு மதிப்பாய்வு"
              : "Review Product"}
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Detailed reviews get more focus!"
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => setText(text)}
            value={text}
            autoCorrect={false}
            blurOnSubmit={true}
            selectionColor={"#ff5d42"}
          />

          <StarRating
            disabled={false}
            emptyStar={require("../../../assets/catIcons/star-regular.png")}
            fullStar={require("../../../assets/catIcons/star-solid.png")}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => onRatingChange(rating)}
            fullStarColor={"#ff5d42"}
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
              <Text style={styles.submit}>
                {update !== true
                  ? language === "te"
                    ? "సమీక్షను జోడించండి"
                    : language === "hi"
                    ? "समीक्षा जोड़ें"
                    : language === "ka"
                    ? "ವಿಮರ್ಶೆಯನ್ನು ಸೇರಿಸಿ"
                    : language === "ta"
                    ? "மதிப்பாய்வைச் சேர்"
                    : "Add Review"
                  : language === "te"
                  ? "నవీకరణ సమీక్ష"
                  : language === "hi"
                  ? "अद्यतन समीक्षा"
                  : language === "ka"
                  ? "ವಿಮರ್ಶೆಯನ್ನು ನವೀಕರಿಸಿ"
                  : language === "ta"
                  ? "மதிப்பாய்வைப் புதுப்பிக்கவும்"
                  : "Update Review"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.version}>App Version : 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.75)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  body: {
    padding: 24,
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  heading: {
    fontFamily: "zilla-med",
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
    backgroundColor: "#ff5d42",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
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
