import { StyleSheet, Text, View, Image, Platform,TextInput, Pressable } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
//utils
import localPngImages from '@cloneApp/utils/localPngImages'
import { normalize, vh, vw } from '@cloneApp/utils/dimensions'
// import strings from '@cloneApp/utils/strings'
import fonts from '@cloneApp/utils/fonts'
import color from '@cloneApp/utils/color'
import translate from '@cloneApp/utils/translate'


type OtpTimerProps={
    initialTime:number,
}
const OtpTimer = (props:OtpTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(props.initialTime);
  
    useEffect(() => {
      if (timeLeft === 0) {
        return;
      }
  
      const timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
  
      return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleResendPress = () => {
        setTimeLeft(30)

    }
    return (
      <View >
        {timeLeft === 0 ? (
          <Pressable onPress={handleResendPress}>
            <Text >Resend OTP</Text>
          </Pressable>
        ) : (
          <Text >{timeLeft}s</Text>
        )}
      </View>
    );
  
  }

export const OptScreen = () => {
    const inputRefs = useRef<Array<TextInput|null>>([]);
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const handleChange = useCallback((text: string, index: number) => {
        console.log("text",text)
        const newOtp = [...otp];
        newOtp[index] = text;
        if(newOtp[index]!=''){
            newOtp[index]=text[text.length-1]
        }
        setOtp(newOtp);
        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    },[otp]);
    
    const handleBackspace = async(text:string, index:number) => {
        if (!text && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      };
      const memoizedOtpTimer = useMemo(() => (
        <OtpTimer
          initialTime={10}
          />
      ),[])
    return ( 
        <View>
            <Image source={localPngImages.OneGodLogo} style={styles.logo} />
            <Text style={styles.text}>{translate.letsTakeFirstStep}</Text>
            <View style={styles.enterOtpView}>
                <Text style={styles.enterNumberText}>{translate.enterOtp}</Text>
                <Text style={styles.sixOtpText}>{translate.pleaseEnterSixDigitCode}</Text>
                <View style={styles.otpView}>
               {otp.map((digit,index)=>(
                <TextInput
                key={index}
                style={styles.otpInput}
                placeholder='-'
                ref={(ref) => { inputRefs.current[index] = ref; }}
                keyboardType="numeric"
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                    nativeEvent.key === 'Backspace' && handleBackspace('', index)
                  }
                />
               ))}
               </View>
               <View style={styles.otpNotReciveView}>
                 <Text>{translate.dontReciveOtp}</Text>
                {memoizedOtpTimer} 
               </View>
                
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    logo: {
        marginTop: Platform.OS === 'ios' ? vh(34) : vh(24),
        alignSelf: 'center'
    },
    text: {
        marginTop: vh(24),
        alignSelf: 'center',
        fontSize: normalize(18),
        fontFamily: fonts.RobotoMedium,
    },
    enterOtpView: {
        marginHorizontal: vw(16),
        marginTop: vh(24)
    },
    enterNumberView: {
        marginHorizontal: vw(16),
        marginTop: vh(24)
    },
    enterNumberText: {
        fontSize: normalize(24),
        fontFamily: fonts.RobotoBold
    },
    sixOtpText: {
        marginTop: vh(12),
        fontSize: normalize(12),
        fontFamily: fonts.RobotoMedium,
        color: color.Gray2,
        marginBottom: vh(24)
    },
    otpInput:{
            width:vw(48),
            height:vh(44),
            borderRadius:normalize(4),
            borderWidth:normalize(1),
           fontSize:normalize(14),
           textAlign:'center'
    },
    otpView:{
        flexDirection:'row',
        gap:normalize(11)
    },
    otpNotReciveView:{
        flexDirection:'row',
        alignSelf:'flex-end',
        marginTop:vh(12),
        alignItems:'center'

    }
})