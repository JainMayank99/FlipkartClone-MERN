const axios = require("axios");
import { BACKEND_URL } from "@env";

export const productsByCategoryId = (categoryID) => {
	console.log("Random Product call count: ");
	return axios({
		method: "post",
		url: `${BACKEND_URL}/getProductsByCategoryId/${categoryID}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};
