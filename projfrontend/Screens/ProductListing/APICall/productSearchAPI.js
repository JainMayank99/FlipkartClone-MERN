const axios = require("axios");
import { BACKEND_URL } from "@env";

export const productSearch = () => {
	console.log("Random Product call count: " );
	
	return axios({
		method: "post",
		url: `${BACKEND_URL}/searchProduct`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};
