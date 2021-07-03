const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getRelatedProduct = (categoryId) => {
	console.log("Random Product call count: ");
	console.log(BACKEND_URL)
	return axios({
		method: "post",
		url: `${BACKEND_URL}/getTopRatedProductsBasedOnCategoryId/${categoryId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};
