import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { screenNames } from '../utils/screenNames';
import { HomeRouter } from './HomeRouter';
import { BottomNavigationStack } from '../utils/type';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

import { vh, vw } from '../utils/dimensions';
// import color from '../utils/color';
// import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { BagIcon, BlackHeartIcon, HeartIcon, HomeTabIcon, ProfileFocusedIcon, ProfileUnFocuedIcon, ShopTabIcon } from '@cloneApp/utils/localsvg';
import { ShopRouter } from './ShopRouter';

import { BagRouter } from './BagRouter';
import { FavoriteRouter } from './FavoriteRouter';
import { ProfileRouter } from './ProfileRouter';

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
            <View style={[focused ? styles.notFocusedStyle : styles.iconStyle]}>
              {focused && <View style={styles.activeIndicator} />}
              <HomeTabIcon />
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
            <View style={[focused ? styles.notFocusedStyle : styles.iconStyle]}>
               {focused && <View style={styles.activeIndicator} />}
          <ShopTabIcon/>
            </View>
          ),
        }}
      />
       <Bottom.Screen
        name={screenNames.BagRouter}
        component={BagRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[focused ? styles.notFocusedStyle : styles.iconStyle]}>
               {focused && <View style={styles.activeIndicator} />}
          <BagIcon/>
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name={screenNames.FavoriteRouter}
        component={FavoriteRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View >

          {focused ? <BlackHeartIcon /> : <HeartIcon height={vh(30)} width={vw(30)}/>}
            </View>
          ),
        }}
      />
       <Bottom.Screen
        name={screenNames.ProfileRouter}
        component={ProfileRouter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View >

          {focused ? <ProfileFocusedIcon /> : <ProfileUnFocuedIcon />}
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
    height: vh(80),
  },
  activeIndicator: {
    width: vw(40),
    height: vw(5),
    // backgroundColor: color.greenColor,
    borderRadius: vw(5),
    marginBottom: vh(5),
  },
  iconStyle: {
    alignSelf: 'center',

  },
  notFocusedStyle:{
      justifyContent:'center',
      alignItems:'center',
  },
  floatingButton: {
    top: vh(-25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonCircle: {
    width: vw(60),
    height: vw(60),
    borderRadius: vw(30),
    // backgroundColor: color.greenColor,
    justifyContent: 'center',
    alignItems: 'center',

    // elevation: 6,
  },
});

