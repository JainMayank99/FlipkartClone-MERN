import React from "react";
import { View, StyleSheet, TextInput,TouchableOpacity} from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.formField}
        placeholder="What are you looking for ?"
        placeholderTextColor="#7e85a1"
        placeholderTextWeight="bold"
      ></TextInput>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Search");
        }}
        style={{
            position: "absolute",
            right: 10,
            top: 12.5,
          }}
      >
        <Feather
          name="search"
          size={22}
          color="#FF6B3C"
         
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width - 28,
    left: 16,
    marginVertical: 10,
  },
  formField: {
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: "#f7f7f7",
    backgroundColor: "#f7f7f7",
    fontSize: 18,
    fontFamily: "popins-med",
    height: 50,
  },
});
export default SearchBar;
