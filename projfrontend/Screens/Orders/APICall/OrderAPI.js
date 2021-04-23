const axios = require('axios');
import {BACKEND_URL} from '@env';


export const getOrdersByUser = (userId, token ) => {
    return axios({
        method: 'get',
        url: `${BACKEND_URL}/getOrdersByUserId/${userId}`,
        
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
    });
};

export const addReview = (userId, token,productId,reviewText,startCount ) => {
    return axios({
        method: 'post',
        url: `${BACKEND_URL}/addReview/${userId}/${productId}`,
        
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        data: {
            reviewText: reviewText,
            startCount: startCount
        }
    });
};
