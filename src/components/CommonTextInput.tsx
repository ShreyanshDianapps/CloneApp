import {
    StyleSheet, Text, View, TextStyle, StyleProp, TextInput, ViewStyle,
    Pressable,
} from 'react-native';
import React, { useState } from 'react';
// Utils import
import fonts from '@cloneApp/utils/fonts';
import { normalize, vh, vw } from '../utils/dimensions';
import color from '@cloneApp/utils/color';
import { EyeHideIcon, EyeShowIcon } from '@cloneApp/utils/localsvg';
import { SvgProps } from 'react-native-svg';
// import { EyeHideIcon, EyeShowIcon, SearchBarIcon } from '../utils/localSvgImages';
// Types
type Props = {
    text?: string; // Label text
    searchIcon?:React.FC<SvgProps>
    placeholder?: string; // Placeholder text
    value: string; // Input value
    style?: {
        mainView?: StyleProp<ViewStyle>;
        mainViewInput?: StyleProp<ViewStyle>;
        HeadingTextStyle?: StyleProp<TextStyle>;
        InputTextStyle?: StyleProp<TextStyle>;
    };

    onChange: (value: string) => void; // Function triggered on text change
    secureTextEntry?: boolean; // For password fields

};

export const CommonTextInput = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={[props.style?.mainView]}>
            {/* Input Label */}
            {props.text && <Text style={[styles.headingText, props.style?.HeadingTextStyle]}>{props.text}</Text>}

            <View style={[props.style?.mainViewInput]}>
                {/* Search Icon */}
              {props.searchIcon && <props.searchIcon/>}
                {/* Text Input */}
                <TextInput
                    placeholder={props.placeholder}
                    value={props.value}
                    style={[styles.inputTextStyle, props.style?.InputTextStyle]}
                    onChangeText={props.onChange || (() => { })}
                    returnKeyType="next"
                    secureTextEntry={props.secureTextEntry ? !showPassword : false}
                />

                {props.secureTextEntry ? showPassword ? <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.passwordIcon}>
                    <EyeShowIcon height={vh(25)} width={vw(25)} />
                </Pressable> : <Pressable onPress={() => setShowPassword(!showPassword) } style={styles.passwordIcon}><EyeHideIcon height={vh(25)} width={vw(25)} /></Pressable> : null}
            </View>
        </View>
    );
};
// Styles
const styles = StyleSheet.create({
    mainView: {

    },
    headingText: {
        color: color.Black,
        marginBottom: vh(5),
    },
    inputTextStyle: {

        fontSize: normalize(11),
        fontFamily: fonts.RobotoRegular,

    },
    iconStyle: {
        marginRight: vw(5),
    },
    passwordIcon:{
        position:'absolute',
        top:vh(-10),
        alignSelf:'flex-end',
    },
});
