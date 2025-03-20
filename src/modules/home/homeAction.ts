import { GET_ALL_PRODUCTS } from '@cloneApp/utils/endPoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getAllProducts = createAsyncThunk(

    'home/getAllProducts',
    async(rejectWithValue)=>{
        try{
            const response = await axios.get(GET_ALL_PRODUCTS);
            return response.data.products;
        }catch(error){
            return rejectWithValue;
        }
    }
);
