import { initialShopState } from '@cloneApp/modals';
import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesAction, getProductListByCategoryAction } from './shopAction';

const initialState = {...initialShopState};
const shopSlice = createSlice({
    name:'shop',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getCategoriesAction.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getCategoriesAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.CategoriesData = action.payload;
        })
        .addCase(getCategoriesAction.rejected,(state)=>{
            state.loading = false;
        })
        //for product by category list
        .addCase(getProductListByCategoryAction.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getProductListByCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.Product = action.payload;
        })
        .addCase(getProductListByCategoryAction.rejected,(state)=>{
            state.loading = false;
        });
    },

});
export default shopSlice.reducer;
