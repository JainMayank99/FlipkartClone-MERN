import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home/Home";
import Cart from "../Screens/Cart/Cart";
import WishList from "../Screens/WishList/WishList";
import Orders from './../Screens/Orders/Orders';
import AddressBook from "../Screens/Profile/AddressBook";
import Profile from "../Screens/Profile/Profile";
import AddAddress from "../Screens/Profile/AddAddress";
import ProductDescScreen from "../Screens/ProductDescription/ProductDescription";
import EditProfile from './../Screens/Profile/EditProfile';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Cart" component={Cart} /> */}
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="ProductDescription" component={ProductDescScreen} />
    </Stack.Navigator>
  );
};
const OrderStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Order"
        screenOptions={{
          headerShown: false,
        }}
      >
       
        <Stack.Screen name="Orders" component={Orders} />
        
      </Stack.Navigator>
    );
  };

  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
        }}
      >
       <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Address" component={AddressBook} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        {/* <Stack.Screen name="AddAddress" component={AddAddress} /> */}
        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Profile" component={Profile} /> */}
       


      </Stack.Navigator>
    );
  };

export { MainStackNavigator,OrderStackNavigator,ProfileStackNavigator};
