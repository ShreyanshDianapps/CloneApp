import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  HomeNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';
import { MainHomeScreen } from '@cloneApp/modules';
const Home = createStackNavigator<HomeNavigationStack
>();

export const HomeRouter = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
     <Home.Screen name={screenNames.MainHomeScreen} component={MainHomeScreen}/>
    </Home.Navigator>
  );
};
