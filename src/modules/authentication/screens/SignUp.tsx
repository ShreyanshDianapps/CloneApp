import { Pressable, StyleSheet, Text, View,Alert,ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import React from 'react';
import { CommonTextInput } from '@cloneApp/components/CommonTextInput';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';
import { validationSchema } from '@cloneApp/utils/validation';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import { RootNavigationStack } from '@cloneApp/utils/type';
import { FordwardIcon } from '@cloneApp/utils/localsvg';
import { screenNames } from '@cloneApp/utils/screenNames';
import { Google_signIn } from '@cloneApp/utils/sign_in';
//common componenr
import { CommonButton } from '@cloneApp/components/CommonButton';
import { CommonBottomComp } from '../components/CommonBottomComp';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@cloneApp/store';
import { googleSignupAndLoginAction, SignupAction } from '../authenticationAction';
import { userState } from '@cloneApp/modals';
import { useAppSelector } from '@cloneApp/utils/hooks';

type Props = {
  navigation:NativeStackNavigationProp<RootNavigationStack,'SignUp'>;
}

 export const SignUp = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useAppSelector((state)=>state.auth);
  const handleButtonSubmit = async(values:{email:string,name:string,password:string})=>{
    dispatch(SignupAction(values)).unwrap().then((res)=>{
     if(res){
      props.navigation.navigate(screenNames.Login);
     }
     else{
      Alert.alert('user Already Exist');
     }
    }).catch(()=>{

    });
    };
    //function for handling googleLogin
    const handleGoogleLogin = async()=>{
     const response = await Google_signIn();
     const payload:userState = {
      email: response.user.email ?? '', // If null, default to an empty string
      name: response.user.displayName ?? '', // Default to an empty string
      userId: response.user.uid ?? '',
     };
     dispatch(googleSignupAndLoginAction(payload));
    };
  return (
    <View style={styles.main_SignUp_Container}>
       {loading && <ActivityIndicator size="large" color={color.PrimaryRed} />}
      <Text style={styles.headingText}>{strings.sign + strings.gap + strings.up}</Text>
      <Formik
      initialValues={{name:'',email:'',password:''}}
      validationSchema={validationSchema}
      onSubmit={(values)=>{
            handleButtonSubmit(values);
      }}>
        {({handleChange,handleSubmit,values,errors,touched})=>(
          <View style={styles.formikView}>
            <CommonTextInput
           placeholder={strings.commonPlaceHolder + strings.gap + strings.email}
           text={strings.name}
           value={values.name}
           style={{mainView:styles.textInputView,
              HeadingTextStyle:styles.heading_CommonTextInput_Style,
           }}
           onChange={handleChange('name')}
     />
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
    <Pressable style={styles.alreadyHaveAnAccount} onPress={()=>{
      props.navigation.navigate(screenNames.Login);}}>
      <Text >{strings.alreadyHaveAnAccount}</Text>
      <FordwardIcon/>
    </Pressable>
    <CommonButton
    style={{
      mainView:styles.commonButton_View_Style,
      InputTextStyle:styles.comonButton_TextStyle,
    }}
    text={strings.sign.toUpperCase() + strings.gap + strings.up.toUpperCase()}
    onPress={handleSubmit}
    />
          </View>
        )}
      </Formik>
      <CommonBottomComp
      text={strings.sign + strings.gap + strings.up}
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
   marginHorizontal:vw(16),
  },
  formikView:{
    gap:normalize(8),
  },
  headingText:{
    marginTop:vh(106),
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
