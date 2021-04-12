const axios = require('axios');
import {BACKEND_URL} from '@env';


export const getOrdersByUser = (userId, token ) => {
    // console.log("Random Product call count: " + count);
    // console.log(BACKEND_URL,"Home1")
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