import { FilteredData, initialShopState, UpdateBagData } from '@cloneApp/modals';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCart, getCategoriesAction, getProductById, getProductListByCategoryAction } from './shopAction';

const initialState = {...initialShopState};
const shopSlice = createSlice({
    name:'shop',
    initialState,
    reducers:{
     setFilterFields: (state, action:PayloadAction<FilteredData>) => {
            state.Filter = action.payload;
          },

    updateBagData: (state, action: PayloadAction<UpdateBagData>) => {
        const { productId, quantity } = action.payload;

        // Find the product in BagData
        const index = state.BagData.findIndex((item) => item.Product.id === productId);
        state.BagData[index].quantity = quantity;
    },
    },
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
        })
        //for storing data by id
        .addCase(getProductById.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getProductById.fulfilled,(state,action)=>{
            state.loading = false;
            state.ProductData = action.payload;
        })
        .addCase(getProductById.rejected,(state)=>{
            state.loading = false;
        })
        .addCase(addToCart.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.BagData = Array.isArray(state.BagData)
            ? [...state.BagData, action.payload]
            : [action.payload];
        })
        .addCase(addToCart.rejected,(state)=>{
            state.loading = false;
        });

    },

});
export const { setFilterFields,updateBagData } = shopSlice.actions;
export default shopSlice.reducer;
