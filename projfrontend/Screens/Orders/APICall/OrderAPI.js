const axios = require('axios');
import {BACKEND_URL} from '@env';


export const getOrdersByUser = (userId, token ) => {
    console.log("Hii")
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

export const getReviewAndRating = (userId, token,productId ) => {
    return axios({
        method: 'get',
        url: `${BACKEND_URL}/getUserReviewByProductId/${userId}/${productId}`,
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
    });
};

export const addReviewAndRating = (userId, token,productId,reviewText,starCount ) => {
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
            starCount: starCount
        }
    });
};

export const updateReviewAndRating = (userId, token,reviewId,reviewText,starCount ) => {
    return axios({
        method: 'put',
        url: `${BACKEND_URL}/updateReview/${userId}/${reviewId}`,
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
        data: {
            reviewText: reviewText,
            starCount: starCount
        }
    });
};