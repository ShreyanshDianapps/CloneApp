import { StyleSheet, Text, View,Image, Platform } from 'react-native'
import React, { useState } from 'react'
//utils import 
import localPngImages from '@cloneApp/utils/localPngImages'
import { normalize, vh, vw } from '@cloneApp/utils/dimensions'
// import strings from '@cloneApp/utils/strings'
import fonts from '@cloneApp/utils/fonts'
import color from '@cloneApp/utils/color'
import strings from '@cloneApp/utils/convertedStrings'
import translate from '@cloneApp/utils/translate'
//custom Import
import { CustomTextInput } from '../components/CustomTextInput'
import { CustomButton } from '../components/CustomButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ProfileNavigationStack } from '@cloneApp/utils/type'
import { screenNames } from '@cloneApp/utils/screenNames'

type Props = {
  navigation: NativeStackNavigationProp<ProfileNavigationStack, 'PhoneNumberScreen'>;
}

export const PhoneNumberScreen = (props: Props) => {
    const [number,setNumber]=useState('');
  return (
    <View>
      <Image source={localPngImages.OneGodLogo} style={styles.logo}/>
      <Text style={styles.text}>{translate.letsTakeFirstStep}</Text>
      <View style={styles.enterNumberView}>
        <Text style={styles.enterNumberText}>{translate.enterYourNumber}</Text>
        <Text style={styles.sixOtpText}>{translate.sixOtpSend}</Text>
        <CustomTextInput  label={translate.phoneNumber}  inputContainerStyle={styles.inputContainer} onChangeText={(text)=>setNumber(text)} keyboardType='numeric' maxLength={10}/>
        <CustomButton title={strings.getOtp} onPress={()=>props.navigation.navigate(screenNames.OtpScreen)} style={[{opacity:number.length===10?1:0.3}]}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
        marginTop:Platform.OS==='ios'?vh(34):vh(24),
        alignSelf:'center'
    },
    text:{
        marginTop:vh(24),
        alignSelf:'center',
        fontSize:normalize(18),
        fontFamily:fonts.RobotoMedium,
        
    },
    enterNumberView:{
        marginHorizontal:vw(16),
            marginTop:vh(24)
    },
    enterNumberText:{
        fontSize:normalize(24),
        fontFamily:fonts.RobotoBold
    },
    sixOtpText:{
        marginTop:vh(12),
        fontSize:normalize(12),
        fontFamily:fonts.RobotoMedium,
        color:color.Gray2,
        marginBottom:vh(24)
    },
    inputContainer:{
        borderRadius:normalize(10)
    }
    
})