const axios = require("axios");
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = (phone, password) => {
	console.log(BACKEND_URL,"Login")
	return axios({
		method: "post",
		url: `${BACKEND_URL}/signin`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		data: {
			phone,
			password,
		},
	});
};

export const signUpWithEmail = (phone, name, email, password) => {
	// console.log("backend called");
	return axios({
		method: "post",
		url: `${BACKEND_URL}/signup`,
		data: {
			phone,
			name,
			email,
			password,
		},
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};

export const signUpWithoutEmail = (phone, name, password) => {
	return axios({
		method: "post",
		url: `${BACKEND_URL}/signup`,
		data: {
			phone,
			name,
			password,
		},
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};

export const signout = async (next) => {
	if (typeof window !== "undefined") {
		await AsyncStorage.removeItem("jwt");
		next();

		return axios({
			method: "get",
			url: `${BackendUrl}/signout`,
		});
	}
};

export const authenticate = async (data, next) => {
	if (typeof window !== "undefined") {
		await AsyncStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

export const isAuthenticated = async () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (await AsyncStorage.getItem("jwt")) {
		// console.log("jwt", await AsyncStorage.getItem("jwt"));
		return JSON.parse(await AsyncStorage.getItem("jwt"));
	} else {
		return false;
	}
};
