import { StyleSheet, Text, ViewStyle, TextStyle, Image, ImageSourcePropType, ImageStyle, Pressable } from 'react-native';
import React, { useCallback, useRef } from 'react';
//Custom Imports
import colors from '@cloneApp/utils/color';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';

type Props = {
    onPress: () => void; // Function to be executed when button is pressed
    title?: string; // Optional button title to make the component more reusable
    backgroundColor?: string; // Optional background color for the button
    textColor?: string; // Optional color for the button text 
    style?: ViewStyle | ViewStyle[]; // Custom style for the button
    textStyle?: TextStyle | TextStyle[]; // Custom style for the button text
    icon?: ImageSourcePropType; // Optional icon for the button
    imgStyle?: ImageStyle | ImageStyle[]; // Custom style for the icon
    debounceTime?: number; // Optional debounce time in milliseconds
    isDisabled?: boolean; // Optional disabled state for the button
}

export const CustomButton = ({
    onPress,
    title = 'Login',
    backgroundColor = colors.Black,
    textColor = colors.Neutral_White,
    style,
    textStyle,
    icon,
    imgStyle,
    debounceTime = 500, // Default 500ms debounce
    isDisabled = false, // Default disabled state for the button
}: Props) => {
    const lastPressTimeRef = useRef<number>(0);

    const handlePress = useCallback(() => {
        const currentTime = Date.now();

        if (currentTime - lastPressTimeRef.current >= debounceTime) {
            lastPressTimeRef.current = currentTime;
            onPress();
        }
    }, [onPress, debounceTime]);

    return (
        <Pressable
            disabled={isDisabled}
            style={[styles.button, { backgroundColor }, isDisabled && styles.disabledButton, style]}
            onPress={handlePress}>
            {icon && <Image source={icon} style={[styles.icon,imgStyle]} resizeMode="contain"/>}
            <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingVertical: vh(12),
        paddingHorizontal: vw(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: normalize(14),
        fontFamily:fonts.RobotoRegular,
    },
    icon: {
        width: normalize(16),
        height: normalize(16),
        marginRight: vw(8),
    },
    disabledButton: {
        opacity: 0.5,
        backgroundColor: colors.Gray1,
    },
});
