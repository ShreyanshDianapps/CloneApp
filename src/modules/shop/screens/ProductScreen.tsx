import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { getProductById } from '../shopAction';
import { CrossIconSvg, HeartIcon, NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, Pressable, ScrollView } from 'react-native-gesture-handler';
import { normalize, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';
import strings from '@cloneApp/utils/strings';
import RatingComp from '../components/RatingComp';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { screenNames } from '@cloneApp/utils/screenNames';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
type ImagePopUpProps = {
    image: string;
    closeDropDown: (value: boolean) => void;
}
const ImagePopUp = (props: ImagePopUpProps) => {
    return (
        <View style={styles.ImagePopUpMainView}>
            <ImageBackground source={{ uri: props.image }} style={styles.fullImageStyle}></ImageBackground>
            <Pressable style={styles.crossicon} onPress={() => {
                props.closeDropDown(false)
            }}>
                <CrossIconSvg height={vh(20)} width={vw(20)} />
            </Pressable>
        </View>
    )

}
type Props = {
    navigation: NativeStackNavigationProp<RootNavigationStack, 'ProductScreen'>;
}
type ViewToken = {
    item: any;
    key: string;
    index: number | null;
    isViewable: boolean;
    section?: any;
};
export const ProductScreen = (props: Props) => {
    const route = useRoute<RouteProp<ShopNavigationStack, 'ProductScreen'>>();
    const { ProductData, loading } = useAppSelector((state) => state.shop);
    const [imageDropDown, setImageDropDown] = useState(false);
    const [image, setImage] = useState('');
    const activeIndexRef = useRef(0);;
    const [, forceRender] = useState(false);
    const flatlistref = useRef<FlatList>(null);
    const { id } = route.params;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductById(id));
    }, [id]);
    const handleImagePress = (item: string) => {
        setImageDropDown(true);
        setImage(item)

    }
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const lastVisibleItem = viewableItems[viewableItems.length - 1];
            if (lastVisibleItem.index !== null && activeIndexRef.current !== lastVisibleItem.index) {
                activeIndexRef.current = lastVisibleItem.index;
                forceRender((prev) => !prev); // This will force re-render of `renderMiniImage`
                console.log("Updated Active Index:", lastVisibleItem.index);
            }
        }
    }, []);
    const renderImage = useCallback(({ item }: { item: string }) => {
        return loading ? (
            <ShimmerPlaceHolder style={styles.imageStyle} />
        ) : (
            <View>
                <ImageBackground source={{ uri: item }} style={styles.imageStyle} />
            </View>
        );
    }, [loading]);
    const renderMiniImage = ({ item, index }: { item: string; index: number }) => (
        <Pressable onPress={() => handleImagePress(item)}>
            {loading ? (
                <ShimmerPlaceHolder style={styles.imageStyleMiniView} />
            ) : (
                <ImageBackground source={{ uri: item }} style={styles.imageStyleMiniView}>
                    {activeIndexRef.current !== index && <View style={styles.overlayView} />}
                </ImageBackground>
            )}
        </Pressable>
    );
    return (
        <View >
            <HeadingCompnent
                text={ProductData?.title}
                backIcon={NavigationBackIcon}
                isBackIconPressed={() => props.navigation.goBack()}
            />
            <ScrollView>
                <FlatList
                    data={ProductData?.images}
                    keyExtractor={(_, index) => index.toString()}
                    pagingEnabled
                    onViewableItemsChanged={onViewableItemsChanged}
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
                        ref={flatlistref}
                        renderItem={renderMiniImage}


                    />
                    <View style={styles.saveView}>
                        <HeartIcon />
                    </View>
                </View>

                <View style={styles.brandName_PriceView}>
                    <Text style={styles.brandName}>{ProductData?.brand}</Text>
                    <Text style={styles.brandName}>{strings.dollar + ProductData?.price}</Text>
                </View>

                <View style={styles.ratingView}>
                    <RatingComp rating={ProductData?.rating || 0} />
                </View>

                <Text style={styles.discriptionText}>{ProductData?.description}</Text>
                <CommonButton text={strings.addToCart} onPress={() => { }}
                    style={{
                        mainView: styles.addtocartBuutton,
                        InputTextStyle: styles.cartTextStyle
                    }} />
                <Pressable style={styles.shippingInfoStyle} onPress={()=>{
                    if(ProductData)
                        props.navigation.navigate(screenNames.AdditionalInformation,{data:ProductData})}
                }>
                    <Text>{strings.shippingInfo}</Text>
                    <View style={{ transform: [{ rotate: '180deg' }] }}>
                        <NavigationBackIcon />
                    </View>
                </Pressable>
            </ScrollView>
            {imageDropDown && <ImagePopUp image={image} closeDropDown={(value) => {
                setImageDropDown(value)
            }} />}
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
    brandName_PriceView: {
        flexDirection: 'row',
        marginTop: vh(20),
        marginHorizontal: vw(16),
        justifyContent: 'space-between',
    },
    brandName: {
        fontSize: normalize(24),
        fontFamily: fonts.RobotoSemiBold,
    },
    discriptionText: {
        width: vw(343),
        alignSelf: 'center',
        marginTop: vh(10),
        fontSize: normalize(14),
        fontFamily: fonts.RobotoRegular,
        color: color.Gray2,
    },
    ratingView: {
        marginLeft: vw(16)
    },
    ImagePopUpMainView: {
        position: 'absolute',
        flex: 1,
        top: vh(150),
        left: vw(40),
        backgroundColor: 'rgba(0,0,0,0.4)',

    },
    fullImageStyle: {
        height: vh(500),
        width: vw(300)
    },
    crossicon: {
        position: 'absolute',
        top: vh(-10),
        left: vw(-10),
        height: vh(30),
        width: vw(30),
        borderRadius: normalize(15),
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addtocartBuutton: {
        width: vw(343),
        height: vh(48),
        borderRadius: normalize(25),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh(10),
        backgroundColor: color.PrimaryRed,
        shadowOffset: {
            height: 4,
            width: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: vh(10)
    },
    cartTextStyle: {
        fontSize: normalize(14),
        fontFamily: fonts.RobotoMedium,
        color: color.Netual_White_Light
    },
    shippingInfoStyle: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        minHeight:vh(50),
        width:screenWidth,
        alignSelf:'center',
        backgroundColor:color.Neutral_White,
        paddingHorizontal:vw(20)

    }

});
