const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getAllAddress = (userId, token) => {
	// console.log("Random Product call count: ");
	console.log(BACKEND_URL,"Addre")
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getAllAddresses/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const addAddress = (userId, token,address) => {
	// console.log("Random Product call count: ");
	console.log(BACKEND_URL,"AddAddress")
	return axios({
		method: "post",
		url: `${BACKEND_URL}/addAddress/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        data:{
            address: address
        }
	});
};

export const removeAddress = (userId, token,address) => {
	// console.log("Random Product call count: " + count);
	// console.log(BACKEND_URL,"Cart")
	return axios({
		method: "delete",
		url: `${BACKEND_URL}/removeAddress/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        data:{
            address: address
        }
	});
};


export const changeDefaultAddress = (userId, token,address) => {
	// console.log("Random Product call count: " + count);
	// console.log(BACKEND_URL,"Cart")
	return axios({
		method: "put",
		url: `${BACKEND_URL}/changeDefaultAddress/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        data:{
            address: address
        }
	});
};