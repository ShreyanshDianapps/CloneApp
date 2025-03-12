// export const googleSignupAndLoginAction = createAsyncThunk(
//     'auth/googleSignupAndLogin',
//     async(payload:userState,{rejectWithValue})=>{
//                 try{
//                     return payload;
//                 }catch(error){
//                     return rejectWithValue(error);
//                 }
//     }

import { PRODUCTS_CATEGORIES_URL } from "@cloneApp/utils/endPoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// );
export const getCategoriesAction=createAsyncThunk(
    'shop/getCategories',
    async(rejectWithValue)=>{
        try{
            const response= await axios.get(PRODUCTS_CATEGORIES_URL);
            return  response.data
            
        }catch(error){
                return rejectWithValue
        }
    }
)
export const getProductListByCategoryAction=createAsyncThunk(
    'shop/getProductListByCategory',
    async(payload:string,{rejectWithValue})=>{
        try{
            const response=await axios.get(payload)
            return response.data.products
        }catch(error){
            return rejectWithValue
        }
    }
)