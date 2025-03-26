import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import strings from '@cloneApp/utils/strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import color from '@cloneApp/utils/color';

import localPngImages from '@cloneApp/utils/localPngImages';

// type Props = {}

export const HarshUi = () => {
  return (
    <SafeAreaView>
        <View style={styles.infoContainer}>
      <Text style={styles.aboutWandeRobeText}>{strings.aboutWanderobe}</Text>
      <Text style={styles.travlelLightText}>{strings.travelLightexplor}<Text style={styles.meaningFullText}>{strings.meaningfully}</Text></Text>
      <Text style={styles.longText}>{strings.longText}</Text>
      <Image source={localPngImages.Harsh} style={styles.imageStyle}/>
      </View>

    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    infoContainer:{
        marginHorizontal:vw(16),
        marginTop:vh(22),

    },
    aboutWandeRobeText:{

        fontSize:normalize(20),
        fontFamily:fonts.RobotoRegular,
    },
    travlelLightText:{
        marginTop:vh(12),
            fontFamily:fonts.RobotoRegular,
            fontSize:normalize(32),
            width:vw(290),
            lineHeight:normalize(41.67),
    },
    meaningFullText:{
        fontFamily:fonts.RobotoSemiBold,
        color:color.Primary100,
    },
    longText:{
       fontSize:normalize(14),
       lineHeight:normalize(21),
       fontFamily:fonts.RobotoRegular,
       color:color.Neutral_Sub,
       marginTop:vh(20),

    },
    imageStyle:{
        marginTop:vh(17),
    },
});
