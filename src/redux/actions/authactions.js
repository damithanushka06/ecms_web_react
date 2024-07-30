import axios from "axios";
import {FETCH_USER_FAILURE, FETCH_USER_SUCCESS, SET_TOKEN, CLEAR_TOKEN} from "../store/types";

export const fetchUserSuccess = (userType) => {

    localStorage.setItem('userType', userType);

    return {
        type: FETCH_USER_SUCCESS,
        payload: userType,
    };
};

export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error,
    };
};

export const setToken = (token) => {

    localStorage.setItem('token', token);

    return {
        type: SET_TOKEN,
        payload: token,
    };
};

export const clearToken = () => {

    localStorage.removeItem('token');

    return {
        type: CLEAR_TOKEN,
    };
};

export const fetchUser = (username, password) => {
    return async (dispatch) => {
        try {

            const response = await axios.post('http://localhost:8080/api/auth/signin', {
                username,
                password,
            });

            const userType = response.data.roles[0];
            const token = response.data.token;

            dispatch(setToken(token));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            dispatch(fetchUserSuccess(userType));
        } catch (error) {
            console.log('err',error.response.status);
            dispatch(fetchUserFailure(error.response.status));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {

            await axios.post('http://localhost:8080/api/auth/signout');

            const userType = null
            dispatch(clearToken());
            dispatch(fetchUserSuccess(userType));
        } catch (error) {

            dispatch(fetchUserFailure(error.message));
        }
    };
}