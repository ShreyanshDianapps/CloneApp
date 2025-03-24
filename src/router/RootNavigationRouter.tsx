
import React from 'react';
import { RootNavigationStack } from '@cloneApp/utils/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import { AuthenticationRouter } from './AuthenticationRouter';
import { BottomNavigation } from './BottomNavigation';
import { useAppSelector } from '@cloneApp/utils/hooks';
const RootStack = createNativeStackNavigator<RootNavigationStack>();
const RootNavigationRouter = () => {
  const {isLogin} = useAppSelector((state)=>state.auth);
  return (
    <RootStack.Navigator screenOptions={{headerShown:false}}>
      {!isLogin ?
        <RootStack.Screen name={screenNames.AuthenticationRouter} component={AuthenticationRouter}/> :
        <RootStack.Screen name={screenNames.BottomNavigation} component={BottomNavigation}/>}

    </RootStack.Navigator>
  );
};

export default RootNavigationRouter;


