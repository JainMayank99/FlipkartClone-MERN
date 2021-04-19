const axios = require("axios");
import { BACKEND_URL } from "@env";

export const uploadProduct = (userId,token,categoryId,formData) => {
	// console.log("Random Product call count: " + count);
	console.log("BACKEND_URL",formData,userId,categoryId);
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