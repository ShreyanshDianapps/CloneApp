import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import strings from '@cloneApp/utils/strings';
import { NavigationBackIcon, SearchIcon, TickIcon } from '@cloneApp/utils/localsvg';
import { CommonTextInput } from '@cloneApp/components/CommonTextInput';
import color from '@cloneApp/utils/color';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import { FlatList } from 'react-native-gesture-handler';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import CommonCheckBoxComponent from '@cloneApp/components/CommonCheckBoxComponent';
import { ApplyChangesComponent } from '../components/ApplyChangesComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation:NativeStackNavigationProp<RootNavigationStack,'BrandsScreen'>;
}

 export const BrandsScreen = (props: Props) => {
    const route = useRoute<RouteProp<ShopNavigationStack,'BrandsScreen'>>();
    const {brands,callBackBrand} = route.params;
    const [searchedValue,setSearchedValue] = useState('');
    const [selectedBrand,setSelectedBrand] = useState<string[]>([]);
    const [searchedData, setSearchedData] = useState<Array<Array<string>>>([]);
    useEffect(()=>{
            if(brands.length > 0){
                setSearchedData(prev => [...prev, [...brands]]);
            }
    },[brands]);
    const handleSearch = (text:string)=>{
        setSearchedValue(text);
        let filteredData: Array<string> = brands.filter((item)=>item.toLowerCase().includes(text.toLowerCase()));
        setSearchedData((prev) => [...prev, filteredData]);
    };
  return (

    <View>
      <HeadingCompnent text={strings.brands} isBackIconPressed={()=> props.navigation.goBack()} backIcon={NavigationBackIcon}/>
        <CommonTextInput
        value={searchedValue}
        onChange={handleSearch}
        style={{
            mainViewInput:styles.mainSearchView,
            InputTextStyle:styles.inputTextStyle,
        }}
        searchIcon={SearchIcon}
        placeholder={strings.search}/>
        <FlatList
  data={searchedData[searchedData.length - 1]}
  contentContainerStyle={styles.flatlistStyle}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({ item}) => (
    <View style={styles.listView}>
      <Text style={[styles.brandNameText,{color:selectedBrand.includes(item) ? color.PrimaryRed : color.Black}]}>{item}</Text> {/* Render the brand name */}
      <CommonCheckBoxComponent selectIcon={TickIcon} dimensions={[10,10]} isPressed={(value)=>{
        if(value){
           setSelectedBrand((pre)=>[...pre,item]);
        }
        else{
            if(selectedBrand.includes(item)){
                setSelectedBrand((prev) => prev.filter((brand) => brand !== item));
            }
        }
      }}
        style={{
            selectedView:styles.selectedStyle,
        }}/>

    </View>

  )}
/>

    <ApplyChangesComponent isApplyPressed={()=>{
        if(callBackBrand)
        {callBackBrand(selectedBrand);}
    props.navigation.goBack();
    }} isDiscardPressed={()=>props.navigation.goBack()}/>
    </View>

  );
};
const styles = StyleSheet.create({
    mainSearchView:{
        backgroundColor:color.Neutral_White,
        marginTop:vh(30),
        height:vh(40),
        width:vw(343),
        alignSelf:'center',
        borderRadius:normalize(20),
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:vw(10),
        gap:normalize(10),
    },
    inputTextStyle:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoRegular,
    },
    flatlistStyle:{
            gap:normalize(34),
            marginVertical:vh(24),
    },
    listView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:vw(343),
       alignSelf:'center',
    },
    selectedStyle:{
        backgroundColor:color.PrimaryRed,
        borderWidth:normalize(0),
    },
    brandNameText:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoRegular,
        color:color.Black,
    },
});
