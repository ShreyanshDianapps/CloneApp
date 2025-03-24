import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { memo,  useEffect, useState } from 'react';
import strings from '@cloneApp/utils/strings';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import {  useAppSelector } from '@cloneApp/utils/hooks';
import color from '@cloneApp/utils/color';
import { NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';
type ProfilePageCardProps = {
  titleText: string,
  onPress: () => void,
  discroptionText: string
}
export const ProfilePageCard = memo((props: ProfilePageCardProps) => {
  return (
    <Pressable onPress={props.onPress} style={styles.cardStyle}>
      <View >
        <Text style={styles.titleText}>{props.titleText}</Text>
        <Text style={styles.discroptionText}>{props.discroptionText}</Text>
      </View>
      <NavigationBackIcon style={{ transform: [{ rotate: '180deg' }] }} />
    </Pressable>
  );
});

type Props = {
  navigation: NativeStackNavigationProp<ProfileNavigationStack, 'MainProfileScreen'>;
}

export const MainProfileScreen = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { MyOrder, MyReviews } = useAppSelector((state) => state.profile);
  const [forceRender, setForceRender] = useState(false);


  useEffect(() => {
    if (user) {
      setForceRender(!forceRender);
    }

  }, [MyOrder.length, MyReviews.length]);
  return (
    <SafeAreaView >
      <Text style={styles.myPrifileText}>{strings.myProfile}</Text>
      <View style={styles.userProfile_emailView}>
        <Pressable style={styles.profileView}>
          <Text style={styles.ProfileTextView}>{user?.name.charAt(0)}</Text>
        </Pressable>
        <View style={styles.emailView}>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>
      </View>
      {MyOrder.length < 0 ?
        <ProfilePageCard titleText={strings.myOrders}
          discroptionText={strings.noOrdersYet}
          onPress={() => { }} />
        : <ProfilePageCard titleText={strings.myOrders}
          discroptionText={strings.alreadyHave + strings.gap + MyOrder.length + strings.gap + strings.orders}
          onPress={() => {
            props.navigation.navigate(screenNames.OrdersScreen);
          }} />}
      {MyReviews.length < 0 ?
        <ProfilePageCard titleText={strings.myReview}
          discroptionText={strings.noReviwsYet}
          onPress={() => { }} />
        : <ProfilePageCard titleText={strings.myReview}
          discroptionText={strings.review + strings.gap + strings.for + strings.gap + MyReviews.length + strings.gap + strings.items}
          onPress={() =>  props.navigation.navigate(screenNames.MyReviewsScreen)} />}

      <ProfilePageCard titleText={strings.settings}
        discroptionText={strings.password + ',' + strings.gap + strings.notifications}
        onPress={()=>props.navigation.navigate(screenNames.SettingsScreen)} />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  myPrifileText: {
    marginLeft: vh(16),
    fontSize: normalize(34),
    fontFamily: fonts.RobotoSemiBold,
  },
  userProfile_emailView: {
    marginHorizontal: vh(16),
    marginTop: vh(24),
    flexDirection: 'row',
    marginBottom: vh(28),
  },
  profileView: {
    height: vh(64),
    width: vw(64),
    borderRadius: normalize(32),
    backgroundColor: color.Primary100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileTextView: {
    fontSize: normalize(32),
    fontFamily: fonts.RobotoSemiBold,
    color: color.Primary40,
  },
  emailView: {
    alignSelf: 'center',
    marginLeft: vw(20),
    gap: normalize(3),
  },
  nameText: {
    fontSize: normalize(18),
    fontFamily: fonts.RobotoSemiBold,
  },
  emailText: {
    fontSize: normalize(14),
    fontFamily: fonts.RobotoMedium,
    color: color.Gray3,
  },
  cardStyle: {
    paddingHorizontal: vw(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: normalize(0.2),
    borderColor: color.Gray3,
    height: vh(72),
  },
  titleText: {
    fontSize: normalize(16),
    fontFamily: fonts.RobotoSemiBold,
  },
  discroptionText: {
    marginTop: vh(9),
    fontSize: normalize(12),
    fontFamily: fonts.RobotoRegular,
    color: color.Gray3,
  },


});
