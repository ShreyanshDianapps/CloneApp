
import { createSlice} from '@reduxjs/toolkit';
import { getMyOrder } from '../bag/myBagAction';
import { initialProfileState } from '@cloneApp/modals';
import { getReviews } from '../shop/shopAction';

const initialState = {...initialProfileState};
const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getMyOrder.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getMyOrder.fulfilled,(state,action)=>{
            state.loading = false;
            state.MyOrder = action.payload;
        })
        .addCase(getMyOrder.rejected,(state)=>{
            state.loading = false;
        })
        .addCase(getReviews.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getReviews.fulfilled,(state,action)=>{
            state.loading = false;
           state.MyReviews = action.payload;
        })
        .addCase(getReviews.rejected,(state)=>{
            state.loading = false;
        });

        //for product by category list

    },

});

export default profileSlice.reducer;
