import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import strings from '@cloneApp/utils/strings';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { FaceBookIcon, GoogleIcon } from '@cloneApp/utils/localsvg';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';

type Props = {
    text:string,
    isGoogleIconPressed:(value?:boolean)=>void;
    isFaceBookIconPressed:(value?:boolean)=>void

}

 export const CommonBottomComp = (props: Props) => {
  return (
    <View >
      <Text style={styles.upperText}>{strings.or + strings.gap + props.text + strings.gap + strings.withSocialAccout}</Text>
    <View style={styles.buttonView}>
    <CommonButton
    Icon={GoogleIcon}
    onPress=
    {()=>{
       props.isGoogleIconPressed(true);}}
       style={{
        mainView:styles.signInButtonView,
    }}
    />
    <CommonButton
    Icon={FaceBookIcon}
    onPress=
    {()=>{
       props.isFaceBookIconPressed(true);}}
    style={{
        mainView:styles.signInButtonView,
    }}
    />
    </View>
    </View>
  );
};



const styles = StyleSheet.create({
    upperText:{
            marginTop:vh(100),
          alignSelf:'center',
            fontFamily:fonts.RobotoMedium,
            fontSize:normalize(14),
    },
    buttonView:{
        flexDirection:'row',
        alignSelf:'center',
        marginTop:vh(18),
        gap:normalize(16),
    },
    signInButtonView:{
        width:vw(92),
        height:vh(64),
        borderRadius:normalize(24),
        backgroundColor:color.Neutral_White,
        justifyContent:'center',
        alignItems:'center',

    },
});
