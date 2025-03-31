import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
//utils import
import { normalize, vh, vw } from '@cloneApp/utils/dimensions'
import color from '@cloneApp/utils/color'
import strings from '@cloneApp/utils/strings'
import { ProfileNavigationStack } from '@cloneApp/utils/type'
import { screenNames } from '@cloneApp/utils/screenNames'
import fonts from '@cloneApp/utils/fonts'
//components import
import { CustomButton } from '../components/CustomButton'
import { CustomHeader } from '@cloneApp/components/CustomHeader'
//naigation Import
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks'
import { setLanguage } from '@cloneApp/modules/authentication/authenticatinSlice'
import { useTranslation } from 'react-i18next';

type CustomCheckBoxProps = {
  value: boolean
}
const CustomCheckBox = (props: CustomCheckBoxProps) => {
  return (
    <View style={styles.checkBox} >
      {props.value && <View style={styles.selectedView}></View>}
    </View>
  )
}

type Props = {
  navigation: NativeStackNavigationProp<ProfileNavigationStack, 'SelectLanguageScreen'>;
}

export const SelectLanguageScreen = (props: Props) => {
  const languageArray = ['English', 'Hindi'];// put in constant file
  const { language } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  // Initialize selected index based on language
  const [selectedIndex, setSelectedIndex] = useState<number|null>();
  // Sync language with i18n on mount or language change
  useEffect(() => {
    if(language){
      setSelectedIndex(language === 'en' ? 0 : 1)
    i18n.changeLanguage(language);
    }
  }, [language]);

  const handlePress = () => {
    const selectedLang = selectedIndex === 0 ? 'en' : 'hi';
    // Update Redux State
    dispatch(setLanguage(selectedLang));
    // Change Language in i18n
    i18n.changeLanguage(selectedLang);
    // Navigate to the next screen
    props.navigation.navigate(screenNames.PhoneNumberScreen);
  };
  const handleLanguagePress = useCallback((index:number) => {
      setSelectedIndex(index)
  }, [selectedIndex]);
  return (
    <View >
      <CustomHeader title={strings.selectLanguage} headerStyle={styles.header} />
      <View style={styles.languageSelectContainer}>
        <Text style={styles.text}>{strings.choseYourPreferedLanguage}</Text>
        <View>
          {languageArray.map((item, index) => (
            <Pressable key={index} style={styles.languageSelectView} onPress={()=>handleLanguagePress(index)}>
              <CustomCheckBox
                value={index === selectedIndex}
              />
              <Text style={styles.languageText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handlePress}
          title={t(strings.next)}
          style={styles.buttonView}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: vh(111),
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: color.Neutral_White// use one way either _ or camelcase for keys
  },
  text: {
    fontFamily: fonts.RobotoSemiBold,// variable names must be camelcase
    fontSize: normalize(18)
  },
  languageSelectContainer: {
    marginTop: vh(20),
    gap: normalize(20),
    marginHorizontal: vw(16)
  },
  languageSelectView: {
    marginBottom: vh(16),
    height: vh(51),
    width: vw(347),
    borderRadius: normalize(10),
    borderWidth: normalize(0.5),
    alignSelf: 'center',
    borderColor: color.Gray3,//numbers in keys should be avoided
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: vw(12),
    gap: normalize(8)
  },
  checkBox: {
    height: vh(18),
    width: vw(18),
    borderRadius: normalize(9),
    borderWidth: normalize(0.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedView: {
    height: vh(10),
    width: vw(10),
    borderRadius: normalize(5),
    backgroundColor: color.Black,
  },
  languageText: {
    fontSize: normalize(18),
    fontFamily: fonts.RobotoRegular,
    color: color.languageTextColor
  },
  buttonContainer: {
    marginTop: vh(421),
    height: vh(80),
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: color.Neutral_White,//change name
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    width: vw(343),
    height: vh(44),
    alignSelf: 'center',
    borderRadius: normalize(4)
  },
  buttonText: {
    fontFamily: fonts.RobotoSemiBold,//use camelcase
    fontSize: normalize(16)
  }
});
