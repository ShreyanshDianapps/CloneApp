import { combineReducers } from 'redux';
import authReducer from '@cloneApp/modules/authentication/authenticatinSlice';
import shopReducer from '@cloneApp/modules/shop/shopSlice';
import homeReducer from '@cloneApp/modules/home/homeSlice';
import favoriteReducer from '@cloneApp/modules/favorites/favoritesSlice';
export const reducers = combineReducers({
    auth:authReducer,
    shop:shopReducer,
    home:homeReducer,
    favorite:favoriteReducer,
});
