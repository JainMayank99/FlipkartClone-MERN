const axios = require('axios');
import {BACKEND_URL} from '@env';


export const paymentByCash = (userId, token,products) => {
    // console.log("Random Product call count: " + count);
    console.log(BACKEND_URL,"Payment")
    return axios({
        method: 'post',
        url: `${BACKEND_URL}/paymentByCash/${userId}`,
        data: {products:products},
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
    });
};