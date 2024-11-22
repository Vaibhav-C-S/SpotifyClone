import axios from 'axios';
import {backendUrl} from './config'
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
        const response = await axios.post(backendUrl +route, body);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken()
    try {
        const response = await axios.post(
            backendUrl + route,
            body,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Replace 'yourToken' with your actual token
              },
            }
          );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken()
    try {
        const response = await axios.get(
            backendUrl + route,
            
            {
              headers: {
                Authorization: `Bearer ${token}`, // Replace 'yourToken' with your actual token
              },
            }
          );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};