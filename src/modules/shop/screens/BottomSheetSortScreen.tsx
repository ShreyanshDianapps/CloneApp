import { StyleSheet, Text,Pressable } from 'react-native';
import React,{useRef,useState} from 'react';

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import color from '@cloneApp/utils/color';


type Props={
    navigation:NativeStackNavigationProp<RootNavigationStack,'BottomSheetSortScreen'>;
}
export const BottomSheetSortScreen = (props:Props) => {
    const route = useRoute<RouteProp<ShopNavigationStack,'BottomSheetSortScreen'>>();
    const {data,callBackIndex,headingText,index} = route.params;
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [activeIndex,setActiveIndex] = useState(index);
  return (
   <Pressable
   onPress={()=>props.navigation.goBack()} style={styles.mainView}>

    <BottomSheet
    enableDynamicSizing={false}
    enablePanDownToClose={true}
    snapPoints={[300]}
    onChange={(index) => {
        if(index < 0){
            props.navigation.goBack();
        }
      }}
    ref={bottomSheetRef}>
        <Text style={styles.headingText}>{headingText}</Text>
        <BottomSheetFlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
          style={[styles.listView,{backgroundColor:activeIndex === index ? color.PrimaryRed : color.Neutral_White}]}
          onPress={()=>{
            if(callBackIndex){
                callBackIndex(index);
            }
            setActiveIndex(index);
          }} >
            <Text style={activeIndex === index ? styles.selectedlistText : styles.notSelectedListText}>{item}</Text>
          </Pressable>
        )}
      />
    </BottomSheet>
   </Pressable>
  );
};



const styles = StyleSheet.create({
    mainView:{
        flex:1,
    },
    listView:{
        height:vh(48),
       justifyContent:'center',
       marginLeft:vh(16),
    },
    notSelectedListText:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoRegular,
    },
    selectedlistText:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoRegular,
        color:color.Neutral_White,
        marginLeft:vw(16),
    },
    headingText:{
        fontSize:normalize(18),
        fontFamily:fonts.RobotoSemiBold,
        alignSelf:'center',
        marginBottom:vh(31),
    },
});
