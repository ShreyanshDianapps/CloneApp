import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { BottomSheetDropDownIcon, FilterIcon, HeartIcon, NavigationBackIcon } from '@cloneApp/utils/localsvg';

import { RootNavigationStack } from '@cloneApp/utils/type';
import { FlatList } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '@cloneApp/modals';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';
import strings from '@cloneApp/utils/strings';
import { dropDownSortArray } from '@cloneApp/utils/comonConstraints';
import { screenNames } from '@cloneApp/utils/screenNames';
import { CardComp } from '@cloneApp/modules/home/components/CardComp';
import { getFavoritesData } from '../favoritesAction';


const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

type Props = {
    navigation: NativeStackNavigationProp<RootNavigationStack, 'MainFavorites'>;
};


//bottom sheet componet


export const MainFavorites = (props: Props) => {

    const {user} = useAppSelector((state)=>state.auth);
    const {Filter} = useAppSelector((state)=>state.shop);
    const { loading,FavoritesData } = useAppSelector((state) => state.favorite);
    const [productData, setProductData] = useState<Product[]>([]);
    const [tagsArray, setTagsArray] = useState<string[]>([]);
    const [allBrands,setAllBrands] = useState<string[]>([]);
    const [saved,setIsSaved] = useState(true);
   const [selectedDropDownValue,setSelectedDropDownValue] = useState(0);
    const dispatch = useAppDispatch();
    console.log('Hello');

    useFocusEffect(
      useCallback(() => {
        if (user) {
          dispatch(getFavoritesData(user.userId))
            .unwrap()
            .then((res) => {
              if (res) {
                console.log(res);
                setProductData(res);
                extractTags(res);
                extractBrands(res);
              }
            });
        }
      }, [dispatch, user]) // Ensure dependencies are correct

    );
    useEffect(()=>{
        if(user)
        {dispatch(getFavoritesData(user.userId)).unwrap().then((res)=>{
    if(res){
        setProductData(FavoritesData);
    }
        });}

    },[saved,user]);
    useEffect(() => {
        if (Filter && productData.length > 0) {
          const filteredData = productData.filter(
            (item) =>
              item.price >= Filter.priceRange[0] &&
              item.price <= Filter.priceRange[1] &&
              item.rating >= Filter.ratingRange[0] &&
              item.rating <= Filter.ratingRange[1] &&
              Filter.brands.includes(item.brand)
          );

          setProductData(filteredData);
        }
      }, [Filter]);

    const extractTags = (products: Product[]) => {
        const allTags = products.flatMap((product) => product.tags);
        const uniqueTags = Array.from(new Set(allTags));
        if (JSON.stringify(uniqueTags) !== JSON.stringify(tagsArray)) {
            setTagsArray(uniqueTags);
        }
    };
    const extractBrands = (products: Product[]) => {
        const allBrands = new Set(products.map((item) =>item?.brand));
        const uniqueBrands = Array.from(new Set(allBrands));
        if (JSON.stringify(uniqueBrands) !== JSON.stringify(allBrands)) {
            setAllBrands(uniqueBrands);
        }
      };
    const callBack = (data:number[])=>{



    };
    const callBackIndex = (data:number)=>{
        console.log(data);
        setSelectedDropDownValue(data);
        if (data === 0) {
            const filteredData = [...productData].sort((a, b) => b.rating - a.rating);
            setProductData(filteredData);
          }
          else if (data === 1) {
            const filteredData = [...productData].sort((a, b) => a.price - b.price);
            setProductData(filteredData);
          }
        else{
            const filteredData = [...productData].sort((a, b) => b.price - a.price);
            setProductData(filteredData);
        }

    };
    const handleSelectedTagData = (item: string) => {
        const filterddata = FavoritesData.filter((product) => product.tags.includes(item));
        if(filterddata.length > 0){
            setProductData(filterddata);
        }

    };

    const renderTags = useCallback(({ item }: { item: string }) => (
        <Pressable style={styles.TagStyle} onPress={() =>handleSelectedTagData(item)}>
            {loading ? (
                <ShimmerPlaceHolder style={styles.shimmerTagStyle} />
            ) : (
                <Text style={styles.tagNameTextStyle}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
            )}
        </Pressable>
    ), [loading,productData,handleSelectedTagData]);




    return (
        <SafeAreaView>
            <Text style={styles.favoritesText}>{strings.Favorites}</Text>
            <FlatList
                data={tagsArray}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderTags}
                horizontal
                contentContainerStyle={styles.taglistStyle}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.filter_sort_View}>
                <Pressable onPress={()=>props.navigation.navigate(screenNames.FilterScreen,{brands:allBrands,callBack})} style={styles.filterIconView}>
                <FilterIcon/>
                <Text>{strings.filters}</Text>
                </Pressable>
                <Pressable style={styles.sortingView} onPress={()=>props.navigation.navigate(screenNames.BottomSheetSortScreen,{data:dropDownSortArray,callBackIndex,headingText:strings.sortBy,index:selectedDropDownValue})}>
                        <BottomSheetDropDownIcon/>
                        <Text>{dropDownSortArray[selectedDropDownValue]}</Text>
                </Pressable>
            </View>
            <FlatList
                data={productData}
                keyExtractor={(item) => item.id.toString()}
                 renderItem={({ item }) => (
                     <CardComp loading={loading} item={item} isPressed={()=>{
                      props.navigation.navigate(screenNames.ProductScreen,{id:item.id});
                     }}
                     isSaved={()=>{
                        setIsSaved(!saved);
                     }}/>
                    )}
                numColumns={2}
                contentContainerStyle={styles.productListView}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainListComp: {
        marginEnd: vw(20),
    },
    favoritesText:{
        fontFamily:fonts.RobotoBold,
        fontSize:normalize(34),
        marginLeft:vh(20),
        marginTop:vh(30),
    },
    taglistStyle:{
        marginTop:vh(10),
        gap:normalize(10),
        marginBottom:vh(10),
       marginHorizontal:vw(16),
    },
    TagStyle:{
        paddingHorizontal:vw(10),
        height:vh(30),
        backgroundColor:color.Black,
        borderRadius:normalize(20),
        justifyContent:'center',
        alignItems:'center',
    },
    tagNameTextStyle:{
        color:color.Netual_White_Light,
        fontFamily:fonts.RobotoMedium,
    },
    shimmerTagStyle:{
        height:vh(30),

    },
    shimmerPlaceHolderImageView: {
        height: vh(184),
        width: vw(162),
        // backgroundColor: 'red',
    },
    productListView: {
        marginHorizontal: vw(16),
        gap: normalize(16),
        marginTop: vh(30),
    },
    saveView: {
        position: 'absolute',
        height: vh(36),
        width: vw(36),
        alignSelf: 'flex-end',
        top: vh(-18),
        zIndex:1,
        borderRadius: normalize(18),
        backgroundColor: color.Neutral_White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shimmerSaveView: {
        position: 'absolute',
        height: vh(36),
        width: vw(36),
        alignSelf: 'flex-end',
        top: vh(-18),
        borderRadius: normalize(18),
    },
    ratingView: {
            flexDirection:'row',
            marginTop:vh(8),
            alignItems:'center',
            gap:normalize(3),
            width:'80%',
    },
    overlayView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    ratingCompRateingView:{
        gap:normalize(2),
        flexDirection:'row',
    },
    reviewTextStyle:{
        fontFamily:fonts.RobotoMedium,
        fontSize:normalize(10),
        color:color.Gray3,
    },
    titleTextStyle:{
        fontSize:normalize(11),
        fontFamily:fonts.RobotoMedium,
        color:color.Gray3,
        width:vw(162 / 1.19),
        marginTop:vh(4),
    },
    brandTextStyle:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoRegular,
        marginTop:vh(5),
    },
    priceView:{
        flexDirection:'row',
        marginTop:vh(4),
        gap:normalize(5),
    },
    oldPrice:{
        fontSize:normalize(14),
        fontFamily:fonts.RobotoCondensedRegular,
        color:color.Gray2,
        textDecorationLine:'line-through',
    },
    finalPriceText:{
        fontSize:normalize(14),
        fontFamily:fonts.RobotoCondensedRegular,
        color:color.Gray2,
    },
    newPrice:{
        color:color.PrimaryRed,
    },
    filter_sort_View:{
        flexDirection:'row',
    },
    filterIconView:{
        flexDirection:'row',
        marginHorizontal:vw(16),
        marginTop:vh(8),
        alignItems:'center',
        paddingHorizontal:vw(5),
        width:'30%',
    },
    sortingView:{
        flexDirection:'row',
        width:'70%',
        alignItems:'center',
        marginTop:vh(8),
        gap:normalize(5),
    },
});
