import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { screenNames } from '@cloneApp/utils/screenNames';
import { MyBagScreen } from '@cloneApp/modules';
import { BagNavigationStack } from '@cloneApp/utils/type';

const Bag = createStackNavigator<BagNavigationStack>();

export const BagRouter = () => {
  return (
    <Bag.Navigator screenOptions={{ headerShown: false }}>
     <Bag.Screen name={screenNames.MyBagScreen} component={MyBagScreen}/>
    
    </Bag.Navigator>
  );
};
