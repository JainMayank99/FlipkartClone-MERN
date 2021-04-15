import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Dimensions,
  Alert,
} from "react-native";
import Dash from "react-native-dash";
import { Feather } from "@expo/vector-icons";

import Screen from "./../../components/Screen";
import Header from "../../components/Header";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { getAllAddress, removeAddress } from "./APICall/AddressAPI";

const AddressBook = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [defaultAddress, setDefaultAddress] = useState('');
  // const [defaultAddressDetails, setDefaultAddressDetails] = useState("");
  const [allAddresses, setAllAddressses] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange=(data1,data2) =>{
    setDefaultAddress(JSON.parse(data1))
    setAllAddressses(data2)
  }

  const getAddresses = (user, token) => {
    getAllAddress(user, token)
      .then((res) => {
        if(res.data.defaultAddress.length===0 && res.data.addresses.length===0){
          setDefaultAddress("");
          setAllAddressses([]);
        }
        else
        onChange(res.data.defaultAddress,res.data.addresses)
        
       
      })
      .catch((err) => {
        console.log("get address book  error: " + err);
      });
  };

  const removeAddr = (address) => {
    setLoading(true);
    removeAddress(user, token, address)
      .then((res) => {
        // console.log("hii");
         getAddresses(user, token)
        console.log("Succeffuly removeAddress");
        setLoading(false)
      })
      .catch((err) => {
        console.log("Unable to remove address", err);
      });
  };

  useEffect(() => {
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
  }, [loading]);

  return (
    <View>
      {/* {console.log("Values",defaultAddress,allAddresses)} */}
      <Header />
      <View style={{ marginTop: 105 }}>
        <View style={{ marginHorizontal: 16 }}>
          <Text style={styles.heading}>Default Address :</Text>
          <View style={styles.addressHolder}>
            <View style={{ minWidth: Dimensions.get("screen").width * 0.875 }}>
              <Text style={styles.text1}>{defaultAddress.addressType}</Text>
              <Text style={styles.text}>{defaultAddress.house}</Text>

              <Text style={styles.text}>
                {defaultAddress.city},{defaultAddress.state}
              </Text>

              <Text style={styles.text}>{defaultAddress.postalCode}</Text>
            </View>

            <TouchableOpacity onPress={() => removeAddress()}>
              <Feather name="trash" size={22} color="#FF6B3C" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 10,
            borderColor: "#edeeef",
            paddingVertical: 4,
          }}
        ></View>
        <View style={{ paddingLeft: 16 }}>
          <Text style={styles.heading2}>My Addresses :</Text>
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
                    style={{ minWidth: Dimensions.get("screen").width * 0.875 }}
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
                      removeAddr(item);
                    }}
                  >
                    <Feather name="trash" size={22} color="#FF6B3C" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.view}
          onPress={() => navigation.navigate("AddAddress")}
        >
          <View style={{ height: 30, paddingRight: 8 }}>
            <Feather name="plus" size={24} color="#FF6B3C" />
          </View>

          <Text style={styles.add}>Add Address</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 16 }}>
          <Dash
            dashGap={-1}
            dashLength={7.5}
            dashThickness={1.5}
            dashColor="#edeeef"
            dashStyle={{ borderRadius: 100, overflow: "hidden" }}
            style={{
              width: "100%",
              height: 8,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 8,
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
    paddingHorizontal: 16,
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

export default AddressBook;
