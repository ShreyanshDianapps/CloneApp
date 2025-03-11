import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigationStack } from '@cloneApp/utils/type';
import { Login, SignUp } from '@cloneApp/modules/authentication';
import { screenNames } from '@cloneApp/utils/screenNames';

const Auth = createStackNavigator<AuthNavigationStack>();

export const AuthenticationRouter = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
     <Auth.Screen name={screenNames.SignUp} component={SignUp}/>
     <Auth.Screen name={screenNames.Login} component={Login}/>
    </Auth.Navigator>
  );
};
