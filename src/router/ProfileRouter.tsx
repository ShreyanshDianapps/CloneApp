import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import { ProfileNavigationStack } from '@cloneApp/utils/type';
import { DetailsScreen, MainProfileScreen, OrdersScreen } from '@cloneApp/modules';
import MyReviewsScreen from '@cloneApp/modules/profile/screens/MyReviewsScreen';

const Profile = createStackNavigator<ProfileNavigationStack>();
export const ProfileRouter = () => {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
     <Profile.Screen name={screenNames.MainProfileScreen} component={MainProfileScreen}/>
     <Profile.Screen name={screenNames.OrdersScreen} component={OrdersScreen}/>
     <Profile.Screen name={screenNames.MyReviewsScreen} component={MyReviewsScreen}/>
     <Profile.Screen name={screenNames.DetailsScreen} component={DetailsScreen}/>
    </Profile.Navigator>
  );
};
