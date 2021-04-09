const axios = require("axios");
import { BACKEND_URL } from "@env";

export const addProductToWishList = (userId, itemId, token) => {
	// console.log(BACKEND_URL)
	return axios({
		method: "post",
		url: `${BACKEND_URL}/addProductToWishList/${userId}/${itemId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const getAllWishListItemsByUserId = (userId, token) => {
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getAllWishListItemsByUserId/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const removeProductFromWishList = (userId, itemId, token) => {
	return axios({
		method: "delete",
		url: `${BACKEND_URL}/removeProductFromWishList/${userId}/${itemId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};
