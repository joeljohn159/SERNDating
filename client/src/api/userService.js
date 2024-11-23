import axios from 'axios';

const API_URL1 = 'http://127.0.0.1:8080/users/register';
const API_URL2 = 'http://127.0.0.1:8080/users/login';

export const registerUser = async (postData) => {

    try{
        const response = await axios.post(API_URL1, postData);
        return response
    }catch(err){
        return err.response
    }

};


export const login = async (postData) => {

    try{
        const response = await axios.post(API_URL2, postData);
        return response
    }catch(err){
        return err.response
    }

};