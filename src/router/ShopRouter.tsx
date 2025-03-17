import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {  ShopNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';
import {  BottomSheetSortScreen, BrandsScreen, FilterScreen, MainShopScreen, ProductScreen, SelectedCategoryProductScreen } from '@cloneApp/modules';
const Shop = createStackNavigator<ShopNavigationStack>();
export const ShopRouter = () => {
  return (
    <Shop.Navigator screenOptions={{ headerShown: false }}>
     <Shop.Screen name={screenNames.MainShopScreen} component={MainShopScreen}/>
     <Shop.Screen name={screenNames.SelectedCategoryProductScreen} component={SelectedCategoryProductScreen}/>
     <Shop.Screen name={screenNames.FilterScreen} component={FilterScreen}/>
     <Shop.Screen name={screenNames.BrandsScreen} component={BrandsScreen}/>
     <Shop.Screen
     options={{
      presentation: 'transparentModal',
    }}
     name={screenNames.BottomSheetSortScreen} component={BottomSheetSortScreen}/>
     <Shop.Screen name={screenNames.ProductScreen} component={ProductScreen}/>

    </Shop.Navigator>
  );
};
