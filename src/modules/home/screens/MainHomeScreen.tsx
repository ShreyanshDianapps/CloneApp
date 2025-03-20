import { ImageBackground, StyleSheet, Text, View,ScrollView,FlatList, Pressable,RefreshControl ,ActivityIndicator} from 'react-native';
import React, { useEffect } from 'react';
import localPngImages from '@cloneApp/utils/localPngImages';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';

import { RootNavigationStack } from '@cloneApp/utils/type';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { screenNames} from '@cloneApp/utils/screenNames';
import { getAllProducts } from '../homeAction';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardComp } from '../components/CardComp';
import { getFavoritesId } from '@cloneApp/modules/favorites/favoritesAction';

type Props = {
  navigation:NativeStackNavigationProp<RootNavigationStack,'MainHomeScreen'>;
}
 export const MainHomeScreen = (props: Props) => {
  const dispatch = useAppDispatch();
  const [refreshing,setRefreshing] = React.useState(false);
   const {user} = useAppSelector((state=>state.auth));
  const {loading,ProductsData} = useAppSelector((state)=>state.home);
  const {Favorites} = useAppSelector((state)=>state.favorite);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate a refresh action
  };
  useEffect(()=>{
    dispatch(getAllProducts());

    if(user){
      dispatch(getFavoritesId(user.userId)); }

  },[dispatch,refreshing]);

  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
          {refreshing && <ActivityIndicator size="large" color="blue" style={{ margin: 20 }} />}

      <ImageBackground source={localPngImages.BigBanner} style={styles.BannerImageStyle}>
        <Text style={styles.fasionSaleText}>{strings.fasionSale}</Text>
        <CommonButton text={strings.check} onPress={()=>{
          props.navigation.navigate(screenNames.HarshUi);
        }}
        style={{
          mainView:styles.buttonView,
          InputTextStyle:styles.buttonText,
        }}

        />
      </ImageBackground>

      <View style={styles.newView}>
        <View>
          <Text style={styles.newTextStyle}>{strings.sale}</Text>
          <Text style={styles.youHaveNeverSeenText}>{strings.superSummerSale}</Text>
        </View>
       <Pressable style={styles.viewAllStyle}>
          <Text style={styles.ViewAllTextStyle}> {strings.viewAll}</Text>
       </Pressable>
     </View>
     {ProductsData ?
     <FlatList
     style={styles.flatListStyle}
     data={ProductsData.slice(15,30)}
     keyExtractor={(_,index)=>index.toString()}
     renderItem={({ item }) => (
      <CardComp loading={loading} item={item} isPressed={(id)=>{
          props.navigation.navigate(screenNames.ProductScreen,{id:id});
      }}
      />
     )}
     horizontal
     showsHorizontalScrollIndicator={false}
     />
 : <Text>No DATA</Text>}
  <View style={styles.newView}>
        <View>
          <Text style={styles.newTextStyle}>{strings.new}</Text>
          <Text style={styles.youHaveNeverSeenText}>{strings.youNeverSeenItBefore}</Text>
        </View>
       <Pressable style={styles.viewAllStyle}>
          <Text style={styles.ViewAllTextStyle}> {strings.viewAll}</Text>
       </Pressable>
     </View>
     {ProductsData ?
     <FlatList
     style={styles.flatListStyle}
     data={ProductsData.slice(0,15)}
     keyExtractor={(_,index)=>index.toString()}
     renderItem={({ item }) => (
     <CardComp loading={loading} item={item} isPressed={()=>{
      props.navigation.navigate(screenNames.ProductScreen,{id:item.id});
     }}/>
    )}
     horizontal
     showsHorizontalScrollIndicator={false}
     />
 : <Text>No DATA</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  BannerImageStyle:{
    height:vh(544),
  },
  fasionSaleText:{
    marginTop:vh(354),
    marginLeft:vh(16),
    fontSize:normalize(48),
    width:vw(190),
    color:color.Neutral_White,
    fontFamily:fonts.RobotoSemiBold,
  },
  buttonView:{
    width:vw(160),
    height:vh(36),
    borderRadius:normalize(30),
    justifyContent:'center',
    alignItems:'center',
    marginLeft:vh(16),
    marginTop:vh(10),
    backgroundColor:color.PrimaryRed,

  },
  buttonText:{
    color:color.Neutral_White,
    fontSize:normalize(16),
    fontFamily:fonts.RobotoSemiBold,
  },
  newView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:vw(16),
    marginTop:vh(33),
  },

  newTextStyle:{
    fontSize:normalize(34),
    fontFamily:fonts.RobotoBold,
  },
  youHaveNeverSeenText:{
    fontSize:normalize(11),
    fontFamily:fonts.RobotoRegular,
    color:color.Gray2,
  },
  viewAllStyle:{
   alignItems:'center',
   alignSelf:'center',
   justifyContent:'center',
  },
  ViewAllTextStyle:{
    fontSize:normalize(11),
    fontFamily:fonts.RobotoRegular,
  },

        flatListStyle:{
          marginTop:vh(20),
          // marginHorizontal:vw(20)
        },
});
