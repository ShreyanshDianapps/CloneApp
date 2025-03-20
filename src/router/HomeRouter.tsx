import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  HomeNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';
import { MainHomeScreen, ProductScreen } from '@cloneApp/modules';
import { HarshUi } from '@cloneApp/modules/home/screens/HarshUi';
const Home = createStackNavigator<HomeNavigationStack
>();

export const HomeRouter = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
     <Home.Screen name={screenNames.MainHomeScreen} component={MainHomeScreen}/>
     <Home.Screen name={screenNames.ProductScreen} component={ProductScreen}/>
     <Home.Screen name={screenNames.HarshUi} component={HarshUi}/>
    </Home.Navigator>
  );
};
