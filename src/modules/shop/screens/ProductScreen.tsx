import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { getProductById } from '../shopAction';
import { HeartIcon, NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { normalize, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';
import strings from '@cloneApp/utils/strings';
import { RatingComp } from './SelectedCategoryProductScreen';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

type Props = {
    navigation: NativeStackNavigationProp<RootNavigationStack, 'ProductScreen'>;
}

export const ProductScreen = (props: Props) => {
    const route = useRoute<RouteProp<ShopNavigationStack, 'ProductScreen'>>();
    const { ProductData, loading } = useAppSelector((state) => state.shop);
    const { id } = route.params;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductById(id));
    }, [id]);
    const renderImage = ({ item }: { item: string }) => {
        if (loading) {
            return (
                <ShimmerPlaceHolder style={styles.imageStyle} />
            );
        } else {
            return (
                <View>
                    <ImageBackground source={{ uri: item }} style={styles.imageStyle} />
                </View>
            );
        }
    };

    return (
        <View >
            <HeadingCompnent
                text={ProductData?.title}
                backIcon={NavigationBackIcon}
                isBackIconPressed={() => props.navigation.goBack()}
            />
            <FlatList
                data={ProductData?.images}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderImage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.miniImage_saveView}>
                <FlatList
                    data={ProductData?.images}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.listStyle}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Pressable>
                            <ImageBackground source={{ uri: item }} style={styles.imageStyleMiniView}>
                                <View style={styles.overlayView} />
                            </ImageBackground>
                        </Pressable>
                    )}
                />
                <View style={styles.saveView}>
                    <HeartIcon />
                </View>
            </View>
            <View style={styles.brandName_PriceView}>
                    <Text style={styles.brandName}>{ProductData?.brand}</Text>
                    <Text style={styles.brandName}>{strings.dollar + ProductData?.price}</Text>
            </View>
           <RatingComp rating={ProductData.rating}/>
            <Text style={styles.discriptionText}>{ProductData?.description}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    imageStyle: {
        width: vw(screenWidth),
        height: vh(300),
    },
    miniImage_saveView: {
        flexDirection: 'row',
        marginTop: vh(10),
        marginHorizontal: vw(16),
        justifyContent: 'space-around',
    },
    imageStyleMiniView: {
        height: vh(40),
        width: vw(40),
    },
    listStyle: {
        marginLeft: vw(20),
        gap: normalize(6),
    },
    overlayView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    saveView: {
        height: vh(36),
        width: vw(36),
        borderRadius: normalize(18),
        backgroundColor: color.Netual_White_Light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandName_PriceView:{
        flexDirection:'row',
        marginTop:vh(20),
        marginHorizontal:vw(16),
        justifyContent:'space-between',
    },
    brandName:{
        fontSize:normalize(24),
        fontFamily:fonts.RobotoSemiBold,
    },
    discriptionText:{
        width:vw(343),
        alignSelf:'center',
        marginTop:vh(10),
        fontSize:normalize(14),
        fontFamily:fonts.RobotoRegular,
        color:color.Gray2,
    },

});
