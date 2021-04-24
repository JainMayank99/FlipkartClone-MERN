import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const image1 = {
    uri: require("../assets/main/profile.webp"),
  };

  return (
    <View style={styles.body}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={image1.uri} size={75} />
              <View style={{ marginLeft: 15, flexDirection: "column",justifyContent: "center"}}>
                <Text style={styles.title}>Rajender Singh</Text>
                <Text style={styles.caption}>8073734256</Text>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="home" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>HOME</Text>}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="user" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>MY ACCOUNT</Text>}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="shopping-bag" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>MY ORDERS</Text>}
              onPress={() => {
                props.navigation.navigate("Orders");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="heart" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>MY WISHLIST</Text>}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="shopping-cart" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>MY CART</Text>}
              onPress={() => {
                props.navigation.navigate("Cart");
              }}
              style={styles.text}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.midDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="zap" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>BECOME A SELLER</Text>}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
              style={styles.text}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
      <DrawerItem
              icon={({ color, size }) => (
                <Feather name="log-out" size={20} color="#FF6B3C" />
              )}
              label={() => <Text style={styles.text}>SIGN OUT</Text>}
              onPress={() => {
                props.navigation.navigate("Orders");
              }}
            />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 48,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    fontFamily: "popins-reg",
  },
  drawerContent: {
    flex: 1,
    borderRadius: 24,
  },
  userInfoSection: {
    paddingLeft: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontFamily: "popins-med",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "popins-reg",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    fontFamily: "popins-med",
    borderBottomWidth: 1.5,
    borderBottomColor: "#edeeef",
  },
  midDrawerSection: {
    fontFamily: "popins-med",
    borderBottomWidth: 1.5,
    borderBottomColor: "#edeeef",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderColor: "#edeeef",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
