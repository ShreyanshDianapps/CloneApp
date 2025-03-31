import React, { useState, forwardRef, useEffect, useRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
//Custom Imports
import colors from '@cloneApp/utils/color';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
// import localImages from '@cloneApp/utils/localImages';
import strings from '@cloneApp/utils/strings';

type CustomTextInputProps = {
  label?: string;
  errorMessage?: string;
  isPassword?: boolean;
  isEmail?: boolean;
  isRequired?: boolean;
  onChangeText?: (text: string) => void;
  disabled?: boolean
  infoToolTip?: boolean;
  infoToolTipText?: string;
  inputContainerStyle?: object;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
  allowDecimal?: boolean;
  isCurrency?: boolean;
} & React.ComponentProps<typeof TextInput>;

/**
 * CustomTextInput Component
 *
 * A reusable text input component that can be used to collect user input.
 *
 * @param {string} label - The label text to display above the input
 * @param {string} errorMessage - The error message to display below the input
 * @param {boolean} isPassword - Whether the input should be a password field
 * @param {boolean} isEmail - Whether the input should be an email field
 * @param {boolean} isRequired - Whether the input is required
 * @param {Function} onChangeText - The function to call when the input value changes
 * @param {ViewStyle} style - The style to apply to the input container
 * @param {boolean} disabled - Whether the input is disabled
 * @param {boolean} infoToolTip - Whether the info tool tip is shown
 * @param {string} infoToolTipText - The text to display in the tooltip
 * @param {KeyboardTypeOptions} keyboardType - The keyboard type to use for the input
 * @param {Function} onSubmitEditing - The function to call when the input is submitted
 * @param {KeyboardTypeOptions} returnKeyType - The return key type to use for the input
 * @param {object} inputContainerStyle - The style to apply to the input container
 * @param {boolean} multiline - Whether the input should be multiline
 * @param {number} maxLength - The maximum length of the input
 * @param {string} placeholder - The placeholder text for the input
 * @param {boolean} allowDecimal - Whether the input should allow decimal values
 * @param {boolean} isCurrency - Whether the input should be a currency input
 */
export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(({
  label,
  errorMessage,
  isPassword = false,
  isEmail = false,
  isRequired = false,
  onChangeText,
  style,
  disabled,
  infoToolTip = false,
  infoToolTipText,
  keyboardType = 'default',
  onSubmitEditing,
  returnKeyType,
  inputContainerStyle,
  multiline = false,
  maxLength = 10000,
  placeholder,
  allowDecimal = false,
  isCurrency = false,
  ...props
}, ref) => {
  const [isSecure, setIsSecure] = useState(isPassword);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Add refs for positioning
  const containerRef = useRef<View>(null);
  const tooltipRef = useRef<View>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  // Toggle password visibility
  const togglePasswordVisibility = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIsSecure((prevState) => !prevState);
  };

  // Handle input change and validate
  const validateInput = (text: string) => {
    let sanitizedText = text;
    if ([strings.age].includes(label || '')) {
      sanitizedText = text.replace(/[^0-9]/g, '');
    } else if (keyboardType === 'numeric' || keyboardType === 'number-pad') {
      if (allowDecimal) {
        // First remove all non-numeric and non-decimal characters
        sanitizedText = text.replace(/[^0-9.]/g, '');
        // Handle decimal points
        const parts = sanitizedText.split('.');
        if (parts.length > 2) {
          sanitizedText = parts[0] + '.' + parts.slice(1).join('');
        }
        // Ensure the value matches a valid number format
        if (!/^\d*\.?\d*$/.test(sanitizedText)) {
          sanitizedText = value; // Keep previous valid value if new input is invalid
        }
      } else {
        sanitizedText = text.replace(/[^0-9]/g, '');
      }
    }
    setValue(sanitizedText);
    if (onChangeText) {
      onChangeText(sanitizedText);
    }
  };

  /**
   * Gets the border color of the input based on the following conditions:
   * - If there is an error message, the border color is red.
   * - If the input is focused or has a value, the border color is black.
   * - Otherwise, the border color is the default input border color.
   * @returns The border color as a string.
   */
  const getInputBorderColor = () => {
    if (errorMessage) {return colors.red;}
    if (focused || value) {return colors.Black;}
    return colors.Gray2;
  };

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const inputStyle = [
    styles.input,
    style,
    { borderColor: getInputBorderColor() },
    multiline && styles.multilineInput,
  ];

  const handleTooltipPress = () => {
    if (tooltipRef.current && containerRef.current) {
      tooltipRef.current.measureLayout(
        containerRef.current,
        (x, y, width) => {
          setTooltipPosition({
            top: y - vh(12),
            left: x + width + vw(8),
          });
          setTooltipVisible(!tooltipVisible);
        },
        () => console.log('measurement failed')
      );
    }
  };

  return (
    <View ref={containerRef} style={[styles.container, inputContainerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {isRequired && <Text style={styles.asterisk}>*</Text>}
          {infoToolTip && (
            <TouchableOpacity
              ref={tooltipRef}
              onPress={handleTooltipPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {/* <Image source={localImages.infoToolTip} style={styles.infoToolTip} resizeMode="contain" /> */}
            </TouchableOpacity>
          )}
          {tooltipVisible && infoToolTipText && (
            <View
              style={[
                styles.tooltipContainer,
                {
                  top: tooltipPosition.top,
                  left: tooltipPosition.left,
                },
              ]}
            >
              <View style={styles.tooltipArrow} />
              <Text style={styles.tooltipText}>{infoToolTipText}</Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.inputContainer}>
        {isCurrency && (
          <View style={styles.currencyContainer}>
            <Text style={styles.currencySymbol}>$</Text>
          </View>
        )}
        <TextInput
          {...props}
          ref={ref}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.Gray3}
          secureTextEntry={isPassword && isSecure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={validateInput}
          style={[
            disabled ? styles.disabledInput : inputStyle,
            isCurrency && styles.currencyInput,
          ]}
          keyboardType={isEmail ? 'email-address' : keyboardType === 'numeric' ? 'decimal-pad' : keyboardType ?? 'default'}
          autoCapitalize={isEmail ? 'none' : 'sentences'}
          editable={!disabled}
          autoCorrect={false}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType ?? 'done'}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          maxLength={maxLength}
        />
        {isPassword && (
          <Pressable hitSlop={20} style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            {/* <Image source={isSecure ? localImages.hideEye : localImages.showEye} resizeMode="contain" /> */}
          </Pressable>
        )}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: vh(16),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(4),
  },
  label: {
    fontSize: normalize(12),
    fontFamily: fonts.RobotoRegular,
    color: colors.Black,
  },
  asterisk: {
    color: colors.red,
    marginLeft: vw(2),
  },
  inputContainer: {
  },
  input: {
    height: normalize(48),
    backgroundColor: colors.Neutral_White,
    borderWidth: normalize(1),
    borderColor: colors.Gray2,
    paddingHorizontal: normalize(16),
    fontSize: normalize(14),
    fontFamily: fonts.RobotoRegular,
    color: colors.Black,
    textAlignVertical: 'center',
  },
  disabledInput: {
    minHeight: vh(48),
    borderWidth: normalize(0.8),
    borderColor: colors.Gray3,
    paddingHorizontal: normalize(16),
    fontSize: normalize(14),
    backgroundColor: colors.Gray2,
    paddingRight: normalize(35),
    fontFamily: fonts.RobotoRegular,
    textAlignVertical: 'center',
    paddingVertical: normalize(12),
  },
  errorText: {
    color: colors.red,
    fontSize: normalize(12),
    marginTop: vh(8),
    fontFamily: fonts.RobotoRegular,
  },
  eyeIcon: {
    position: 'absolute',
    right: normalize(10),
    top: '60%',
    transform: [{ translateY: -12 }],
  },
  infoToolTip: {
    width: vw(12),
    height: vw(12),
    marginLeft: vw(8),
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: colors.Black,
    padding: vw(8),
    borderRadius: vw(4),
    zIndex: 1000,
  },
  tooltipArrow: {
    position: 'absolute',
    left: -vw(8),
    top: vh(12),
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: vw(8),
    borderRightWidth: vw(8),
    borderBottomWidth: vw(8),
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: colors.Black,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  tooltipText: {
    color: colors.Neutral_White,
    fontSize: normalize(12),
    fontFamily: fonts.RobotoRegular,
    lineHeight: vh(16),
  },
  multilineInput: {
    minHeight: normalize(48),
    maxHeight: normalize(180),
    height: 'auto',
    textAlignVertical: 'center',
    paddingTop: normalize(14),
    paddingBottom: normalize(14),
  },
  multilinePlaceholder: {
    paddingTop: normalize(12),
  },
  currencyContainer: {
    position: 'absolute',
    left: normalize(16),
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -normalize(9) }],
  },
  currencySymbol: {
    fontSize: normalize(14),
    fontFamily: fonts.RobotoRegular,
    color: colors.Neutral_Sub,
  },
  currencyInput: {
    paddingLeft: normalize(32),
  },
});
