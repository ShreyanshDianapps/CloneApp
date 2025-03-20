import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SignUpObject,authenticateData, userState } from '@cloneApp/modals/index';

export const SignupAction = createAsyncThunk(
  'auth/signup',
  async (payload: SignUpObject, { rejectWithValue }) => {
    try {
      // Check if the user already exists using their email
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', payload.email)
        .get();

      if (!userQuery.empty) {
        console.log('User already exists:', userQuery.docs[0].data());
        return rejectWithValue('User already exists');
      }

      // Create user in Firebase Authh
      const userCredential = await auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      // Store user in Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        name: payload.name,
        email: payload.email,
        userId: userCredential.user.uid,
        password: payload.password, // Storing password is NOT recommended! Remove this.
      });

      return true;
    } catch (error:any) {
      console.error('Signup error:', error);
      return rejectWithValue(error.message);
    }
  }
);
export const googleSignupAndLoginAction = createAsyncThunk(
    'auth/googleSignupAndLogin',
    async(payload:userState,{rejectWithValue})=>{
                try{
                await firestore().collection('users').doc(payload.userId).set({
                  name: payload.name,
                  email: payload.email,
                  userId: payload.userId,
                });
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
