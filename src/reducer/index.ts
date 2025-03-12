import { combineReducers } from 'redux';
import authReducer from '@cloneApp/modules/authentication/authenticatinSlice';
import shopReducer from '@cloneApp/modules/shop/shopSlice';
export const reducers = combineReducers({
    auth:authReducer,
    shop:shopReducer,
});
