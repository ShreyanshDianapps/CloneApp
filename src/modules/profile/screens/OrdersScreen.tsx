import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import strings from '@cloneApp/utils/strings';
import { NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigationStack } from '@cloneApp/utils/type';
import { useAppSelector } from '@cloneApp/utils/hooks';
import color from '@cloneApp/utils/color';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { screenNames } from '@cloneApp/utils/screenNames';

type Props = {
  navigation:NativeStackNavigationProp<ProfileNavigationStack,'OrdersScreen'>;
}

export const OrdersScreen = (props: Props) => {
  const {MyOrder} = useAppSelector((state)=>state.profile);
  return (
    <SafeAreaView style={styles.mainComp}>
      <Pressable onPress={props.navigation.goBack}>
      <NavigationBackIcon/>
      </Pressable>
      <Text style={styles.myOrderText}>{strings.myOrders}</Text>
      {MyOrder.length > 0 &&
      <FlatList
      data={MyOrder}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_,index)=>index.toString()}
      renderItem={({item,index})=>(
        <View style={styles.cardStyle}>
          <View style={styles.orderAndCreatedText}>
      <Text style={styles.orderText}>{strings.orderNo}<Text>{item.orderNumber}</Text></Text>
      </View>
        <View style={styles.quantityAndTextView}>
          <Text style={styles.quantity}>{strings.qunatity}<Text style={styles.quantityNoText}>{item.items.items.length}</Text></Text>
          <Text style={styles.quantity}>{strings.totalAmount}<Text style={styles.quantityNoText}>{strings.gap + item.items.totalAmount + strings.dollar}</Text></Text>
        </View>
        <CommonButton text={strings.details}  style={{mainView:styles.detailsView,InputTextStyle:styles.detailsText}}onPress={()=>{
          props.navigation.navigate(screenNames.DetailsScreen,{index:index});
        }}/>
        </View>
      )}
      />
    }
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  mainComp:{
      marginHorizontal:vw(16),
  },
  myOrderText:{
    marginTop:vh(30),
    fontSize:normalize(34),
    fontFamily:fonts.RobotoSemiBold,
  },
  cardStyle:{
    height:vh(164),
    backgroundColor:color.Neutral_White,
    marginTop:vh(20),
    borderRadius:normalize(10),
    paddingHorizontal:vw(16),
  },
  orderAndCreatedText:{
    marginTop:vh(20),
   justifyContent:'space-between',
  },
  orderText:{
    fontSize:normalize(18),
    fontFamily:fonts.RobotoSemiBold,
  },
  quantityAndTextView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:vh(10),
  },
  quantity:{
    fontSize:normalize(14),
    fontFamily:fonts.RobotoRegular,
    color:color.Gray3,
  },
  quantityNoText:{
    fontSize:normalize(16),
    fontFamily:fonts.RobotoSemiBold,
    color:color.Black,
  },
  detailsView:{
    width:vw(98),
    height:vh(36),
    borderRadius:normalize(30),
    marginTop:vh(20),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.Neutral_White,
    borderWidth:normalize(1),
  },
  detailsText:{
    fontSize:normalize(14),
    fontFamily:fonts.RobotoMedium,
  },
});
