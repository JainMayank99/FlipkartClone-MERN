import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/Ionicons";
import Home from "../Screens/Home/Home";
import Cart from "../Screens/Cart/Cart";
import WishList from "./../Screens/WishList/WishList";
import Orders from "./../Screens/Orders/Orders";
import {
  MainStackNavigator,
  ProfileStackNavigator,
} from "./MainStackNavigator";

const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const image = {
  uri: require("../assets/main/profile.webp"),
};
const image1 = {
  uri: require("../assets/main/profileActive.webp"),
};
const imageW1 = {
  uri: require("../assets/customIcons/wishList.png"),
};
const imageW = {
  uri: require("../assets/customIcons/wishListActive.png"),
};
const imageH1 = {
  uri: require("../assets/customIcons/home.png"),
};
const imageH = {
  uri: require("../assets/customIcons/homeA.png"),
};
const imageO1 = {
  uri: require("../assets/customIcons/order.png"),
};
const imageO = {
  uri: require("../assets/customIcons/orderA.png"),
};

const TabContent = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    tabBarOptions={{
      showLabel: false,
      style: {
        position: "absolute",
        bottom: 7.5,
        left: 16,
        right: 12,
        elevation: 0,
        backgroundColor: "#ffffff",
        height: 70,
        borderRadius: 15,
        ...styles.shadow,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Home",

        tabBarIcon: ({ focused }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 5,
            }}
          >
            <Image
              source={focused ? imageH1.uri : imageH.uri}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
              }}
            />
            <Text
              style={{
                color: focused ? "#00ff7f" : "#FF6B3C",
                fontFamily: "popins-reg",
                marginTop: -1,
                fontSize: 14,
              }}
            >
              Home
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrderStackScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 5,
            }}
          >
            <Image
              source={focused ? imageO1.uri : imageO.uri}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
              }}
            />
            <Text
              style={{
                color: focused ? "#00ff7f" : "#FF6B3C",
                fontFamily: "popins-reg",
                marginTop: -1,
                fontSize: 14,
              }}
            >
              Orders
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Wishlist"
      component={WishList}
      options={{
        tabBarLabel: "Wishlist",

        tabBarIcon: ({ focused }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 5,
            }}
          >
            <Image
              source={focused ? imageW1.uri : imageW.uri}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
              }}
            />
            <Text
              style={{
                color: focused ? "#00ff7f" : "#FF6B3C",
                fontFamily: "popins-reg",
                marginTop: -1,
                fontSize: 14,
              }}
            >
              WishList
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{
        tabBarLabel: "Explore",

        tabBarIcon: ({ focused }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 5,
            }}
          >
            <Image
              source={focused ? image1.uri : image.uri}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
              }}
            />
            <Text
              style={{
                color: focused ? "#00ff7f" : "#FF6B3C",
                fontFamily: "popins-reg",
                fontSize: 14,
                marginTop: -1,
              }}
            >
              Account
            </Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
  initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Orders" component={Orders} />
    <HomeStack.Screen name="Wishlist" component={WishList} />
  </HomeStack.Navigator>
);

const OrderStackScreen = ({ navigation }) => (
  <OrderStack.Navigator
    initialRouteName="Orders"
    screenOptions={{
      headerShown: false,
    }}
  >
    <OrderStack.Screen name="Home" component={Home} />
    <OrderStack.Screen name="Orders" component={Orders} />
    <OrderStack.Screen name="Wishlist" component={WishList} />
  </OrderStack.Navigator>
);

export default TabContent;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3.5,
  },
});
