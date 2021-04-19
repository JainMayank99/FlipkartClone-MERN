import React from "react";
import { TouchableOpacity, StyleSheet,Text} from "react-native";
// import AppText from "./AppText";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily:'popins-reg',
    fontSize:16,
    padding: 20,
    
  },
});

export default PickerItem;
