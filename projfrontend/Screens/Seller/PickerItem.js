import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
// import AppText from "./AppText";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 65,
        width: 65,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3,
      }}
    >
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    fontFamily: 'popins-reg',
    fontSize: 12,
    color: '#20263e',
},
});

export default PickerItem;
