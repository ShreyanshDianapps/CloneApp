import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { screenNames } from '../utils/screenNames';
import { HomeRouter } from './HomeRouter';
import { BottomNavigationStack } from '../utils/type';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

import { normalize, vh, vw } from '../utils/dimensions';
// import color from '../utils/color';
// import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { BagFocuedIcon, BagIcon, BlackHeartIcon, FavoriteTab, HomeFocuedIcon, HomeTabIcon, ProfileFocusedIcon, ProfileUnFocuedIcon, ShopFocuedIcon, ShopTabIcon } from '@cloneApp/utils/localsvg';
import { ShopRouter } from './ShopRouter';

import { BagRouter } from './BagRouter';
import { FavoriteRouter } from './FavoriteRouter';
import { ProfileRouter } from './ProfileRouter';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';

const Bottom = createBottomTabNavigator<BottomNavigationStack>();
const hideBottomTab = (route:Partial<Route<string>>)=>{
  const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [
      screenNames.FilterScreen,
      screenNames.BrandsScreen,
      screenNames.BottomSheetSortScreen,
      screenNames.AdditionalInformation,
    ];
    return !hideOnScreens.includes(routeName);
};


export const BottomNavigation = () => {
  return (
    <Bottom.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: hideBottomTab(route) ? styles.tabBarStyle : { display: 'none' }, // Correct usage of route
    })}
  >
      {/* Home Screen */}
      <Bottom.Screen
        name={screenNames.HomeRouter}
        component={HomeRouter}
        options={{

          tabBarIcon: ({ focused }) => (
            <View style={styles.barStyle}>
              {focused ? <HomeFocuedIcon /> : <HomeTabIcon/>}
             <Text style={[styles.textStyle,{color:focused ? color.PrimaryRed : color.Gray3}]}>{strings.Home}</Text>
            </View>
          ),
        }}
      />
      {/* Floating Save Button */}
      <Bottom.Screen
        name={screenNames.ShopRouter}

        component={ShopRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.barStyle}>
              {focused ? <ShopFocuedIcon/> : <ShopTabIcon/>}
              <Text style={[styles.textStyle,{color:focused ? color.PrimaryRed : color.Gray3}]}>{strings.shop}</Text>
            </View>
          ),
        }}
      />
       <Bottom.Screen
        name={screenNames.BagRouter}
        component={BagRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.barStyle}>
               {focused ? <BagFocuedIcon /> : <BagIcon/>}
               <Text style={[styles.textStyle,{color:focused ? color.PrimaryRed : color.Gray3}]}>{strings.bag}</Text>

            </View>
          ),
        }}
      />
      <Bottom.Screen
        name={screenNames.FavoriteRouter}
        component={FavoriteRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.barStyle}>

          {focused ? <BlackHeartIcon /> : <FavoriteTab/>}
          <Text style={[styles.textStyle,{color:focused ? color.PrimaryRed : color.Gray3}]}>{strings.favorite}</Text>
            </View>
          ),
        }}
      />
       <Bottom.Screen
        name={screenNames.ProfileRouter}
        component={ProfileRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.barStyle} >

          {focused ? <ProfileFocusedIcon /> : <ProfileUnFocuedIcon />}
          <Text style={[styles.textStyle,{color:focused ? color.PrimaryRed : color.Gray3}]}>{strings.profile}</Text>
            </View>
          ),
        }}
      />

    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    // position: 'absolute',

    height: vh(70),
  },
  textStyle:{

    fontSize:normalize(12),

    marginTop:vh(3),
  },
  barStyle:{
    marginTop:vh(15),
    width:vw(50),
   alignItems:'center',


  },


});

