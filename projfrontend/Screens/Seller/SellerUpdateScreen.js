import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as yup from "yup";

import Screen from "./../../components/Screen";
import ImageInputList from "./ImageInputList";
import AppPicker from "./AppPicker";
import { StyleSheet } from "react-native";
import BackButtonHeader from "./../../components/BackButtonHeader";
import { updateSellerProduct,getSellerProduct } from "./SellerAPI/sellerAPI";
import CategoryPickerItem from "./CategoryPickerItem";
import { isAuthenticated } from "../Auth/AuthAPICalls/authCalls";

const validationSchema = yup.object().shape({
  productName: yup.string().required("Please enter Product Name"),
  amount: yup.string().required("Please enter Product Amount"),
  quantity: yup.number().required("Please enter No. of stocks"),
  discount: yup.number().required("Please enter the Discount"),
  tribe: yup.string().required("Please enter the Tribe Name"),
  description: yup.string().required("Please enter Product Description"),
});


const categories = [
  {
    name: "dress",
    label: "Clothing",
    value: "1",
  },
  {
    name: "book",
    label: "Stationery",
    value: "1",
  },
  {
    name: "jewellery",
    label: "Jewellery",
    value: "1",
  },
  {
    name: "bag",
    label: "Bags",
    value: "1",
  },
  {
    name: "home",
    label: "Home",
    value: "1",
  },
  {
    name: "doctor",
    label: "Covid",
    value: "1",
  },
  {
    name: "food",
    label: "Essentials",
    value: "1",
  },
];

export default function SellerUpdateScreen({ navigation, route }) {
  const { item } = route.params;
  const [initialAmount, setInitialAmount] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [initialDiscount, setInitialDiscount] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [category, setCategory] = useState(null);
  const [focusProductName, setFocusProductName] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusQuantity, setFocusQuantity] = useState(false);
  const [focusDescription, setFocusDescription] = useState(false);
  const [focusDiscount, setFocusDiscount] = useState(false);
  const [focusTribe, setFocusTribe] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(0);


  const settingInitialValues=(data) => {
    setInitialAmount(data.price.toString());
    setInitialDiscount(data.discount.toString());
    setInitialStock(data.stock.toString());
    setImageUris([])
    setFile([])
  }


  useFocusEffect(
    React.useCallback(() => {
      setLoading(1);
      isAuthenticated()
      .then((res) => {
        setUser(res.user._id);
        setToken(res.token);
        getSellerProduct(res.user._id, res.token,item._id)
            .then((res) => {
              settingInitialValues(res.data)
              setLoading(0)
            })
            .catch((err) => {
              console.log('Error in getting seller product',err)
            })
      
      })
      .catch((err) => {
        console.log("isAuthenticated in Seller Update Screen", err);
      });
    }, [item])
  );

  const onSub = (values) => {
    var data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append(`Img${i}`, file[`${i}`]);
    }
    if (file.length === 0) {
      alert("Upload atleast 1 image to proceed!");
    } else if (category === null) {
      alert("Select Category of Product to proceed!");
    } else {
      data.append("name", values.productName);
      data.append("stock", values.quantity);
      data.append("description", values.description);
      data.append("price", values.amount);
      data.append("discount", values.discount);
      data.append("tribe", values.tribe);
      data.append("category", "6056e7146e98663c74f5b84a");

      setLoading(1);
      updateSellerProduct(user, token, item._id, data)
        .then((res) => {
          setLoading(2);
          (values.productName = ""),
            (values.amount = ""),
            (values.quantity = ""),
            (values.description = ""),
            (values.discount = ""),
            (values.tribe = ""),
            setImageUris([]);
          setCategory(null);
          setTimeout(() => {
            navigation.goBack();
          }, 3000);
        })
        .catch((err) => {
          console.log(" Update Product screen error", err);
          setLoading(3);
          setTimeout(() => {
            setLoading(0);
          }, 3000);
        });
    }
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

  const onfocusDiscountChange = () => {
    setFocusDiscount(true);
  };
  const onBlurDiscountChange = () => {
    setFocusDiscount(false);
  };

  const onfocusTribeChange = () => {
    setFocusTribe(true);
  };
  const onBlurTribeChange = () => {
    setFocusTribe(false);
  };

  return (
    <>
      <View
        style={
          loading !== 0 ? styles.overlay : { flex: 1, backgroundColor: "white" }
        }
      >
        {loading !== 0 ? (
          <LottieView
            style={styles.lottie}
            autoPlay={loading !== 1 ? false : true}
            loop={loading !== 1 ? false : true}
            source={
              loading === 1
                ? require("../../assets/animations/loader.json")
                : loading === 2
                ? require("../../assets/animations/success.json")
                : require("../../assets/animations/error.json")
            }
          />
        ) : null}
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
            icon="apps"
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            selectedItem={category}
            onSelectItem={(item) => setCategory(item)}
          />
          <Formik
            enableReinitialize={true}
            initialValues={{
              productName: item.name,
              amount: initialAmount,
              quantity: initialStock,
              discount: initialDiscount,
              description: item.description,
              tribe: item.tribe,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              onSub(values);
            }}
          >
            {(formikProps) => (
              <React.Fragment>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Text style={styles.label}>Discount</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusDiscountChange}
                      placeholder="Enter Discount (in percentage)"
                      autoCorrect={false}
                      style={
                        focusDiscount === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("discount")}
                      onBlur={onBlurDiscountChange}
                      value={formikProps.values.discount}
                    />
                    <View
                      style={
                        formikProps.errors.discount
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
                    <Text style={styles.label}>Tribe</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      onFocus={onfocusTribeChange}
                      placeholder="Enter Name Of Tribe"
                      autoCorrect={false}
                      style={
                        focusTribe === false
                          ? styles.textInput
                          : styles.textInputName
                      }
                      onChangeText={formikProps.handleChange("tribe")}
                      onBlur={onBlurTribeChange}
                      value={formikProps.values.tribe}
                    />
                    <View
                      style={
                        formikProps.errors.tribe
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
                    style={styles.view}
                    onPress={formikProps.handleSubmit}
                  >
                    <View style={{ height: 30, paddingRight: 8 }}>
                      <Feather name="plus" size={24} color="#ff5d42" />
                    </View>

                    <Text style={styles.add}>Update Product</Text>
                  </TouchableOpacity>
                </ScrollView>
              </React.Fragment>
            )}
          </Formik>
        </Screen>
      </View>
    </>
  );
}
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

  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
  },
  add: {
    fontFamily: "zilla-reg",
    fontSize: 22,
    color: "#ff5d42",
  },
});
