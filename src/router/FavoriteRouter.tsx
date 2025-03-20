import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import { FavNavigationStack } from '@cloneApp/utils/type';
import { AdditionalInformation, BottomSheetReviwComp, BottomSheetSortScreen, BrandsScreen, FilterScreen, MainFavorites, ProductScreen } from '@cloneApp/modules';

const Fav = createStackNavigator<FavNavigationStack>();

export const FavoriteRouter = () => {
  return (
    <Fav.Navigator screenOptions={{ headerShown: false }}>
    <Fav.Screen name={screenNames.MainFavorites} component={MainFavorites}/>
   <Fav.Screen name={screenNames.FilterScreen} component={FilterScreen}/>
        <Fav.Screen name={screenNames.BrandsScreen} component={BrandsScreen}/>
        <Fav.Screen
        options={{
         presentation: 'transparentModal',
       }}
        name={screenNames.BottomSheetSortScreen} component={BottomSheetSortScreen}/>
        <Fav.Screen name={screenNames.ProductScreen} component={ProductScreen}/>
        <Fav.Screen name={screenNames.AdditionalInformation} component={AdditionalInformation}/>
        <Fav.Screen
         options={{
           presentation: 'transparentModal',
         }} name={screenNames.BottomSheetReviwComp} component={BottomSheetReviwComp}/>
    </Fav.Navigator>
  );
};
