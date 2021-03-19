const axios = require('axios');
import {BACKEND_URL} from '@env';


// export const signIn = ({ email, password }) => {
//     return axios({
//         method: 'post',
//         url: `${BACKEND_URL}/signin`,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         data: {
//             email,
//             password,
//         },
//     });
// };

export const signUpWithEmail = ({ phoneNumber, name, email, password }) => {
    return axios({
        method: 'post',
        url: `${BACKEND_URL}/signup`,
        data: {
            phoneNumber,
            name,
            email,
            password,
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};


export const signUpWithoutEmail = ({ phoneNumber, name, password }) => {
    return axios({
        method: 'post',
        url: `${BACKEND_URL}/signup`,
        data: {
            phoneNumber,
            name,
            password,
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

// export const signout = (next) => {
//     if (typeof window !== 'undefined') {
//         localStorage.removeItem('jwt');
//         next();

//         return axios({
//             method: 'get',
//             url: `${BackendUrl}/signout`,
//         });
//     }
// };

// export const authenticate = (data, next) => {
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('jwt', JSON.stringify(data));
//         next();
//     }
// };

// export const isAuthenticated = () => {
//     if (typeof window == 'undefined') {
//         return false;
//     }
//     if (localStorage.getItem('jwt')) {
//         return JSON.parse(localStorage.getItem('jwt'));
//     } else {
//         return false;
//     }
// };
