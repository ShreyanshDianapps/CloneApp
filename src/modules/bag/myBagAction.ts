import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { AddProduct, Orders } from '@cloneApp/modals';
export type OrdersData={
  totalAmount:number,
  items:AddProduct[],
  userId:string,

}
export const getMyBagData = createAsyncThunk(
    'bag/getMyBagData',
    async(payload:string,{rejectWithValue})=>{
        try{
                const response = await firestore().collection('users').doc(payload).collection('mybag').get();
                return response.docs.map((doc) => doc.data());
        }catch(error){
           return rejectWithValue;
        }
    }
);
export const getMyOrder = createAsyncThunk(
    'bag/getMyOrder',
    async(payload:string,{rejectWithValue})=>{
        try{
                const response = await firestore().collection('users').doc(payload).collection('orders').get();
                return response.docs.map((doc) => doc.data()) as any;
        }catch(error){
           return rejectWithValue(error);
        }
    }
);

export const storeOrders = createAsyncThunk(
  'bag/storeOrders',
  async (payload: OrdersData, { rejectWithValue }) => {
    try {
      const orderRef = firestore()
        .collection('users')
        .doc(payload.userId)
        .collection('orders');

      // Generate a random order number
      const randomOrderNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      const currentDate = firestore.FieldValue.serverTimestamp(); // Use Firestore's server time

      // Store order with additional fields
      await orderRef.add({
        items: payload as OrdersData ,
        orderNumber: randomOrderNumber.toString() as string, // ✅ Random order number
        createdAt: currentDate,  // ✅ Firestore timestamp
      });

      return true; // ✅ Success
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
