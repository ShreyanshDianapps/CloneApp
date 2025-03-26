import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';
import { vh, vw } from '@cloneApp/utils/dimensions';
import { NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigationStack } from '@cloneApp/utils/type';
import strings from '@cloneApp/utils/strings';
import fonts from '@cloneApp/utils/fonts';
import { ProfilePageCard } from './MainProfileScreen';
import { screenNames } from '@cloneApp/utils/screenNames';
import { rootData } from './SettingBottomScreen';

type Props = {
    navigation: NativeStackNavigationProp<ProfileNavigationStack, 'SettingsScreen'>;
}

export const SettingsScreen = (props: Props) => {
    const sendDataBack = (data:rootData)=>{
        console.log(data);
    };
    return (
        <SafeAreaView >
            <Pressable style={styles.iconView}onPress={props.navigation.goBack}>
                <NavigationBackIcon />
            </Pressable>
            <Text style={styles.settingText}>{strings.settings}</Text>

           <ProfilePageCard titleText={strings.personalInformation} discroptionText={strings.name + ',' + strings.gap + strings.email} onPress={()=>props.navigation.navigate(screenNames.SettingBottomScreen,{value:strings.personal,height:400,sendDataBack})}/>
           <ProfilePageCard titleText={strings.password} discroptionText={strings.changePassword} onPress={()=>{}}/>
           <ProfilePageCard titleText={strings.logOut} discroptionText={strings.changePassword} onPress={()=>props.navigation.navigate(screenNames.SettingBottomScreen,{value:strings.logOut,height:200,sendDataBack})}/>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    iconView: {
        marginHorizontal: vw(20),
    },
    settingText:{
        marginLeft:vw(20),
        fontSize:vw(24),
        fontFamily:fonts.RobotoSemiBold,
        marginTop:vh(20),
        marginBottom:vh(20),
    },
    personalInformationView:{

    },
});
