import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext, Formik } from "formik";
import DocumentPicker from "react-native-document-picker";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  productName: yup.string().required("Please enter Product Name"),
  amount: yup.string().required("Please enter Product Amount"),
  quantity: yup.string().required("Please enter No. of stocks"),
  description: yup.string().required("Please enter Product Description"),
});

import Screen from "./../../components/Screen";
import ImageInputList from "./ImageInputList";
import AppPicker from "./AppPicker";
import { StyleSheet } from "react-native";
import BackButtonHeader from "./../../components/BackButtonHeader";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";
import { uploadProduct } from "./SellerAPI/sellerAPI";

const categories = [
  { label: "Furniture", value: "6056e7146e98663c74f5b84a" },
  { label: "Clothing", value: 2 },
  { label: "Cameras", value: 3 },
];

export default function SellerScreen({ navigation }) {
  const [imageUris, setImageUris] = useState([]);
  const [category, setCategory] = useState(null);
  const [focusProductName, setFocusProductName] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusQuantity, setFocusQuantity] = useState(false);
  const [focusDescription, setFocusDescription] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [file,setFile] = useState([])

  React.useEffect(() => {
    navigation.addListener("focus", () => {
    
      isAuthenticated()
        .then((res) => {
          if (res.user) {
            setUser(res.user._id);
            setToken(res.token);
          }
        })
        .catch((err) => {
          console.log("Add product screen error: " + err);
        });
    });
  }, [navigation]);

  const onSub = (values) => {
    var data = new FormData();
    for(let i=0;i<file.length;i++){
      data.append(`Img${i}`, file[`${i}`]);
    }
    data.append("name", values.productName);
    data.append("stock", values.quantity);
    data.append("description", values.description);
    data.append("price", values.amount);
    data.append("discount", 0);
   
    uploadProduct(user, token, "6056e7146e98663c74f5b84a", data)
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(" Add Product screen error", err);
      });
  };

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri != uri));
  };

  const onfocusProductNameChange = () => {
    setFocusProductName(true);
  };
  const onBlurProductNameChange = () => {
    setFocusProductName(false);
  };

  const onfocusQuantityChange = () => {
    setFocusQuantity(true);
  };
  const onBlurQuantityChange = () => {
    setFocusQuantity(false);
  };

  const onfocusAmountChange = () => {
    setFocusAmount(true);
  };
  const onBlurAmountChange = () => {
    setFocusAmount(false);
  };

  const onfocusDescriptionChange = () => {
    setFocusDescription(true);
  };
  const onBlurDescriptionChange = () => {
    setFocusDescription(false);
  };

  return (
    <>
      <BackButtonHeader />
      <Screen style={styles.screen}>
        <ImageInputList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
          file={file}
          setFile={setFile}
        />
        <AppPicker
          selectedItem={category}
          onSelectItem={(item) => setCategory(item)}
          items={categories}
          icon="apps"
          placeholder="Select Category"
        />
        <Formik
          initialValues={{
            productName: "dfdf",
            amount: "2323",
            quantity: "422",
            description: "dsdgds",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
          
          
            onSub(values);
          }}
        >
          {(formikProps) => (
            <React.Fragment>
              <View
                style={{
                  marginHorizontal: 8,
                  marginVertical: 8,
                }}
              >
                <Text style={styles.label}>Product Name</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  onFocus={onfocusProductNameChange}
                  placeholder="Enter Product Name"
                  autoCorrect={false}
                  style={
                    focusProductName === false
                      ? styles.textInput
                      : styles.textInputName
                  }
                  onChangeText={formikProps.handleChange("productName")}
                  onBlur={onBlurProductNameChange}
                  value={formikProps.values.productName}
                />
                <View
                  style={
                    formikProps.errors.productName
                      ? styles.redCircle
                      : styles.greenCircle
                  }
                ></View>
              </View>

              <View
                style={{
                  marginHorizontal: 8,
                  marginVertical: 8,
                }}
              >
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  onFocus={onfocusQuantityChange}
                  placeholder="Enter The No. Of Stocks"
                  autoCorrect={false}
                  style={
                    focusQuantity === false
                      ? styles.textInput
                      : styles.textInputName
                  }
                  onChangeText={formikProps.handleChange("quantity")}
                  onBlur={onBlurQuantityChange}
                  value={formikProps.values.quantity}
                />
                <View
                  style={
                    formikProps.errors.quantity
                      ? styles.redCircle
                      : styles.greenCircle
                  }
                ></View>
              </View>

              <View
                style={{
                  marginHorizontal: 8,
                  marginVertical: 8,
                }}
              >
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  onFocus={onfocusAmountChange}
                  placeholder="Enter The Price"
                  autoCorrect={false}
                  style={
                    focusAmount === false
                      ? styles.textInput
                      : styles.textInputName
                  }
                  onChangeText={formikProps.handleChange("amount")}
                  onBlur={onBlurAmountChange}
                  value={formikProps.values.amount}
                />
                <View
                  style={
                    formikProps.errors.amount
                      ? styles.redCircle
                      : styles.greenCircle
                  }
                ></View>
              </View>

              <View
                style={{
                  marginHorizontal: 8,
                  marginVertical: 8,
                }}
              >
                <Text style={styles.label}>Product Description</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  onFocus={onfocusDescriptionChange}
                  placeholder="Enter Product Description"
                  autoCorrect={false}
                  style={
                    focusDescription === false
                      ? styles.textInput
                      : styles.textInputName
                  }
                  onChangeText={formikProps.handleChange("description")}
                  onBlur={onBlurDescriptionChange}
                  value={formikProps.values.description}
                />
                <View
                  style={
                    formikProps.errors.description
                      ? styles.redCircle
                      : styles.greenCircle
                  }
                ></View>
              </View>

              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 8,
                  left: 16,
                }}
                onPress={formikProps.handleSubmit}
              >
                <View
                  style={
                    formikProps.errors.house
                      ? styles.buttonlight
                      : styles.button
                  }
                >
                  <Text style={styles.submit}>Add Product</Text>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </Formik>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  label: {
    fontFamily: "zilla-med",
    fontSize: 18,
    marginTop: 4,
    letterSpacing: 0.75,
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

  textInputName: {
    fontFamily: "zilla-reg",
    fontSize: 20,
    color: "#bdbdbd",
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#ff5d42",
    borderRadius: 2.5,
  },
  button: {
    backgroundColor: "#ff5d42",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
  },
  buttonlight: {
    backgroundColor: "#f4c2c2",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
  },
  errMsg: {
    fontFamily: "zilla-reg",
    fontSize: 16,
    color: "red",
    paddingVertical: 4,
    height: 24,
  },
  greenCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#90EE90",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
  redCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#f94d00",
    position: "absolute",
    right: "0%",
    top: "12.5%",
  },
  submit: {
    fontFamily: "zilla-med",
    fontSize: 22,
    color: "white",
  },
});
