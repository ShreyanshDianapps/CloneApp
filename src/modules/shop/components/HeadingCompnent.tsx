import { StyleSheet, Text, View ,StyleProp, TextStyle, ViewStyle, Pressable} from 'react-native'
import React from 'react'
import { SvgProps } from 'react-native-svg';
import color from '@cloneApp/utils/color';
import { screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';

type Props = {
    text?:string,
    Icon?: React.FC<SvgProps>;
    backIcon?: React.FC<SvgProps>;
    isBackIconPressed:(value:boolean)=>void;
    style?:{
        mainView?: StyleProp<ViewStyle>;
        HeadingTextStyle?: StyleProp<TextStyle>;
    }
}

 export const HeadingCompnent = (props: Props) => {
  return (
    <View style={[props.style?.mainView,styles.defaultMainView]}>
        <Pressable 
        onPress={()=>props.isBackIconPressed(true)}
        style={styles.backicon}>  {props.backIcon && <props.backIcon />}</Pressable>
      <View style={styles.headingView}>
      {props.text && <Text style={[props.style?.HeadingTextStyle,styles.defaultHeadingTextStyle]}>{props.text}</Text>}
      </View>
      {props.Icon && <props.Icon/>}
    </View>
  )
}
const styles = StyleSheet.create({
    defaultMainView: {
        backgroundColor:color.Netual_White_Light,
        width:vw(screenWidth),
        flexDirection:'row',
        height:vh(88),
      
    },
    defaultHeadingTextStyle: {
        fontSize:vh(18),
        fontFamily:fonts.RobotoSemiBold,
        color:color.Black,
       textAlign:'center',
       alignSelf:'center'
    },
    headingView:{
        justifyContent:'center',
        alignItems:'center',
        width:vw(screenWidth*0.8),
        marginTop:vh(35)
       
    },
    backicon:{
        justifyContent:'center',
        alignItems:'center',
        width:vw(screenWidth*0.1), 
        marginTop:vh(35)

    }
    
})