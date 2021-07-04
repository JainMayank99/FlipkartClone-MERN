const axios = require("axios");
import { BACKEND_URL } from "@env";

export const getUser = (userId, token) => {
	
	console.log(BACKEND_URL,"User1")
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