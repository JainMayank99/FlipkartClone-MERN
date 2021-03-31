const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getRelatedProduct = (categoryId) => {
	// console.log("Random Product call count: " + count);
	return axios({
		method: "post",
		url: `${BACKEND_URL}/getTopRatedProductsBasedOnCategoryId/${categoryId}`,
		// data: {
		//     count
		// },
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};
