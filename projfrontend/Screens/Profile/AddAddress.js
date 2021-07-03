import React, { useState, useEffect, useRef } from "react";
import { useFormikContext, Formik } from "formik";

import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import * as yup from "yup";
import { addAddress } from "./APICall/AddressAPI";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

const validationSchema = yup.object().shape({
  house: yup.string().required("Please enter your House/Block/Flat No."),
});

const AddAddress = ({ navigation }) => {
  const _mapView = useRef(null);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 22.3511148,
    longitude: 108.6677428,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marginBottom, setMarginBottom] = useState(1);

  const [focusHouse, setfocusHouse] = useState(false);

  const [loading, setLoading] = useState(0);
  const [mapLoading, setMapLoading] = useState(false);
  const [addressType, setAddressType] = useState("Home");
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      console.log("I am AdressAdder");
      setLoading(0);
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
          }
        })
        .catch((err) => {
          console.log("Add address screen error: " + err);
        });
      handleUserLocation();
    });
  }, [navigation]);

  const pushToHome = () => {
    navigation.goBack();
  };

  const onSub = (val) => {
    let addressInfo = JSON.stringify(val) + "";
    setLoading(1);
    addAddress(user, token, addressInfo)
      .then((res) => {
        setLoading(2);
        val.house = "";
        setTimeout(() => {
          pushToHome();
        }, 3000);
      })
      .catch((err) => {
        setLoading(3);
        console.log(" Added Address screen error", err);
      });
  };

  const changeAddressType = () => {
    // console.log("Hii");
    if (addressType === "Home") setAddressType("Work");
    else setAddressType("Home");
  };
  const onfocusHouseChange = () => {
    setfocusHouse(true);
  };
  const onBlurHouseChange = () => {
    setfocusHouse(false);
  };

  const onChangeValue = () => {
    setRegion(region);
    setTimeout(() => setMarginBottom(0));
  };

  const getAddress = async (latitude, longitude) => {
    console.log(latitude, longitude);
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    for (let item of response) {
      let name = item.name;
      let postalCode = item.postalCode;
      let city = item.city;
      let state = item.region;

      setName(name);
      setCity(city);
      setState(state);
      setPostalCode(postalCode);
    }
  };

  const handleUserLocation = () => {
    (async () => {
      setMapLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setMapLoading(false);
      _mapView.current.animateToRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      getAddress(location.coords.latitude, location.coords.longitude);
    })();
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const mapStyle = [];
  return (
    <>
      <StatusBar hidden />
      <View
        style={
          loading !== 0 || mapLoading === true
            ? styles.overlay
            : { flex: 1, backgroundColor: "white" }
        }
      >
        {loading !== 0 || mapLoading === true ? (
          <LottieView
            style={styles.lottie}
            autoPlay
            loop={false}
            source={
              loading === 1
                ? require("../../assets/animations/loader.json")
                : loading === 2
                ? require("../../assets/animations/success.json")
                : loading === 3
                ? require("../../assets/animations/error.json")
                : require("../../assets/animations/globe.json")
            }
          />
        ) : null}
        <View
          style={{
            height: "60%",
            overflow: "hidden",
            borderRadius: 25,
          }}
        >
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <MapView
              ref={_mapView}
              showsUserLocation={true}
              showsMyLocationButton={true}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              style={{
                flex: 1,
                marginBottom: marginBottom,
                zIndex: -1,
              }}
              initialRegion={region}
              onRegionChangeComplete={onChangeValue}
              customMapStyle={mapStyle}
            />

            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -24,
                marginTop: -48,
                zIndex: 10,
              }}
            >
              <Image
                style={{ height: 48, width: 48 }}
                source={require("../../assets/catIcons/pin.png")}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.screen}>
            <>
              <Text style={styles.heading}>SELECT DELIVERY ADDRESS</Text>
              <Formik
                initialValues={{ house: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  setLoading(true);
                  Object.assign(values, { addressType: addressType });
                  Object.assign(values, { city: city });
                  Object.assign(values, { state: state });
                  Object.assign(values, { postalCode: postalCode });
                  Object.assign(values, { name: name });
                  onSub(values);
                }}
              >
                {(formikProps) => (
                  <React.Fragment>
                    <View
                      style={{
                        marginHorizontal: 8,
                        marginVertical: 8,
                      }}
                    >
                      <Text style={styles.label}>HOUSE NO & STREET NAME*</Text>
                      <TextInput
                        underlineColorAndroid="transparent"
                        onFocus={onfocusHouseChange}
                        placeholder="Enter house no & street name"
                        autoCorrect={false}
                        style={
                          focusHouse === false
                            ? styles.textInput
                            : styles.textInputName
                        }
                        onChangeText={formikProps.handleChange("house")}
                        onBlur={onBlurHouseChange}
                        value={formikProps.values.house}
                      />
                      <View
                        style={
                          formikProps.errors.house
                            ? styles.redCircle
                            : styles.greenCircle
                        }
                      ></View>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        bottom: 10,
                        right: 8,
                        left: 16,
                      }}
                      onPress={formikProps.handleSubmit}
                    >
                      <View
                        style={
                          formikProps.errors.house
                            ? styles.buttonlight
                            : styles.button
                        }
                      >
                        <Text style={styles.submit}>Add Address</Text>
                      </View>
                    </TouchableOpacity>
                  </React.Fragment>
                )}
              </Formik>
            </>
            <Text style={styles.heading2}>SAVE THIS ADDRESS AS</Text>
            <View>
              <View style={styles.addressType}>
                <TouchableOpacity
                  onPress={changeAddressType}
                  style={
                    addressType === "Home"
                      ? styles.selectedMiniButton
                      : styles.miniButton
                  }
                >
                  <Feather
                    name="home"
                    size={22}
                    color={addressType === "Home" ? "#FF6B3C" : "black"}
                  />
                  <Text
                    style={
                      addressType === "Home"
                        ? styles.selectedMiniText
                        : styles.miniText
                    }
                  >
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={changeAddressType}
                  style={
                    addressType === "Work"
                      ? styles.selectedMiniButton
                      : styles.miniButton
                  }
                >
                  <Feather
                    name="briefcase"
                    size={22}
                    color={addressType === "Work" ? "#FF6B3C" : "black"}
                  />
                  <Text
                    style={
                      addressType === "Work"
                        ? styles.selectedMiniText
                        : styles.miniText
                    }
                  >
                    Work
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  screen: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 24,
    backgroundColor: "white",
  },
  overlay: {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  lottie: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  heading: {
    fontFamily: "zilla-semibold",
    fontSize: 20,
  },
  heading2: {
    fontFamily: "zilla-semibold",
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: "zilla-semibold",
    fontSize: 16,
    marginTop: 4,
    letterSpacing: 0.75,
  },
  textInput: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#bdbdbd",
    borderRadius: 2.5,
    position: "relative",
  },

  textInputName: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#FF6B3C",
    borderRadius: 2.5,
  },

  miniButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "black",
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  selectedMiniButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "#FF6B3C",
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  miniText: {
    fontFamily: "zilla-med",
    fontSize: 20,
    color: "black",
    paddingHorizontal: 4,
  },
  selectedMiniText: {
    fontFamily: "zilla-med",
    fontSize: 20,
    color: "#FF6B3C",
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: "#FF6B3C",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
  },
  buttonlight: {
    backgroundColor: "#f4c2c2",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
  },

  button1: {
    backgroundColor: "#FF6B3C",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 12,
  },
  submit: {
    fontFamily: "zilla-med",
    fontSize: 22,
    color: "white",
  },
  addressType: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 8,
    marginBottom: 24,
  },
  errMsg: {
    fontFamily: "zilla-reg",
    fontSize: 16,
    color: "red",
    paddingVertical: 4,
    height: 24,
  },
  greenCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#90EE90",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
  redCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#f94d00",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
});
export default AddAddress;
