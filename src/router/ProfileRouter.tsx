import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import { ProfileNavigationStack } from '@cloneApp/utils/type';
import { DetailsScreen, MainProfileScreen, OrdersScreen, SettingBottomScreen, SettingsScreen, TopBarScreen,TabBarLibScreen } from '@cloneApp/modules';
import MyReviewsScreen from '@cloneApp/modules/profile/screens/MyReviewsScreen';
import { OptScreen, PhoneNumberScreen, SelectLanguageScreen } from '@cloneApp/modules/splash';

const Profile = createStackNavigator<ProfileNavigationStack>();
export const ProfileRouter = () => {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
     <Profile.Screen name={screenNames.MainProfileScreen} component={MainProfileScreen}/>
     <Profile.Screen name={screenNames.OrdersScreen} component={OrdersScreen}/>
     <Profile.Screen name={screenNames.MyReviewsScreen} component={MyReviewsScreen}/>
     <Profile.Screen name={screenNames.DetailsScreen} component={DetailsScreen}/>
     <Profile.Screen name={screenNames.TopBarScreen} component={TopBarScreen}/>
     <Profile.Screen name={screenNames.TabBarLibScreen} component={TabBarLibScreen}/>
     <Profile.Screen name={screenNames.SettingsScreen} component={SettingsScreen}/>
     <Profile.Screen name={screenNames.SelectLanguageScreen} component={SelectLanguageScreen}/>
     <Profile.Screen name={screenNames.PhoneNumberScreen} component={PhoneNumberScreen}/>
     <Profile.Screen name={screenNames.OtpScreen} component={OptScreen}/>
     <Profile.Screen
     options={{
      presentation: 'transparentModal',
     }}
     name={screenNames.SettingBottomScreen} component={SettingBottomScreen}/>

    </Profile.Navigator>
  );
};
