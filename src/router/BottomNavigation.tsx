import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { screenNames } from '../utils/screenNames';
import { HomeRouter } from './HomeRouter';
import { BottomNavigationStack } from '../utils/type';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { normalize, vh, vw } from '../utils/dimensions';
import {
  BagFocuedIcon, BagIcon, BlackHeartIcon, FavoriteTab,
  HomeFocuedIcon, HomeTabIcon, ProfileFocusedIcon,
  ProfileUnFocuedIcon, ShopFocuedIcon, ShopTabIcon,
} from '@cloneApp/utils/localsvg';
import { ShopRouter } from './ShopRouter';
import { BagRouter } from './BagRouter';
import { FavoriteRouter } from './FavoriteRouter';
import { ProfileRouter } from './ProfileRouter';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';

const Bottom = createBottomTabNavigator<BottomNavigationStack>();

const hideBottomTab = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens = [
    screenNames.FilterScreen,
    screenNames.BrandsScreen,
    screenNames.BottomSheetSortScreen,
    screenNames.AdditionalInformation,
    screenNames.SelectLanguageScreen
  ];
  return !hideOnScreens.includes(routeName);
};

// Create separate icon components
const HomeTabBarIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.barStyle}>
    {focused ? <HomeFocuedIcon /> : <HomeTabIcon />}
    <Text style={[styles.textStyle, { color: focused ? color.PrimaryRed : color.Gray3 }]}>
      {strings.Home}
    </Text>
  </View>
);

const ShopTabBarIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.barStyle}>
    {focused ? <ShopFocuedIcon /> : <ShopTabIcon />}
    <Text style={[styles.textStyle, { color: focused ? color.PrimaryRed : color.Gray3 }]}>
      {strings.shop}
    </Text>
  </View>
);

const BagTabBarIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.barStyle}>
    {focused ? <BagFocuedIcon /> : <BagIcon />}
    <Text style={[styles.textStyle, { color: focused ? color.PrimaryRed : color.Gray3 }]}>
      {strings.bag}
    </Text>
  </View>
);

const FavoriteTabBarIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.barStyle}>
    {focused ? <BlackHeartIcon /> : <FavoriteTab />}
    <Text style={[styles.textStyle, { color: focused ? color.PrimaryRed : color.Gray3 }]}>
      {strings.favorite}
    </Text>
  </View>
);

const ProfileTabBarIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.barStyle}>
    {focused ? <ProfileFocusedIcon /> : <ProfileUnFocuedIcon />}
    <Text style={[styles.textStyle, { color: focused ? color.PrimaryRed : color.Gray3 }]}>
      {strings.profile}
    </Text>
  </View>
);

export const BottomNavigation = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: hideBottomTab(route) ? styles.tabBarStyle : { display: 'none' },
      })}
    >
      <Bottom.Screen
        name={screenNames.HomeRouter}
        component={HomeRouter}
        options={{
          tabBarIcon: (props) => <HomeTabBarIcon {...props} />,
        }}
      />
      <Bottom.Screen
        name={screenNames.ShopRouter}
        component={ShopRouter}
        options={{
          tabBarIcon: (props) => <ShopTabBarIcon {...props} />,
        }}
      />
      <Bottom.Screen
        name={screenNames.BagRouter}
        component={BagRouter}
        options={{
          tabBarIcon: (props) => <BagTabBarIcon {...props} />,
        }}
      />
      <Bottom.Screen
        name={screenNames.FavoriteRouter}
        component={FavoriteRouter}
        options={{
          tabBarIcon: (props) => <FavoriteTabBarIcon {...props} />,
        }}
      />
      <Bottom.Screen
        name={screenNames.ProfileRouter}
        component={ProfileRouter}
        options={{
          tabBarIcon: (props) => <ProfileTabBarIcon {...props} />,
        }}
      />
    </Bottom.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: vh(70),
  },
  textStyle: {
    fontSize: normalize(12),
    marginTop: vh(3),
  },
  barStyle: {
    marginTop: vh(15),
    width: vw(50),
    alignItems: 'center',
  },
});
