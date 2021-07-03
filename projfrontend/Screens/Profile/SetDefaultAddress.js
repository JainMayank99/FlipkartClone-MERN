import React, {useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { changeDefaultAddress, getAllAddress} from "./APICall/AddressAPI";
import BackButtonHeader from "../../components/BackButtonHeader";

const SetDefaultAddress = ({ navigation, route }) => {
  const { screenName } = route.params;
  const [defaultAddress, setDefaultAddress] = useState("");
  const [allAddresses, setAllAddressses] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [defaultAddressTester,setDefaultAddressTester] = useState()

  const onChange = (data1, data2) => {
    setDefaultAddressTester(data1)
    setDefaultAddress(JSON.parse(data1));
    setAllAddressses(data2);
  };

  const getAddresses = (user, token) => {
    setLoading(true);
    getAllAddress(user, token)
      .then((res) => {
        if (
          res.data.defaultAddress.length === 0 &&
          res.data.addresses.length === 0
        ) {
          setDefaultAddress("");
          setAllAddressses([]);
        } else {
          onChange(res.data.defaultAddress, res.data.addresses);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("get address book  error: " + err);
      });
  };

  const changeDefault = (user,token,addr)=>{
    setLoading(true);
    changeDefaultAddress(user,token,addr)
    .then((res)=>{
      getAllAddress(user, token)
      .then((res) => {
        if (
          res.data.defaultAddress.length === 0 &&
          res.data.addresses.length === 0
        ) {
          setDefaultAddress("");
          setAllAddressses([]);
        } else {
          onChange(res.data.defaultAddress, res.data.addresses);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("get address book  error: " + err);
      });
      setLoading(false);
    })
    .catch((err) => {
      console.log("get address book  error: " + err);
    });
  }

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
            getAddresses(res.user._id, res.token);
          }
        })
        .catch((err) => {
          console.log(" address book screen error: " + err);
        });
    });
  }, [navigation]);

  return (
    <View
      style={loading === true ? styles.overlay : { backgroundColor: "white" }}
    >
      {loading === true ? (
        <LottieView
          style={styles.lottie}
          autoPlay
          loop={false}
          source={require("../../assets/animations/loader.json")}
        />
      ) : null}
      <View
        style={{
          backgroundColor: "white",
          height: Dimensions.get("screen").height,
        }}
      >
        <BackButtonHeader screenName={screenName} navigation={navigation} />
        <View style={{ marginTop: 32 }}>
          <View
            style={{
             
              paddingVertical: 4,
            }}
          ></View>
          <View style={{ paddingLeft: 16 }}>
            <Text style={styles.heading2}>Select Default Addresses :</Text>
            <FlatList
              data={allAddresses}
              extraData={allAddresses}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                let addr = JSON.parse(item);
                return (
                  <View style={styles.addressHolder}>
                    <View
                      style={{
                        minWidth: Dimensions.get("screen").width * 0.875,
                      }}
                    >
                      <Text style={styles.text1}>{addr.addressType}</Text>
                      <Text style={styles.text}>{addr.house}</Text>
                      <Text style={styles.text}>
                        {addr.city},{addr.state}
                      </Text>
                      <Text style={styles.text}>{addr.postalCode}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        changeDefault(user, token,item)
                      }}
                    >
                      <Feather name={defaultAddressTester===item?"disc": "circle"} size={22} color="#FF6B3C" />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 8,
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
  notFound: {
    position: "relative",
    height: "100%",
    width: Dimensions.get("screen").width,
  },
  globe: {
    position: "absolute",
    top: "-10%",
    backgroundColor: "rgba(255,255,255,0)",
    height: "100%",
    width: "100%",
  },
  buttonHolder: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(255,255,255,0)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  notFoundText: {
    color: "#FF6B3C",
    fontFamily: "popins-med",
    fontSize: 20,
  },
  heading: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "black",
  },
  heading2: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "black",
    paddingTop: 10,
  },
  subHeading: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    paddingVertical: 6,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  addressHolder: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 8,
    maxWidth: Dimensions.get("screen").width * 0.875,
  },
  text: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
  },
  text1: {
    fontFamily: "popins-med",
    fontSize: 18,
    color: "#FF6B3C",
    textTransform: "uppercase",
  },
  add: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "#FF6B3C",
  },
});

export default SetDefaultAddress;
