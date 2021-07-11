const axios = require("axios");
import { BACKEND_URL } from "@env";

export const uploadProduct = (userId,token,categoryId,formData) => {
	// console.log("Random Product call count: " + count);
	console.log("BACKEND_URLv",formData,userId,categoryId);
	return axios({
		method: "post",
        data: formData,
		url: `${BACKEND_URL}/addProduct/${userId}/${categoryId}`,
		headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,   
		},
        
	});
};

export const getSellerProducts = (userId,token) => {
	// console.log("Random Product call count: " + count);
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getProductsByUserId/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        
	});
};

export const getSellerProduct = (userId,token,productId) => {
	// console.log("Random Product call count: " + count);
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getSingleProductByUserId/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        
	});
};


export const removeSellerProduct = (userId,token,productId) => {
	console.log("Remove Product call count: ",userId,token,productId);
	return axios({
		method: "delete",
		url: `${BACKEND_URL}/removeSellerProduct/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},  
	});
};


export const updateSellerProduct = (userId,token,productId,formData) => {
	console.log("Update Product call count: ",userId,token,productId);
	return axios({
		method: "put",
		url: `${BACKEND_URL}/updateProduct/${userId}/${productId}`,
		data: formData,
		headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,   
		}, 
	});
};

export const becomeASeller = (userId,token,AddharNo) => {
	// console.log("Update Product call count: ",userId,token,productId);
	return axios({
		method: "put",
		url: `${BACKEND_URL}/becomeASeller/${userId}`,
		data: {
			role:1,
			AddharNo
		},
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		}, 
	});
};