import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { googleSignupAndLoginAction, AuthenticationAction } from './authenticationAction';
import { initialAuthState } from '@cloneApp/modals'; // Assuming this is correct

const initialState = { ...initialAuthState }; // Fix: Spread state correctly

const authSlice = createSlice({
    name: 'auth',
    initialState, // Use properly structured initial state
    reducers: {
        logout:(state)=>{
            state.isLogin = false;
            state.user = {
                email: '',
                name: '',
                userId: '',
            };
        },
        setLanguage:(state,action:PayloadAction<string>)=>{
            
                state.language=action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Google Signup & Login Cases
            .addCase(googleSignupAndLoginAction.pending, (state) => {
                state.loading = true; // Fix: Access state directly
            })
            .addCase(googleSignupAndLoginAction.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.isLogin = true;
            })
            .addCase(googleSignupAndLoginAction.rejected, (state) => {
                state.loading = false;
            })

            // Authentication Cases
            .addCase(AuthenticationAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthenticationAction.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticate = action.payload.isAuthenticate;
                state.isLogin = true;
                state.loading = false;
            })
            .addCase(AuthenticationAction.rejected, (state) => {
                state.loading = false;
                state.isAuthenticate = false;
            });
    },
});
export const {logout,setLanguage} = authSlice.actions;
export default authSlice.reducer;
