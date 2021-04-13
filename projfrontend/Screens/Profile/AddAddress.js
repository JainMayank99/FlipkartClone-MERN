import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as Location from "expo-location";
import { Formik } from "formik";
import LottieView from "lottie-react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import * as yup from "yup";

const validationSchema = yup.object().shape({
 house: yup
  .string()
  .required('Please enter your House/Block/Flat No.'),
  city: yup
  .string()
  .required('Please enter your City'),
  state: yup
  .string()
  .required('Please enter your State'),
  pincode: yup
    .string()
    .required('Please enter your Pincode')
    .label("Pincode")
    .min(6, "Enter atleast 6 character")
    .max(6, "Cannot Enter more than 6 character")
    ,
});

const AddAddress = () => {
  const _mapView = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 22.3511148,
    longitude: 78.6677428,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marginBottom, setMarginBottom] = useState(1);
  const [focusHouse, setfocusHouse] = useState(false);
  const [focusLandmark, setfocusLandmark] = useState(false);
  const [focusPincode, setfocusPincode] = useState(false);
  const [focusState, setfocusState] = useState(false);
  const [focusCity, setfocusCity] = useState(false);

  const [loading, setLoading] = useState(false);
  const [addressType, setAddressType] = useState("Home");

  const changeAddressType = () => {
    console.log("Hii");
    if (addressType === "Home") setAddressType("Work");
    else setAddressType("Home");
  };
  const onfocusHouseChange = () => {
    setfocusHouse(true);
  };
  const onBlurHouseChange = () => {
    setfocusHouse(false);
  };

  const onfocusLandmarkChange = () => {
    setfocusLandmark(true);
  };
  const onBlurLandmarkChange = () => {
    setfocusLandmark(false);
  };

  const onfocusCityChange = () => {
    setfocusCity(true);
  };
  const onBlurCityChange = () => {
    setfocusCity(false);
  };

  const onfocusStateChange = () => {
    setfocusState(true);
  };
  const onBlurStateChange = () => {
    setfocusState(false);
  };

  const onfocusPincodeChange = () => {
    setfocusPincode(true);
  };
  const onBlurPincodeChange = () => {
    setfocusPincode(false);
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  const onChangeValue = () => {
    setRegion(region);
    setTimeout(() => setMarginBottom(0));
  };

  const handleUserLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      navigator.geolocation.getCurrentPosition((pos) => {
        _mapView.current.animateToRegion({
          ...region,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setRegion({
          ...region,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        getAddress(pos.coords.latitude, pos.coords.longitude);
      });
    })();
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <>
      <StatusBar hidden />
      <View
        style={{
          height: "40%",
          overflow: "hidden",
          borderRadius: 15,
        }}
      >
        <View style={{ flex: 1 }}>
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
          />
          {/* <Marker
            coordinate={{latitude:region.latitude, longitude:region.longitude}}
            image={require("../../assets/catIcons/pin.png")}
          /> */}
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
        {loading === true ? (
          <View style={styles.overlay}>
            <LottieView
              style={styles.lottie}
              autoPlay
              loop
              source={require("../../assets/animations/loader.json")}
            />

<View style={styles.screen}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View>
                    <Text style={styles.heading}>SELECT DELIVERY ADDRESS</Text>
                    <Formik
                      initialValues={{ house: "", landmark: "",Pincode: "",}}
                      validationSchema={validationSchema}
                      onSubmit={(values, actions) => {
                        setLoading(true);
                        //   apicall(values);
                        Object.assign(values, {addressType: addressType});
                        // values["addressType"]=addressType
                        console.log(values);
                      }}
                    >
                      {(formikProps) => (
                        <React.Fragment>
                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 16,
                            }}
                          >
                            <Text style={styles.label}>
                              HOUSE/BLOCK/FLAT NO *
                            </Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              onFocus={onfocusHouseChange}
                              placeholder="Enter house/flat/block no."
                              autoCorrect={false}
                              style={
                                focusHouse === false
                                  ? styles.textInput
                                  : styles.textInputName
                              }
                              onChangeText={formikProps.handleChange("house")}
                              onBlur={onBlurHouseChange}
                            />
                               <View
                              style={
                                formikProps.errors.house
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                           
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>CITY *</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter your city"
                              onFocus={onfocusCityChange}
                              autoCorrect={false}
                              style={
                                focusCity === false
                                  ? styles.textInput
                                  : styles.textCity
                              }
                              onChangeText={formikProps.handleChange("city")}
                              onBlur={onBlurCityChange}
                            />
                               <View
                              style={
                                formikProps.errors.city
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                           
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>STATE *</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter your state"
                              onFocus={onfocusStateChange}
                              autoCorrect={false}
                              style={
                                focusState === false
                                  ? styles.textInput
                                  : styles.textState
                              }
                              onChangeText={formikProps.handleChange("state")}
                              onBlur={onBlurStateChange}
                            />
                               <View
                              style={
                                formikProps.errors.state
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                           
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>PINCODE *</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter our pincode"
                              onFocus={onfocusPincodeChange}
                              autoCorrect={false}
                              style={
                                focusPincode === false
                                  ? styles.textInput
                                  : styles.textPincode
                              }
                              onChangeText={formikProps.handleChange("pincode")}
                              onBlur={onBlurPincodeChange}
                            />
                            <View
                              style={
                                formikProps.errors.pincode
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                            <Text
                              style={
                                
                                formikProps.errors.pincode
                                  ? styles.errMsg
                                  : null
                              }
                            >
                              {
                                formikProps.errors.pincode}
                            </Text>
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>LANDMARK</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter a landmark"
                              onFocus={onfocusLandmarkChange}
                              autoCorrect={false}
                              style={
                                focusLandmark === false
                                  ? styles.textInput
                                  : styles.textLandmark
                              }
                              onChangeText={formikProps.handleChange(
                                "Landmark"
                              )}
                              onBlur={onBlurLandmarkChange}
                            />
                          </View>
                          <Text style={styles.heading2}>
                            SAVE THIS ADDRESS AS
                          </Text>
                          <View style={styles.addressType}>
                            <TouchableOpacity
                              onPress={changeAddressType}
                              style={
                                addressType === "Home"
                                  ? styles.selectedMiniButton
                                  : styles.miniButton
                              }
                            >
                              <Feather name="home" size={22} color="black" />
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
                              <Feather name="home" size={22} color="black" />
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
                          <TouchableOpacity
                            onPress={formikProps.handleSubmit}
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 16,
                            }}
                          >
                            <View
                              style={
                                formikProps.errors.pincode
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
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          </View>
        ) : (
          <View style={styles.screen}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View>
                    <Text style={styles.heading}>SELECT DELIVERY ADDRESS</Text>
                    <Formik
                      initialValues={{ house: "", landmark: "",Pincode: "",}}
                      validationSchema={validationSchema}
                      onSubmit={(values, actions) => {
                        setLoading(true);
                        //   apicall(values);
                        Object.assign(values, {addressType: addressType});
                        console.log(values);
                      }}
                    >
                      {(formikProps) => (
                        <React.Fragment>
                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 16,
                            }}
                          >
                            <Text style={styles.label}>
                              HOUSE/BLOCK/FLAT NO *
                            </Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              onFocus={onfocusHouseChange}
                              placeholder="Enter house/flat/block no."
                              autoCorrect={false}
                              style={
                                focusHouse === false
                                  ? styles.textInput
                                  : styles.textInputName
                              }
                              onChangeText={formikProps.handleChange("house")}
                              onBlur={onBlurHouseChange}
                            />
                               <View
                              style={
                                formikProps.errors.house
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                           
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>CITY *</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter your city"
                              onFocus={onfocusCityChange}
                              autoCorrect={false}
                              style={
                                focusCity === false
                                  ? styles.textInput
                                  : styles.textCity
                              }
                              onChangeText={formikProps.handleChange("city")}
                              onBlur={onBlurCityChange}
                            />
                               <View
                              style={
                                formikProps.errors.city
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                           
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>STATE *</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter your state"
                              onFocus={onfocusStateChange}
                              autoCorrect={false}
                              style={
                                focusState === false
                                  ? styles.textInput
                                  : styles.textState
                              }
                              onChangeText={formikProps.handleChange("state")}
                              onBlur={onBlurStateChange}
                            />
                               <View
                              style={
                                formikProps.errors.state
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                           
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>PINCODE *</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter our pincode"
                              onFocus={onfocusPincodeChange}
                              autoCorrect={false}
                              style={
                                focusPincode === false
                                  ? styles.textInput
                                  : styles.textPincode
                              }
                              onChangeText={formikProps.handleChange("pincode")}
                              onBlur={onBlurPincodeChange}
                            />
                            <View
                              style={
                                formikProps.errors.pincode
                                  ? styles.redCircle
                                  : styles.greenCircle
                              }
                            ></View>
                            <Text
                              style={
                                
                                formikProps.errors.pincode
                                  ? styles.errMsg
                                  : null
                              }
                            >
                              {
                                formikProps.errors.pincode}
                            </Text>
                          </View>

                          <View
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 4,
                            }}
                          >
                            <Text style={styles.label}>LANDMARK</Text>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholder="Enter a landmark"
                              onFocus={onfocusLandmarkChange}
                              autoCorrect={false}
                              style={
                                focusLandmark === false
                                  ? styles.textInput
                                  : styles.textLandmark
                              }
                              onChangeText={formikProps.handleChange(
                                "Landmark"
                              )}
                              onBlur={onBlurLandmarkChange}
                            />
                          </View>
                          <Text style={styles.heading2}>
                            SAVE THIS ADDRESS AS
                          </Text>
                          <View style={styles.addressType}>
                            <TouchableOpacity
                              onPress={changeAddressType}
                              style={
                                addressType === "Home"
                                  ? styles.selectedMiniButton
                                  : styles.miniButton
                              }
                            >
                              <Feather name="home" size={22} color={addressType === "Home"?"#FF6B3C":"black"}/>
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
                              <Feather name="briefcase" size={22} color={addressType === "Work"?"#FF6B3C":"black"}/>
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
                          <TouchableOpacity
                            onPress={formikProps.handleSubmit}
                            style={{
                              marginHorizontal: 8,
                              marginVertical: 16,
                            }}
                          >
                            <View
                              style={
                                formikProps.errors.pincode
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
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  screen: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
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
    paddingTop: 32,
  },
  heading2: {
    fontFamily: "zilla-semibold",
    fontSize: 18,
    padding: 16,
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
  textLandmark: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: '#FF6B3C',
    borderRadius: 2.5,
  },
  textInputName: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: '#FF6B3C',
    borderRadius: 2.5,
  },
  textCity: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: '#FF6B3C',
    borderRadius: 2.5,
  },
  textState: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: '#FF6B3C',
    borderRadius: 2.5,
  },
  textPincode: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: '#FF6B3C',
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
    borderColor: "#f2f0f0",
    backgroundColor: "#f2f0f0",
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
    borderColor: '#FF6B3C',
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
    color: '#FF6B3C',
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: '#FF6B3C',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  buttonlight: {
    backgroundColor: '#f4c2c2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
},

  button1: {
    backgroundColor: '#FF6B3C',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 12,
  },
  submit: {
    fontFamily: "zilla-reg",
    fontSize: 22,
    color: "white",
  },
  addressType: {
    flex: 1,
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
