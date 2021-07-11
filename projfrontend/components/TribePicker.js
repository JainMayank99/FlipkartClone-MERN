import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Button,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Screen from "./Screen";

function TribePicker({selectedTribe,onSelectTribe}) {
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedTribe,setSelectedTribe] = useState('')
  const tribe = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
      {selectedTribe ? (
            <Text style={styles.textInput}>{selectedTribe}</Text>
          ) : (
            <Text style={styles.textInput}>Select Tribe</Text>
          )}
      </TouchableWithoutFeedback>
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
      >
        <Screen>
          <View
            style={{
              backgroundColor: "white",
              height: Dimensions.get("screen").height,
              paddingBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                maxHeight: 48,
                paddingHorizontal: 16,
              }}
            >
              <Feather
                name="x"
                size={24}
                color="#ff5d42"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={{ marginTop: 32 }}>
              <View
                style={{
                  paddingVertical: 4,
                }}
              ></View>
              <View style={{ paddingLeft: 16 }}>
                <Text style={styles.heading2}>Select Your Tribe :</Text>
                <FlatList
                  data={tribe}
                  extraData={tribe}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.addressHolder}>
                        <View
                          style={{
                            minWidth: Dimensions.get("screen").width * 0.875,
                          }}
                        >
                          <Text style={styles.text1}>{item}</Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                           onSelectTribe(item);
                          }}
                        >
                          <Feather
                            name={selectedTribe === item ? "disc" : "circle"}
                            // name="circle"
                            size={22}
                            color="#FF6B3C"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff5d42",
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    fontFamily: "zilla-reg",
    color: "white",
    fontSize: 22,
    flex: 1,
  },
  text: {
    fontFamily: "zilla-reg",
    fontSize: 22,
    color: "white",
    flex: 1,
  },
  heading2: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "black",
    paddingTop: 10,
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
  textInput: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#bdbdbd",
    borderRadius: 2.5,
    position: "relative",
  },
});

export default TribePicker;
