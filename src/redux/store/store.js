import {configureStore} from '@reduxjs/toolkit';
import {authreducer} from "../reducers/authreducer";

const rootReducer = {
    auth: authreducer
};

export default configureStore({
    reducer: rootReducer
});
