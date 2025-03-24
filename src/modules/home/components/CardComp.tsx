import React, { memo, useState,  useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import strings from '@cloneApp/utils/strings';
import fonts from '@cloneApp/utils/fonts';
import color from '@cloneApp/utils/color';
import { vh, vw, normalize } from '@cloneApp/utils/dimensions';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Product } from '@cloneApp/modals';
import { BlackHeartIcon, HeartIcon } from '@cloneApp/utils/localsvg';
import { RatingComp } from '@cloneApp/modules/shop/components/RatingComp';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { Users } from '@cloneApp/modules/shop/shopAction';
import { getFavoritesId, toggleFavorite } from '@cloneApp/modules/favorites/favoritesAction';


const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

type Props = {
  loading: boolean;
  item: Product;
 isPressed: (id:number) => void;
 isSaved?:()=>void
};

  export const CardComp = memo(({ item, loading,isPressed,isSaved }: Props) => {
    const {Favorites} = useAppSelector((state)=>state.favorite);
    const {user} = useAppSelector((state=>state.auth));
    const dispatch = useAppDispatch();
  const [saved,setSaved] = useState(Favorites.includes(item.id));
useEffect(()=>{
  if(user){
    // dispatch(getFavoritesId(user.userId));
  }

},[saved]);


  return (
    <Pressable style={styles.mainListComp} onPress={()=>isPressed(item.id)}>
      {loading ? (
        <ShimmerPlaceHolder style={styles.shimmerPlaceHolderImageView} />
      ) : (
        <View>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.shimmerPlaceHolderImageView}
          >
            <View style={styles.overlayView} />
          </ImageBackground>
          <View>
            <Pressable
              onPress={() => {
                const payload:Users = {
                    userId:user?.userId ?? '',
                    productId:item.id,
                };
              dispatch(toggleFavorite(payload));

              setSaved(!saved);
              if(isSaved){
                isSaved();
              }
              }}
              style={styles.saveViewList}
            >
             {saved ? <BlackHeartIcon height={vh(20)} width={vw(20)}/> : <HeartIcon />}
            </Pressable>
            <View style={styles.ratingViewList}>
              <RatingComp rating={item.rating || 0} />
              <Text style={styles.reviewTextStyle}>
                ({item.reviews.length})
              </Text>
            </View>
            <Text style={styles.titleTextStyle}>{item.title}</Text>
            <Text style={styles.brandTextStyle}>{item.brand}</Text>
            <View style={styles.priceView}>
              <Text
                style={[
                  item.discountPercentage === 0
                    ? styles.finalPriceText
                    : styles.oldPrice,
                ]}
              >
                {strings.dollar + item.price}
              </Text>
              {item.discountPercentage > 0 && (
                <Text style={styles.newPrice}>
                  {strings.dollar +
                    (item.price -
                      (item.price * item.discountPercentage) / 100).toFixed(2)}
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
});


const styles = StyleSheet.create({
    mainListComp: {
              marginEnd: vw(10),
              marginStart:vw(10),

          },
          shimmerPlaceHolderImageView: {
              height: vh(164),
              width: vw(142),
              // backgroundColor: 'red',
          },
          saveViewList: {
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
              ratingViewList: {
                      flexDirection:'row',
                      marginTop:vh(8),
                      alignItems:'center',
                      gap:normalize(3),
                      width:'80%',
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
              overlayView: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.1)',
            },
});
