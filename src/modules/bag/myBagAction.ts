import { createAsyncThunk } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';
export const getMyBagData=createAsyncThunk(
    'bag/getMyBagData',
    async(payload:string,{rejectWithValue})=>{
        try{
                const response = await firestore().collection('users').doc(payload).collection('mybag').get();
                return response.docs.map((doc) => doc.data());
        }catch(error){
           return rejectWithValue
        }
    }
)
