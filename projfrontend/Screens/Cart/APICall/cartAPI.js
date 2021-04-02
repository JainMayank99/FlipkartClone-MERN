const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getAllCartItemsByUserId = (userId, token) => {
	// console.log("Random Product call count: " + count);
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getAllCartItemsByUserId/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const addProductToCart = (userId, productId, token) => {
	return axios({
		method: "post",
		url: `${BACKEND_URL}/addProductToCart/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

let cancelToken;
export const updateQuantityInCart = (userId, productId, token, quantity) => {
	// if (typeof cancelToken != typeof undefined) {
	// 	cancelToken.cancel("Cancelling previous req");
	// }

	// cancelToken = axios.CancelToken.source();

	return axios({
		method: "put",
		url: `${BACKEND_URL}/updateQuantityInCart/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		data: {
			quantity: quantity,
		},
		// cancelToken: cancelToken.token,
	});
};
