import {
    StyleSheet,
     Text,
     TextStyle,
     StyleProp,
     ViewStyle,
    Pressable,
} from 'react-native';
import React from 'react';
import { vh, vw } from '@cloneApp/utils/dimensions';
import { SvgProps } from 'react-native-svg';
import color from '@cloneApp/utils/color';

type Props = {
    text?:string,
    Icon?: React.FC<SvgProps>;
     style?: {
            mainView?: StyleProp<ViewStyle>;

            InputTextStyle?: StyleProp<TextStyle>;
        };
        onPress:()=>void
}

export const CommonButton = (props: Props) => {
  return (
    <Pressable
    onPress={props.onPress}
     style={[styles.defaultButtonStyle,props.style?.mainView]}>
        {props.text && <Text style={[props.style?.InputTextStyle]}>{props.text}</Text>}
        {props.Icon && <props.Icon/>}
    </Pressable>
  );
};



const styles = StyleSheet.create({
    defaultButtonStyle:
    {
            backgroundColor:color.Primary100,
            height:vh(40),
            width:vw(343),
    },

});
