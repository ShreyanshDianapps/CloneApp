import { StyleSheet, Text, View,Pressable } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileNavigationStack, RootNavigationStack } from '@cloneApp/utils/type';
import strings from '@cloneApp/utils/strings';
import BottomSheet from '@gorhom/bottom-sheet';
import fonts from '@cloneApp/utils/fonts';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import { CommonTextInput } from '@cloneApp/components/CommonTextInput';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { Portal } from '@gorhom/portal';
import color from '@cloneApp/utils/color';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { logout } from '@cloneApp/modules/authentication/authenticatinSlice';
import { screenNames } from '@cloneApp/utils/screenNames';
export type rootData={
        email?:string,
        name?:string,
        password?:string
}
type Props = {
  navigation:NativeStackNavigationProp<ProfileNavigationStack,'SettingBottomScreen'>;
}

export const SettingBottomScreen = (props: Props) => {
  const route = useRoute<RouteProp<ProfileNavigationStack,'SettingBottomScreen'>>();
  const {value,height} = route.params;
  const {user} = useAppSelector((state)=>state.auth);
const [name,setName] = useState('');
// const [email,setEmail] = useState('');
const dispatch = useAppDispatch();
const rootNavigation = props.navigation.getParent<NativeStackNavigationProp<RootNavigationStack>>();
  const handleLogout = async()=>{
     await  dispatch(logout());

     if (rootNavigation) {
      rootNavigation.reset({
        index: 1, // Second screen
        routes: [
          {
            name: screenNames.AuthenticationRouter,
            state: {
              index: 1, // Points to the second screen
              routes: [
                { name: screenNames.SignUp }, // First screen
                { name: screenNames.Login },  // Second screen
              ],
            },
          },
        ],
      });
    }

  };
  return (

    <Pressable onPress={props.navigation.goBack} style={styles.container}>
      <Portal>
      <BottomSheet
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      snapPoints={[height]}>
       {value === strings.personal && <View style={styles.bottomSheetStyle}>
        <Text style={styles.headingText}>{strings.editPersonalInformation}</Text>
        <CommonTextInput  text={strings.name} value={user?.name ?? ''} onChange={()=>{}}  onEndEditing={(text)=>setName(text)}style={{mainView:styles.mainViewStyle,InputTextStyle:styles.InputTextStyle,
          HeadingTextStyle:styles.textInputHeadingStyle}}/>
   <CommonTextInput  text={strings.email} value={user?.email ?? ''} onChange={()=>{}}  style={{mainView:styles.mainViewStyle,InputTextStyle:styles.InputTextStyle,
          HeadingTextStyle:styles.textInputHeadingStyle}}/>
          <CommonButton text={strings.saveChanges} onPress={()=>{}}
            style={{mainView:styles.buttonMainView,InputTextStyle:styles.buttonTextStyle}}/>
       </View> }
       {value === strings.password && <View style={styles.bottomSheetStyle}>
        <Text style={styles.headingText}>{strings.editPersonalInformation}</Text>
        <CommonTextInput  text={strings.name} value={user?.name ?? ''} onChange={()=>{}}  onEndEditing={(text)=>setName(text)}style={{mainView:styles.mainViewStyle,InputTextStyle:styles.InputTextStyle,
          HeadingTextStyle:styles.textInputHeadingStyle}}/>
   <CommonTextInput  text={strings.email} value={user?.email ?? ''} onChange={()=>{}}  style={{mainView:styles.mainViewStyle,InputTextStyle:styles.InputTextStyle,
          HeadingTextStyle:styles.textInputHeadingStyle}}/>
          <CommonButton text={strings.saveChanges} onPress={()=>{}}
            style={{mainView:styles.buttonMainView,InputTextStyle:styles.buttonTextStyle}}/>
       </View>}
       {value === strings.logOut &&
       <View>
       <CommonButton text={strings.cancel} onPress={props.navigation.goBack} style={ {mainView:styles.cancelButton,InputTextStyle:styles.cancelTextStyle} }/>
        <CommonButton text={strings.logOut} onPress={()=>handleLogout()} style={ {mainView:styles.logoutButton,InputTextStyle:styles.logoutTextStyle} }/>
        </View>}
      </BottomSheet>
      </Portal>
    </Pressable>
  );
};

export default SettingBottomScreen;

const styles = StyleSheet.create({
  container:{

    flex:1,
  },
  headingText:{
    fontSize:normalize(18),
    fontFamily:fonts.RobotoSemiBold,
    alignSelf:'center',
  },
  mainViewStyle:{
    marginHorizontal:vw(16),

  },
  InputTextStyle:{
   shadowOffset:{
    height:1,
    width:0,
   },
   shadowOpacity:0.1,
   borderRadius:normalize(3),
   paddingHorizontal:vw(12),
   shadowRadius:4,
    height:vh(54),
    backgroundColor:color.Neutral_White,
  },
  bottomSheetStyle:{
    backgroundColor:color.Netual_White_Light,
    gap:normalize(20),
  },
  textInputHeadingStyle:{
    fontSize:normalize(15),
    color:color.Gray2,
    marginBottom:vh(6),
  },
  buttonMainView:{
    height:vh(50),
    alignSelf:'center',
    borderRadius:normalize(30),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.PrimaryRed,
  },
  buttonTextStyle:{
    fontSize:normalize(20),
    color:color.Neutral_White,
  },
  cancelButton:{
    marginTop:vh(10),
    height:vh(50),
    width:vw(300),
    alignSelf:'center',
    backgroundColor:color.Neutral_White,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:normalize(1),
  },
  cancelTextStyle:{
    fontSize:normalize(24),
    fontFamily:fonts.RobotoExtraLight,
  },
  logoutButton:{
    marginTop:vh(10),
    height:vh(50),
    width:vw(300),
    alignSelf:'center',
    backgroundColor:color.PrimaryRed,
    justifyContent:'center',
    alignItems:'center',
  },
  logoutTextStyle:{
    fontSize:normalize(24),
    fontFamily:fonts.RobotoSemiBold,
    color:color.Neutral_White,
  },
});
