const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getReviewByProductId = (productId) => {
	console.log("Review APIs: ");
	return axios({
		method: "post",
		url: `${BACKEND_URL}/getReviewByProductId/${productId}`,
		
	});
};


export const isProductInCart = (userId, productId, token) => {
	console.log(BACKEND_URL)
	return axios({
		method: "get",
		url: `${BACKEND_URL}/isProductInCart/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const isProductInWishlist = (userId, productId, token) => {
	console.log(BACKEND_URL,"hii")
	return axios({
		method: "get",
		url: `${BACKEND_URL}/isProductInWishlist/${userId}/${productId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};