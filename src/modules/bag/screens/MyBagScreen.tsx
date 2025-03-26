import { Pressable, StyleSheet, Text, View, Animated, FlatList,SafeAreaView } from 'react-native';
import React, {  useState, memo } from 'react';

import { normalize, screenHeight, vh, vw } from '@cloneApp/utils/dimensions';
import { SearchIcon } from '@cloneApp/utils/localsvg';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { UpdateBagData } from '@cloneApp/modals';
import RenderMyBag from '../components/RenderMyBag';
import { updateBagData } from '@cloneApp/modules/shop/shopSlice';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { getMyOrder, OrdersData, storeOrders } from '../myBagAction';
import { deleteMybag } from '@cloneApp/modules/shop/shopSlice';
const TotalAmount = ()=>{
    const { BagData } = useAppSelector((state) => state.shop);
    const totalAmount = BagData.reduce((acc, item) => acc + item.Product.price * item.quantity, 0);
    return (
        <View style={styles.totalAmount}>
            <Text style={styles.totalAmountText}>{strings.totalAmount}</Text>
            <Text style={styles.totalAmountPriceText}>{totalAmount.toString().slice(0,6) + strings.dollar}</Text>
        </View>
    );
};

export const MyBagScreen = memo(() => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [searchData, setSearchedData] = useState('');
  const { BagData } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  const handleSearchPress = () => {
    const newState = !isSearchBarOpen;
    setIsSearchBarOpen(newState);


  };
  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, vw(343)], // Width expands from 0 to 250vw
  });

  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', color.Neutral_White], // Changes from white to light gray
  });

  if (BagData.length < 1){
    return (
      <Text style={styles.noDataText}>{strings.noItemsAddeded}</Text>
    );
  }
      return (
      <SafeAreaView>

        <Animated.View style={[styles.searchContainer, { width: animatedWidth, backgroundColor: animatedBackgroundColor }]}>

         {!isSearchBarOpen && <Pressable onPress=
            {handleSearchPress} style={styles.searchIcon}>
            <SearchIcon height={vh(25)} width={vw(25)} />
          </Pressable>}
        </Animated.View>
        <Text style={styles.myBagStyle}>{strings.myBag}</Text>
        <View style={styles.listContainer}>
        <FlatList
        contentContainerStyle={styles.listStyle}
            showsVerticalScrollIndicator={false}
          data={BagData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item}) =>
          <RenderMyBag data={item} sendQunatityBack={(value)=>{
            if(value){
              const payload:UpdateBagData = {
                productId:item.Product.id,
                quantity:value,
               };
                dispatch(updateBagData(payload));
            }
           
          }}
          />}
        />
        </View>
        <TotalAmount/>
    <CommonButton text={strings.checkOut} onPress={()=>{
     const Payload:OrdersData = {
       items:BagData,
       totalAmount:BagData.reduce((acc, item) => acc + item.Product.price * item.quantity, 0),
       userId:BagData[0].userId,
     };
     dispatch(storeOrders(Payload));
     dispatch(deleteMybag());
     dispatch(getMyOrder(BagData[0].userId));
        }

    } style={{mainView:styles.buttonStyle,InputTextStyle:styles.buttonTextStyle}}/>
      </SafeAreaView>
      );
});

      const styles = StyleSheet.create({

      header: {
        flexDirection: 'row',
      alignItems: 'center',
  },
  noDataText:{
      alignSelf:'center',
      marginTop:vh(screenHeight / 2 - 80),
      fontSize:normalize(24),
      color:color.Gray2,
      fontFamily:fonts.RobotoSemiBold,

  },
      searchContainer: {
      //   alignSelf:'flex-end',
      //   height: vh(40),
      // marginBottom:vh(40),
      // borderRadius: vw(20),
      // paddingHorizontal: vw(10),
      // justifyContent: 'center',
      // overflow: 'hidden',
      // marginRight:vw(20)
  },
      searchIcon: {
        position:'absolute',
      alignSelf: 'flex-end',

  },
      myBagStyle:{
        flexDirection:'row',
        marginLeft:vw(16),
      fontSize:normalize(34),
      fontFamily:fonts.RobotoBold,
  },
  listContainer:{
    maxHeight:vh(350),
   paddingBottom:vh(20),
  },
  listStyle: {
    marginVertical: vh(20),
    alignSelf:'center',
    gap:normalize(20),

  },
  totalAmount: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:vw(16),
    marginTop:vh(20),
    marginBottom:vh(20),
  },
  totalAmountText: {
    fontSize:normalize(14),
    fontFamily:fonts.RobotoMedium,
    color:color.Gray3,
  },
  totalAmountPriceText:{
    fontSize:normalize(18),
    fontFamily:fonts.RobotoSemiBold,
  },
  buttonStyle:{
   alignSelf:'center',
   height:vh(48),
   borderRadius:normalize(40),
   backgroundColor:color.PrimaryRed,
   justifyContent:'center',
   alignItems:'center',
  },
  buttonTextStyle:{
    fontSize:normalize(18),
    fontFamily:fonts.RobotoSemiBold,
    color:color.Neutral_White,
  },
});
