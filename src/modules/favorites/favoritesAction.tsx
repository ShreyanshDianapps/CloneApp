import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { Users } from '../shop/shopAction';
import axios from 'axios';
import { GET_PRODUCT_BY_ID } from '@cloneApp/utils/endPoints';


export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (payload: Users, { rejectWithValue }) => {
    try {
      const favoritesRef = firestore()
        .collection('users')
        .doc(payload.userId)
        .collection('favorites');

      // Check if the product already exists in favorites
      const querySnapshot = await favoritesRef
        .where('productId', '==', payload.productId)
        .get();

      if (!querySnapshot.empty) {
        // If it exists, delete it
        const batch = firestore().batch();
        querySnapshot.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
        return false;
      } else {
        // If it does not exist, add it
        await favoritesRef.add({ productId: payload.productId });
        return true;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getFavoritesId = createAsyncThunk(
  'favorite/getFavoritesId',
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await firestore()
        .collection('users')
        .doc(payload)
        .collection('favorites')
        .get();
      return response.docs.map((doc) => doc.data().productId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getFavoritesData = createAsyncThunk(
    'favorite/getFavoritesData',
    async(payload:string,{rejectWithValue})=>{
        try{
            const response = await firestore()
        .collection('users')
        .doc(payload)
        .collection('favorites')
        .get();
            let mainData = [];
      const data = response.docs.map((doc) => doc.data().productId);
      for(let i = 0; i < data.length; i++){
        const response = await axios.get(`${GET_PRODUCT_BY_ID}${data[i]}`);
        mainData.push(response.data);
      }
      return mainData;
        }catch(error:any){
            return rejectWithValue(error.message);
    }
    }
);
