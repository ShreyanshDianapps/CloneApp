import { Pressable, StyleSheet, Text, View,ScrollView, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import strings from '@cloneApp/utils/strings';
import { NavigationBackIcon, WriteReview } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import RatingComp from '../components/RatingComp';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { screenNames } from '@cloneApp/utils/screenNames';
type Props = {
    navigation:NativeStackNavigationProp<RootNavigationStack,'AdditionalInformation'>;
}
type ProductReview = {
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    comment: string;
    date: string; // ISO 8601 formatted date
}

 export const AdditionalInformation = (props: Props) => {
    const [showRatingDropDown,setShowRatingDropDown] = useState(false);
    const [showShippingDropDown,setShowShippingDropDown] = useState(false);
    const route = useRoute<RouteProp<ShopNavigationStack,'AdditionalInformation'>>();
    const {data} = route.params;
    const renderRating = ({item}:{item:ProductReview})=>{
        return (
            <View style={styles.mainReviewView}>
                <View style={styles.image_rating_View}>
                    <View style={styles.nameImageView}>
                        <Text style={styles.nameText}>{item.reviewerName.split(' ')[0][0] + item.reviewerName.split(' ')[1][0]}</Text>
                    </View>

                <RatingComp rating={item?.rating} style={{
                    mainStyle:styles.ratingCompStyle,
                }}/>
                </View>
            <Text style={styles.emailText}>{item.reviewerEmail}</Text>
            <Text style={styles.commentText}>{item.comment}</Text>


            </View>
        );

    };
  return (
    <>
      <HeadingCompnent text={strings.additionalInformation} backIcon={NavigationBackIcon} isBackIconPressed={()=>props.navigation.goBack()} />
        <ScrollView style={styles.scrollViewStyle}>
            <ImageBackground source={{uri:data.thumbnail}} style={styles.imageStyle} resizeMode="contain"/>
        <Pressable onPress={()=>setShowRatingDropDown(!showRatingDropDown)} style={styles.ratingView}>
        <Text style={styles.text}>{strings.rating}</Text>
        <View style={{ transform: [{ rotate: '270deg' }] }}>
                                <NavigationBackIcon />
                            </View>
        </Pressable>
        {showRatingDropDown &&

        <FlatList
        contentContainerStyle={styles.listStyle}
        data={data?.reviews}
        keyExtractor={(_,index)=>index.toString()}
        renderItem={renderRating}
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}

        />
        }
        <Pressable onPress={()=>setShowShippingDropDown(!showShippingDropDown)} style={styles.ratingView}>
        <Text style={styles.text}>{strings.shippingInfo}</Text>
        <View style={{ transform: [{ rotate: '270deg' }] }}>
                                <NavigationBackIcon />
                            </View>
        </Pressable>
        {showShippingDropDown && <Text style={styles.shippingText}>{data.shippingInformation}</Text>}
        </ScrollView>
        <CommonButton text={strings.writeAReview} onPress={()=>{props.navigation.navigate(screenNames.BottomSheetReviwComp,{data:data});}} style={{mainView:styles.buttonView,InputTextStyle:styles.ButtonText}} Icon={WriteReview}/>
    </>
  );
};


const styles = StyleSheet.create({
    ratingView:{
        minHeight:vh(50),
        backgroundColor:color.Neutral_White,
        paddingHorizontal:vw(20),
        marginTop:vh(20),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    scrollViewStyle:{
        marginBottom:vh(10),
    },
    text:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoSemiBold,
    },
    image_rating_View:{
        marginTop:vh(10),

        flexDirection:'row',
        gap:normalize(20),
    },
    nameImageView:{
        height:vh(50),
        width:vw(50),
        borderRadius:normalize(25),
        backgroundColor:color.PrimaryRed,
        justifyContent:'center',
        alignItems:'center',
    },
    ratingCompStyle:{
        alignSelf:'center',
    },
    listStyle:{
        marginHorizontal:vw(20),
        gap:normalize(30),
        marginVertical:vh(20),
    },
    nameText:{
        fontSize:normalize(20),
        fontFamily:fonts.RobotoSemiBold,
        color:color.Netual_White_Light,
    },
    emailText:{
        marginTop:vh(5),
        fontSize:normalize(11),
        fontFamily:fonts.RobotoRegular,
        color:color.Gray2,
    },
    commentText:{
        marginTop:vh(5),
        fontSize:normalize(14),
        fontFamily:fonts.RobotoRegular,
        color:color.Gray2,
        flexWrap:'wrap',
    },
    mainReviewView:{
        backgroundColor:color.Neutral_White,
        minHeight:vh(150),
        paddingHorizontal:vw(10),
        borderRadius:normalize(20),
    },
    shippingText:{
        marginHorizontal:vh(20),
        marginVertical:vh(10),
        fontSize:normalize(16),
        fontFamily:fonts.RobotoCondensedRegular,
    },
    imageStyle:{
        height:vh(300),
        marginTop:vh(20),
        // width:vw(373)
    },
    buttonView:{
        marginBottom:vh(26),
        height:vh(36),
        width:vw(128),
        alignSelf:'flex-end',
        marginRight:vw(22),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:normalize(30),
        backgroundColor:color.PrimaryRed,
        flexDirection:'row-reverse',
        gap:normalize(5),

    },
    ButtonText:{
        fontFamily:fonts.RobotoSemiBold,
        fontSize:normalize(12),
        color:color.Netual_White_Light,
    },
});
