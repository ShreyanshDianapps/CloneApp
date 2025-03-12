import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  ShopNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';
import {  MainShopScreen, SelectedCategoryProductScreen } from '@cloneApp/modules';
const Shop = createStackNavigator<ShopNavigationStack>();
export const ShopRouter = () => {
  return (
    <Shop.Navigator screenOptions={{ headerShown: false }}>
     <Shop.Screen name={screenNames.MainShopScreen} component={MainShopScreen}/>
     <Shop.Screen name={screenNames.SelectedCategoryProductScreen} component={SelectedCategoryProductScreen}/>
    </Shop.Navigator>
  );
};
