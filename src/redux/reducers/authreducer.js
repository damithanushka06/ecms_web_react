import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    SET_TOKEN,
    CLEAR_TOKEN
} from "../store/types";

const INITIAL_STATE = {
    token: localStorage.getItem('token') || null,
    userType: localStorage.getItem('userType') || null,
    error: null
}

export const authreducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                userType: action.payload,
                error: null,
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case CLEAR_TOKEN:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    }
}