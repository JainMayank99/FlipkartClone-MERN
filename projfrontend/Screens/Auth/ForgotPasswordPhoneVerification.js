import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  processColor,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import {
  REACT_FIREBASE_APIKEY,
  REACT_FIREBASE_AUTHDOMAIN,
  REACT_FIREBASE_PROJECTID,
  REACT_FIREBASE_STORAGEBUCKET,
  REACT_FIREBASE_MESSAGINGSENDERID,
  REACT_FIREBASE_APPID,
  REACT_FIREBASE_MEASUREMENTID,
} from "@env";

const firebaseConfig = {
  apiKey: REACT_FIREBASE_APIKEY,
  authDomain: REACT_FIREBASE_AUTHDOMAIN,
  projectId: REACT_FIREBASE_PROJECTID,
  storageBucket: REACT_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_FIREBASE_APPID,
  measurementId: REACT_FIREBASE_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

const PhoneVerificationScreen = ({ navigation }) => {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  const attemptInvisibleVerification = false;

  return (
    <View
      style={{
        padding: 20,
        marginVertical: 50,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.heading}>Sign Up</Text>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={attemptInvisibleVerification}
            title="Prove you are human!"
            cancelLabel="Close"
            style={{ fontFamily: "zilla-med" }}
          />
          <Text style={styles.phone}>Enter phone number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="+91 "
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />

          <TouchableOpacity
            disabled={!phoneNumber}
            onPress={async () => {
              try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  "+91" + phoneNumber,
                  recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                showMessage({
                  text: "Verification code has been sent to your phone.",
                });
              } catch (err) {
                showMessage({
                  text: `Error: ${err.message}`,
                  color: "red",
                });
              }
            }}
            style={{
              marginVertical: 10,
            }}
          >
            <View style={styles.button}>
              <Text style={styles.submit}>Send Verification Code</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.phone}>Enter Verification code</Text>
          <TextInput
            style={styles.textInput}
            editable={!!verificationId}
            placeholder="Enter the OTP"
            onChangeText={setVerificationCode}
          />

          <TouchableOpacity
            disabled={!verificationId}
            onPress={async () => {
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                await firebase.auth().signInWithCredential(credential);
                showMessage({
                  text: "Phone authentication successful 👍",
                });
                navigation.push("ForgotPassword", {
                  phoneNumber: phoneNumber,
                });
              } catch (err) {
                showMessage({
                  text: `Error: ${err.message}`,
                  color: "red",
                });
              }
            }}
            style={{
              marginVertical: 10,
            }}
          >
            <View style={styles.button}>
              <Text style={styles.submit}>Confirm Verification Code</Text>
            </View>
          </TouchableOpacity>

          {message ? (
            <TouchableOpacity
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 0xffffffee,
                  justifyContent: "center",
                  height: Dimensions.get("window").height * 0.75,
                },
              ]}
              onPress={() => showMessage(undefined)}
            >
              <Text
                style={{
                  color: message.color || "blue",
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "zilla-med",
                }}
              >
                {message.text}
              </Text>
            </TouchableOpacity>
          ) : undefined}
          {attemptInvisibleVerification && (
            <FirebaseRecaptchaBanner
              textStyle={styles.captchaText}
              linkStyle={{ fontWeight: "bold" }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: "zilla-bold",
    fontSize: 28,
    paddingVertical: 16,
  },
  phone: {
    fontFamily: "zilla-bold",
    fontSize: 24,
    paddingVertical: 8,
  },
  textInput: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
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
  captchaText: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    opacity: 1,
  },
});

export default ForgotPasswordPhoneVerificationScreen;
