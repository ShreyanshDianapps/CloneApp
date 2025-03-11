
import React from 'react';
import { RootNavigationStack } from '@cloneApp/utils/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import { AuthenticationRouter } from './AuthenticationRouter';
const RootStack = createNativeStackNavigator<RootNavigationStack>();
const RootNavigationRouter = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown:false}}>
        <RootStack.Screen name={screenNames.AuthenticationRouter} component={AuthenticationRouter}/>
    </RootStack.Navigator>
  );
};

export default RootNavigationRouter;


