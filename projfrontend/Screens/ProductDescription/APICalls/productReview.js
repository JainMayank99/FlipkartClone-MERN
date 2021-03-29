const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getReviewByProductId = (productId) => {
	// console.log("Random Product call count: " + count);
	return axios({
		method: "post",
		url: `${BACKEND_URL}/getReviewByProductId/${productId}`,
		// data: {
		//     count
		// },
		// headers: {
		//     Accept: 'application/json',
		//     'Content-Type': 'application/json',
		// },
	});
};
