
import { AddProduct, Review } from '@cloneApp/modals';
import { GET_PRODUCT_BY_ID, PRODUCTS_CATEGORIES_URL } from '@cloneApp/utils/endPoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export type Users={
        userId:string,
        productId:number
}
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
export const storeReviews = createAsyncThunk(
    'shop/storeRevies',
    async(payload:Review,{rejectWithValue})=>{
        try{
            const reviewRef = firestore()
            .collection('users')
            .doc(payload.userId)
            .collection('reviews')
            .doc(payload.Product.id.toString());
            reviewRef.onSnapshot(async (snapshot) => {
                if (snapshot.exists) {
                    await reviewRef.update(payload);
                    return;
                }
                await reviewRef.set(payload);
                return;
              });
        }catch(error){
            return rejectWithValue;
        }
    }
);
export const checkingReview = createAsyncThunk<Review | null, Users>(
    'shop/checkingReview',
    async (payload, { rejectWithValue }) => {
      try {
        const reviewRef = firestore()
          .collection('users')
          .doc(payload.userId)
          .collection('reviews')
          .doc(payload.productId.toString());

        const snapshot = await reviewRef.get();
        if (snapshot.exists) {
          return snapshot.data() as Review;
        } else {
          return null;
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  export const addToCart = createAsyncThunk(
    'shop/addToCart',
    async (payload: AddProduct, { rejectWithValue }) => {
      try {
        const addCartRef = firestore()
          .collection('users')
          .doc(payload.userId)
          .collection('mybag');
          await addCartRef.add(payload);

        return payload;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );



