import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Screen from './../../components/Screen';
import ImageInputList from './ImageInputList';

export default function SellerScreen() {
 const [imageUris,setImageUris] =useState([])
 const handleAdd= uri=>{
   setImageUris([...imageUris,uri])
 }
 const handleRemove= uri=>{
  setImageUris(imageUris.filter((imageUri)=>imageUri!=uri))
}
  return (
   <Screen>
     <ImageInputList
     imageUris={imageUris}
     onAddImage={handleAdd}     
     onRemoveImage={handleRemove}  
     />

     
   </Screen>
  );
}