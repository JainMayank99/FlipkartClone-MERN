const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getUser = (userId, token) => {
	// console.log("Random Product call count: " + count);
	console.log(BACKEND_URL,"User")
	return axios({
		method: "get",
		url: `${BACKEND_URL}/getUserDetails/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
};

export const editUser = (userId, token,name,email) => {
	// console.log("Random Product call count: " + count);
	// console.log(BACKEND_URL,"Addr")
	return axios({
		method: "put",
		url: `${BACKEND_URL}/editUserDetails/${userId}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        data: {
            name:name,
            email:email
        }
	});
};