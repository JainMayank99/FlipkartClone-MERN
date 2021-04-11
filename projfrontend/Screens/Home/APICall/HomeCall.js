const axios = require('axios');
import {BACKEND_URL} from '@env';


export const randomProduct = (count ) => {
    // console.log("Random Product call count: " + count);
    console.log(BACKEND_URL,"Home1")
    return axios({
        method: 'post',
        url: `${BACKEND_URL}/getRandomProducts`,
        data: {
            count
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};