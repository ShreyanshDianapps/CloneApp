import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CommonButton } from '@cloneApp/components/CommonButton';
import strings from '@cloneApp/utils/strings';
import { normalize,  screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';

type ApplyChangesProps={
    isApplyPressed:()=>void
    isDiscardPressed:()=>void
}
export const ApplyChangesComponent = (props:ApplyChangesProps) => {
  return (
        <View style={styles.mainView}>
          <CommonButton
            text={strings.discard}
            onPress={props.isDiscardPressed}
            style={{ mainView: styles.mainButtonView }}
          />
          <CommonButton
            text={strings.apply}

            onPress={props.isApplyPressed}
            style={{ mainView: styles.mainButtonViewDiscard ,
                InputTextStyle:styles.InputTextStyle,
            }}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    position:'absolute',
    top:vh(710),
    width:vw(screenWidth),
    flexDirection: 'row',
    height: vh(104), // ✅ Fixed height to ensure visibility
    justifyContent: 'space-evenly',
    paddingHorizontal: vw(16),
    alignItems: 'center',
    backgroundColor:color.Neutral_White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  mainButtonView: {
    width: vw(160),
    height: vh(36),
    borderRadius:normalize(30),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    borderWidth:normalize(2),
    shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,

  },
  mainButtonViewDiscard:{
    width: vw(160),
    height: vh(36),
    borderRadius:normalize(30),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.PrimaryRed,
    shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
  },
  InputTextStyle:{
    color:color.Neutral_White,
    fontSize:normalize(14),
    fontFamily:fonts.RobotoSemiBold,
  },
});

export default ApplyChangesComponent;
