import React, { useState, useEffect } from 'react';
import { RootNavigationStack } from '@cloneApp/utils/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import { AuthenticationRouter } from './AuthenticationRouter';
import { BottomNavigation } from './BottomNavigation';
import { useAppSelector } from '@cloneApp/utils/hooks';
import { SplashScreen } from '@cloneApp/modules/splash';


const RootStack = createNativeStackNavigator<RootNavigationStack>();

const RootNavigationRouter = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (isLogin) {
      // Show Splash Screen for 30 seconds when logged in
      const timer = setTimeout(() => setShowSplash(false), 30000000);
      return () => clearTimeout(timer);
    }
  }, [isLogin]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isLogin ? (
        <RootStack.Screen
          name={screenNames.AuthenticationRouter}
          component={AuthenticationRouter}
        />
      ) : showSplash ? (
        <RootStack.Screen
          name={screenNames.SplashScreen}
          component={SplashScreen}
        />
      ) : (
        <RootStack.Screen
          name={screenNames.BottomNavigation}
          component={BottomNavigation}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigationRouter;
