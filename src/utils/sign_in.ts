import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
// Ensure Firebase is initialized **only once**

GoogleSignin.configure(
  {
      webClientId:'457001320294-5tq4qb0nepbhrd5lpva56197rahfj9ou.apps.googleusercontent.com',
      offlineAccess:true,
  }
);
  export const Google_signIn = async () => {
    try {
      console.log('You are signing in...');

      // Ensure Google Play Services are available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the user's ID token
      const userInfo = await GoogleSignin.signIn(); // ✅ Fixed extraction
      console.log('id token',userInfo?.data?.idToken);
      const idTok = userInfo?.data?.idToken;

      if (!idTok) {
        throw new Error('No ID Token received');
      }

      // Create Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idTok);

      // Sign-in the user with the credential'
      auth().onAuthStateChanged(user => {
        if (user) {
          console.log('User is signed in:', user);
        } else {
          console.log('User is signed out',user);
        }
      });
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };


 export const GooglesignOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };
  export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };