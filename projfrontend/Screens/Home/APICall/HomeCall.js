const axios = require('axios');
import {BACKEND_URL} from '@env';


export const randomProduct = (count ) => {
    console.log(BACKEND_URL,"Home")
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

export const getRandomCategory = ( ) => {
   
    return axios({
        method: 'get',
        url: `${BACKEND_URL}/getRandomCategory`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const getTopRatedProductsBasedOnCategoryId = (id) => {
  
    return axios({
        method: 'post',
        url: `${BACKEND_URL}/getTopRatedProductsBasedOnCategoryId/${id}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
export const getNewlyArrivedProduct = () => {
  
    return axios({
        method: 'get',
        url: `${BACKEND_URL}/getNewlyArrivedProduct`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
export const getTopRatedProducts = () => {
    return axios({
        method: 'get',
        url: `${BACKEND_URL}/getTopRatedProducts`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
