import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Dash from "react-native-dash";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import Header from "../../components/Header";

import { getUser } from './APICall/ProfileAPI';
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { truncate } from './../../components/Truncate';

const Profile = ({ navigation }) => {

  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(0);

  const fetchUser = (userId, tokenId) => {
    getUser(userId, tokenId)
      .then((res) => {
        setName(truncate(res.data.name,20));
        setPhone(res.data.phone);
        setLoading(false)
      })
      .catch((err) => {
        console.log("User fetch error: " + err);
      });
  };

  React.useEffect(() => {
    setLoading(true)
    navigation.addListener("focus", () => {
      console.log("I am Edit Profile");
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
            fetchUser(res.user._id, res.token);
           
          }
        })
        .catch((err) => {
          console.log("Add address screen error: " + err);
        });
    });
  }, [navigation]);

  const image = {
    uri: require("../../assets/main/profile.webp"),
  };
  const wishlist = {
    uri: require("../../assets/catIcons/wish.png"),
  };
  const address = {
    uri: require("../../assets/catIcons/addressbook.png"),
  };
  const settings = {
    uri: require("../../assets/catIcons/setting.png"),
  };
  const logOut = {
    uri: require("../../assets/catIcons/power.png"),
  };
  const shopping = {
    uri: require("../../assets/catIcons/shopping-bag.png"),
  };
  return (
    <View style={loading===true ? styles.overlay : null}>
    {loading ===true ? (
      <LottieView
        style={styles.lottie}
        autoPlay
        loop={false}
        source={
          require("../../assets/animations/loader.json")
            
        }
      />
    ) : null}
    <View>
      <Header navigation={navigation} />
      <View style={{ padding: 16 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.mail}>Contact : {phone}</Text>
            <TouchableOpacity>
              <Text
                style={styles.edit}
                onPress={(() => navigation.navigate("EditProfile",{ screenName:'Profile' }) )}
              >
                Edit Profile {">"}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.image}
            source={image.uri}
            style={{
              marginVertical: 4,
              width: 100,
              // marginRight: 8,
              height: 100,
              borderRadius: 50,
              resizeMode: "cover",
            }}
          />
        </View>
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
        <Text style={styles.tag1}>User Details</Text>
        <View style={styles.view}>
          <View style={styles.image}>
            <Image
              source={shopping.uri}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
          <Text style={styles.subHeader}>My Orders</Text>
        </View>

        <View style={styles.view}>
          <View style={styles.image}>
            <Image
              source={wishlist.uri}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
          <Text style={styles.subHeader}>My Wishlist</Text>
        </View>

        <View style={styles.view}>
          <View style={styles.image}>
            <Image
              source={address.uri}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Address",{ screenName:'Profile' })}>
            <Text style={styles.subHeader}>Address Book</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <Text style={styles.tag}>Change Password</Text>
          <View style={styles.image}>
            <Image
              source={settings.uri}
              style={{
                width: 25,
                marginRight: 8,
                height: 25,
              }}
            />
          </View>
        </View>
        <View style={styles.view2}>
          <Text style={styles.tag}>Log Out</Text>
          <View style={styles.image}>
            <Image
              source={logOut.uri}
              style={{
                width: 25,
                marginRight: 8,
                height: 25,
              }}
            />
          </View>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header: {
    marginTop: 72,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  view1: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "popins-reg",
    fontSize: 22,
    color: "black",
    paddingVertical: 8,
  },
  mail: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    paddingTop: 5,
  },
  edit: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "#FF6B3C",
  },
  image: {
    height: 30,
    paddingHorizontal: 8,
  },
  subHeader: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "#444d56",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  tag: {
    fontFamily: "popins-reg",
    fontSize: 18,
    color: "black",
    paddingVertical: 6,
  },
  tag1: {
    fontFamily: "popins-reg",
    fontSize: 20,
    color: "black",
    paddingVertical: 6,
  },
  version: {
    fontFamily: "popins-med",
    fontSize: 18,
    color: "#d1d1d1",
    textAlign: "center",
    paddingVertical: 32,
    borderBottomWidth: 7.5,
    borderBottomColor: "#edeeef",
  },
});

export default Profile;
