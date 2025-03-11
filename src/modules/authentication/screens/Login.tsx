import { Pressable, StyleSheet, Text, View,Alert } from 'react-native';
import { Formik } from 'formik';
import React from 'react';
import { CommonTextInput } from '@cloneApp/components/CommonTextInput';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';
import { validationSchema } from '@cloneApp/utils/validation';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import { FordwardIcon, NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { CommonButton } from '@cloneApp/components/CommonButton';
//firebase
import auth from '@react-native-firebase/auth';
import { CommonBottomComp } from '../components/CommonBottomComp';
import { Google_signIn } from '@cloneApp/utils/sign_in';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationStack } from '@cloneApp/utils/type';

type Props = {
    navigation:NativeStackNavigationProp<RootNavigationStack,'Login'>
}

 export const Login = (props: Props) => {
  const handleButtonSubmit = async(values:{email:string,password:string})=>{
    try {
        const userCredential = await auth().signInWithEmailAndPassword(values.email, values.password);
        console.log('User signed in successfully:', userCredential.user);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('User not found. Please sign up.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Incorrect password. Please try again.');
        } else {
          Alert.alert('Either user email or password is incorrect');
        }
      }
    };
    //function for handling googleLogin
    const handleGoogleLogin = async()=>{
     const response = await Google_signIn();



    };
  return (
    <View style={styles.main_SignUp_Container}>
      <Pressable
      onPress={()=>props.navigation.goBack()}><NavigationBackIcon/></Pressable>
      <Text style={styles.headingText}>{strings.login}</Text>
      <Formik
      initialValues={{email:'',password:''}}
      validationSchema={validationSchema}
      onSubmit={(values)=>{
            handleButtonSubmit(values);
      }}>
        {({handleChange,handleSubmit,values,errors,touched})=>(
          <View style={styles.formikView}>

     {touched.email && errors.email && (
      <Text style={styles.errorText}>{errors.email}</Text>
     )}
      <CommonTextInput
           placeholder={strings.commonPlaceHolder + strings.gap + strings.email}
           text={strings.email}
           value={values.email}
           style={{mainView:styles.textInputView
            ,  HeadingTextStyle:styles.heading_CommonTextInput_Style,
           }}
           onChange={handleChange('email')}
     />
     {touched.email && errors.email && (
      <Text style={styles.errorText}>{errors.email}</Text>
     )}
      <CommonTextInput
           placeholder={strings.commonPlaceHolder + strings.gap + strings.email}
           text={strings.password}
           value={values.password}
           style={{mainView:styles.textInputView,
            HeadingTextStyle:styles.heading_CommonTextInput_Style,

           }}
           onChange={handleChange('password')}
     />
     {touched.email && errors.email && (
      <Text style={styles.errorText}>{errors.email}</Text>
     )}
    <Pressable style={styles.alreadyHaveAnAccount}>
      <Text >{strings.forgetPassword}</Text>
      <FordwardIcon/>
    </Pressable>
    <CommonButton
    style={{
      mainView:styles.commonButton_View_Style,
      InputTextStyle:styles.comonButton_TextStyle,
    }}
    text={strings.sign.toUpperCase() + strings.gap + strings.in.toUpperCase()}
    onPress={handleSubmit}
    />
          </View>
        )}
      </Formik>
      <CommonBottomComp
      text={strings.sign + strings.gap + strings.in}
      isGoogleIconPressed={(value)=>{
        if(value){
            handleGoogleLogin();
        }
      }}
      isFaceBookIconPressed={(value)=>{
        if(value){
         Alert.alert('FaceBook login is not enalbled yet');
        }
      }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  main_SignUp_Container:{
  //  marginVertical:vh(50),
  marginTop:vh(52),
   marginHorizontal:vw(16),
  },
  formikView:{
    gap:normalize(10),
  },
  headingText:{
    marginTop:vh(30),
   marginBottom:vh(73),
    fontSize:normalize(34),
    fontFamily:fonts.RobotoBold,
  },
  errorText: {
    color: color.red,
    fontSize:normalize(12),
    fontFamily: fonts.RobotoSemiBold,
  },
  //textInputBiew
  textInputView:{
    height:vh(64),
    width:vw(343),
    paddingHorizontal:vw(20),
    paddingVertical:vh(14),
    backgroundColor:color.Neutral_White,
    borderRadius:normalize(10),
  },
  heading_CommonTextInput_Style:{
      fontSize:normalize(11),
      color:color.Gray4,
      fontFamily:fonts.RobotoRegular,
  },
  alreadyHaveAnAccount:{
    alignSelf:'flex-end',
    flexDirection:'row',
    alignItems:'center',
  },
  //commonButtonStyles
  commonButton_View_Style:{
    height:vh(48),
    borderRadius:normalize(30),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.PrimaryRed,
    marginTop:vh(18),
  },
  comonButton_TextStyle:{
    fontFamily:fonts.RobotoMedium,
    fontSize:normalize(14),
    color:color.Neutral_White,
  },

});
