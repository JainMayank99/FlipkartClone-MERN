import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Dash from "react-native-dash";
import { Feather } from "@expo/vector-icons";

import Screen from "./../../components/Screen";
import Header from "../../components/Header";

const AddressBook = () => {
  return (
    <View>
      <Header />
      <View style={{ marginTop: 105, }}>
       
       <View style={{paddingHorizontal:16}}>
       <Text style={styles.heading}>Default Address :</Text>
       <View style={styles.addressHolder}>
          <View>
            <Text style={styles.text1}>HOME</Text>
            <Text style={styles.text}>House No.6,1st floor,2nd street</Text>
            <Text style={styles.text}>Karnataka,India</Text>
            <Text style={styles.text}>560033</Text>
          </View>

         

          <TouchableOpacity>
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
       <View style={{paddingHorizontal:16}}>

        <Text style={styles.heading2}>My Addresses :</Text>
        <View style={styles.addressHolder}>
          <View>
            <Text style={styles.text1}>WORK</Text>
            <Text style={styles.text}>House No.6,1st floor,2nd street</Text>
            <Text style={styles.text}>Karnataka,India</Text>
            <Text style={styles.text}>560033</Text>
          </View>

         

          <TouchableOpacity>
            <Feather name="trash" size={22} color="#FF6B3C" />
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.view}>
          <View style={{ height: 30, paddingRight: 8 }}>
            <Feather name="plus" size={24} color="#FF6B3C" />
          </View>

          <Text style={styles.add}>Add Address</Text>
        </View>
        <View style={{paddingHorizontal:16}}>
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
    paddingTop:10
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
    paddingHorizontal:16
  },
  addressHolder: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical:8
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
  },
  add:{
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "#FF6B3C",
  }
});

export default AddressBook;
