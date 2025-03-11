import { Pressable, StyleSheet, Text, View,Alert } from 'react-native';
import { Formik } from 'formik';
import React from 'react';
import { CommonTextInput } from '@cloneApp/components/CommonTextInput';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';
import { validationSchema } from '@cloneApp/utils/validation';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import { FordwardIcon } from '@cloneApp/utils/localsvg';
import { CommonButton } from '@cloneApp/components/CommonButton';
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CommonBottomComp } from '../components/CommonBottomComp';
import { Google_signIn } from '@cloneApp/utils/sign_in';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';

type Props = {
  navigation:NativeStackNavigationProp<RootNavigationStack,'SignUp'>;
}

 export const SignUp = (props: Props) => {
  const handleButtonSubmit = async(values:{email:string,name:string,password:string})=>{
    const userExist = firestore().collection('users').doc(values.email).get();
    if((await userExist).exists){
      Alert.alert('User Already Exist');
      return;
    }
    const userdata = await auth().createUserWithEmailAndPassword(values.email, values.password);
      console.log('Button');
      firestore().collection('users').doc(values.email).set({
        name:values.name,
        email:values.email,
        userId:userdata?.user?.uid,
        password:values.password,

      }).then(()=>{
        console.log('User Created');
      }).catch(error=>{
          console.log('error is',error);
      });
    };
    //function for handling googleLogin
    const handleGoogleLogin = async()=>{
     const response = await Google_signIn();



    };
  return (
    <View style={styles.main_SignUp_Container}>
      <Text style={styles.headingText}>{strings.sign + strings.gap + strings.up}</Text>
      <Formik
      initialValues={{name:'',email:'',password:''}}
      validationSchema={validationSchema}
      onSubmit={(values)=>{
        console.log('Hello',values);
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
    <Pressable style={styles.alreadyHaveAnAccount} onPress={()=>props.navigation.navigate(screenNames.Login)}>
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
    gap:normalize(10),
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
