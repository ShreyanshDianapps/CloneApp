import React from 'react';
import { View, Text, StyleSheet, Image, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Custom Imports

import colors from '@cloneApp/utils/color';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import localPngImages from '@cloneApp/utils/localPngImages';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  headerRight?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
}
/**
 * CustomHeader Component
 *
 * A reusable header component that can be used to display a title and optional back button.
 *
 * @param {string} title - The title text to display in the header
 * @param {Function} onBackPress - The function to call when the back button is pressed
 * @param {ReactNode} headerRight - Optional right side content for the header
 * @param {StyleProp<ViewStyle>} headerStyle - Optional style for the header container
 */
export const CustomHeader: React.FC<CustomHeaderProps> = ({ title, onBackPress, headerRight, headerStyle }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Default back press functionality, go back to the previous screen
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[
      styles.headerContainer,
      { paddingTop: insets.top + vh(Platform.OS === 'ios' ? 5 : 15) },
      ...(Array.isArray(headerStyle) ? headerStyle : [headerStyle || {}]),
    ]}>
      <Pressable hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={handleBackPress} style={styles.backButton}>
        <Image source={localPngImages.backIcon} style={styles.icon} resizeMode="contain"/>
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightButtonContainer}>
        {headerRight}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(16),
    backgroundColor: colors.Neutral_White,
  },
  backButton: {
    marginRight: vw(10),
  },
  icon: {
    width:vw(7),
    height:vh(12),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: normalize(16),
    color: colors.Black,
    fontFamily: fonts.RobotoRegular,
    flex: 1,
  },
  rightButtonContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
