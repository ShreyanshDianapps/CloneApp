import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SignUpObject,authenticateData, userState } from '@cloneApp/modals/index';

export const SignupAction = createAsyncThunk(
  'auth/signup',
  async (payload: SignUpObject,{rejectWithValue}) => {
    try {
      const userExist = await firestore().collection('users').doc(payload.email).get();
      console.log(payload);
      if (userExist.exists) {
        return false;
      }
      const userdata = await auth().createUserWithEmailAndPassword(payload.email, payload.password);
      await firestore().collection('users').doc(payload.email).set({
        name: payload.name,
        email: payload.email,
        userId: userdata?.user?.uid,
        password: payload.password,
      });
      return  true;
    } catch (error) {

      return rejectWithValue(error);
    }
  }
);
export const googleSignupAndLoginAction = createAsyncThunk(
    'auth/googleSignupAndLogin',
    async(payload:userState,{rejectWithValue})=>{
                try{
                    return payload;
                }catch(error){
                    return rejectWithValue(error);
                }
    }
);
export const AuthenticationAction = createAsyncThunk(
    'auth/AuthenticationAction',
    async(payload:authenticateData,{rejectWithValue})=>{
        try{
            const userCredential = await auth().signInWithEmailAndPassword(payload.email, payload.password);

            const user = {
                email:userCredential.user.email ?? '',
                name:userCredential.user.displayName ?? '',
                userId:userCredential.user.uid ?? '',
            };
            if(userCredential){
                return {user,isAuthenticate:true};
            }
            else{
                return{user,isAuthenticate:false};
            }

        }catch(error){
            return rejectWithValue(error);
        }
    }
);
