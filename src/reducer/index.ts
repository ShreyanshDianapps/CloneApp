import { combineReducers } from 'redux';
import authReducer from '@cloneApp/modules/authentication/authenticatinSlice';
export const reducers = combineReducers({
    auth:authReducer,
});
