import { createSlice } from '@reduxjs/toolkit';
import { initialFavoriteState } from '@cloneApp/modals'; // Assuming this is correct

import { getFavoritesId,getFavoritesData } from './favoritesAction';


const initialState = { ...initialFavoriteState }; // Fix: Spread state correctly

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder

        .addCase(getFavoritesId.fulfilled,(state,action)=>{
            state.Favorites = action.payload;
        })
        .addCase(getFavoritesData.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getFavoritesData.fulfilled,(state,action)=>{
            state.loading = false;
            state.FavoritesData = action.payload;
        })
        .addCase(getFavoritesData.rejected,(state)=>{
            state.loading = false;
        });


    },
});

export default favoriteSlice.reducer;
