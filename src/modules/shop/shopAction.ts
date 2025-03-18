// export const googleSignupAndLoginAction = createAsyncThunk(
//     'auth/googleSignupAndLogin',
//     async(payload:userState,{rejectWithValue})=>{
//                 try{
//                     return payload;
//                 }catch(error){
//                     return rejectWithValue(error);
//                 }
//     }

import { Review } from '@cloneApp/modals';
import { GET_PRODUCT_BY_ID, PRODUCTS_CATEGORIES_URL } from '@cloneApp/utils/endPoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

// );
export const getCategoriesAction = createAsyncThunk(
    'shop/getCategories',
    async(rejectWithValue)=>{
        try{
            const response = await axios.get(PRODUCTS_CATEGORIES_URL);
            return  response.data;

        }catch(error){
                return rejectWithValue;
        }
    }
);
export const getProductListByCategoryAction = createAsyncThunk(
    'shop/getProductListByCategory',
    async(payload:string,{rejectWithValue})=>{
        try{
            const response = await axios.get(payload);
            return response.data.products;
        }catch(error){
            return rejectWithValue;
        }
    }
);
export const getProductById = createAsyncThunk(
    'shop/getProductById',
    async(payload:number,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${GET_PRODUCT_BY_ID}${payload}`);
            return response.data;
        }catch(error){
            return rejectWithValue;
        }
    }
);
export const storeReviews=createAsyncThunk(
    'shop/storeRevies',
    async(payload:Review,{rejectWithValue})=>{
        try{
            try{
            await firestore().collection('users').doc(payload.userId).collection('reviews').doc(payload.Product.id.toString()).set(payload);
            }catch(error){
                console.log(error)
            }
            return true;
        }catch(error){
            return rejectWithValue
        }
    }
)
