import { createSlice } from '@reduxjs/toolkit';
import { initialHomeState } from '@cloneApp/modals'; // Assuming this is correct
import { getAllProducts } from './homeAction';

const initialState = { ...initialHomeState }; // Fix: Spread state correctly

const homeSlice = createSlice({
    name: 'home',
    initialState, // Use properly structured initial state
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending,(state)=>{
                state.loading = true;
            })
           .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.ProductsData = action.payload;
           })
           .addCase(getAllProducts.rejected,(state)=>{
            state.loading = false;
           });
    },
});

export default homeSlice.reducer;
