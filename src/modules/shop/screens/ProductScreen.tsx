import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { addToCart, getProductById } from '../shopAction';
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
import { AddProduct, Product } from '@cloneApp/modals';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
type ImagePopUpProps = {
    image: string;
    closeDropDown: (value: boolean) => void;
}
const ImagePopUp = (props: ImagePopUpProps) => {
    return (
        <View style={styles.ImagePopUpMainView}>
            <ImageBackground source={{ uri: props.image }} style={styles.fullImageStyle} />
            <Pressable style={styles.crossicon} onPress={() => {
                props.closeDropDown(false);
            }}>
                <CrossIconSvg height={vh(20)} width={vw(20)} />
            </Pressable>
        </View>
    );

};
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
    const { ProductData, loading, BagData,Product } = useAppSelector((state) => state.shop);
    const { user } = useAppSelector((state) => state.auth);
    const [imageDropDown, setImageDropDown] = useState(false);
    const [similarProducts,setSimilarProducts] = useState<Product[]>([]);
    const [image, setImage] = useState('');
    const activeIndexRef = useRef(0);
    const [, forceRender] = useState(false);
    const flatlistref = useRef<FlatList>(null);
    const { id } = route.params;
    const [buttonText, setButtonText] = useState(strings.addToCart);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductById(id));

        // Check if product is in the bag
        const isProductInBag = BagData.some(item => item.Product.id === ProductData?.id);
        if (isProductInBag) {
            setButtonText(strings.alreadyInBag);
        }

        // Find similar products based on matching tags
        if (ProductData?.tags && Array.isArray(Product)) {
            const similarProducts = Product.filter(item =>
                item.tags?.some(tag => ProductData.tags.includes(tag)) // Check if any tag matches
            );
            setSimilarProducts(similarProducts);
        }

    }, [id]); // Include ProductData in dependencies

    const handleImagePress = (item: string) => {
        setImageDropDown(true);
        setImage(item);
    };
    const handleAddToCart = useCallback(() => {
        if (user?.userId && ProductData && !loading) {
            const payload: AddProduct = {
                userId: user?.userId,
                Product: ProductData,
                quantity: 1,
            };

            dispatch(addToCart(payload));
            setButtonText(strings.alreadyInBag); // Update button text
        }
    }, [dispatch, user?.userId, ProductData, loading]);
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const lastVisibleItem = viewableItems[viewableItems.length - 1];
            if (lastVisibleItem.index !== null && activeIndexRef.current !== lastVisibleItem.index) {
                activeIndexRef.current = lastVisibleItem.index;
                forceRender((prev) => !prev); // This will force re-render of `renderMiniImage`
                console.log('Updated Active Index:', lastVisibleItem.index);
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
    const renderCards = useCallback(({ item }: { item: Product }) => (
        <Pressable style={styles.mainListComp} onPress={()=>props.navigation.navigate(screenNames.ProductScreen,{id:item.id})}>
            {loading ? (
                <ShimmerPlaceHolder style={styles.shimmerPlaceHolderImageView} />
            ) : (
                <View>
                    <ImageBackground source={{ uri: item.thumbnail }} style={styles.shimmerPlaceHolderImageView}>
                        <View style={styles.overlayView} />
                    </ImageBackground>
                    <View>
                        <Pressable style={styles.saveViewList}>
                            <HeartIcon />
                        </Pressable>
                        <View style={styles.ratingViewList}>
                           <RatingComp rating ={item.rating || 0}/>
                            <Text style={styles.reviewTextStyle}>({item.reviews.length})</Text>
                        </View>
                        <Text style={styles.titleTextStyle}>{item.title}</Text>
                        <Text style={styles.brandTextStyle}>{item.brand}</Text>
                        <View style={styles.priceView}>
                            <Text style={[item.discountPercentage === 0 ? styles.finalPriceText : styles.oldPrice]}>
                                {strings.dollar + item.price}
                            </Text>
                            {item.discountPercentage > 0 && (
                                <Text style={styles.newPrice}>
                                    {strings.dollar + (item.price - (item.price * item.discountPercentage) / 100).toFixed(2)}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    ), [loading]);
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
                    <Pressable style={styles.saveView}>
                        {/* <Image
                            source={localPngImages.HeartIconShape}
                            style={{ height: vh(13), width: vw(13)}  }
                        /> */}
                        <HeartIcon />

                    </Pressable>
                </View>

                <View style={styles.brandName_PriceView}>
                    <Text style={styles.brandName}>{ProductData?.brand}</Text>
                    <Text style={styles.brandName}>{strings.dollar + ProductData?.price}</Text>
                </View>

                <View style={styles.ratingView}>
                    <RatingComp rating={ProductData?.rating || 0} />
                </View>

                <Text style={styles.discriptionText}>{ProductData?.description}</Text>
                <CommonButton text={buttonText} onPress={handleAddToCart}
                    style={{
                        mainView: styles.addtocartBuutton,
                        InputTextStyle: styles.cartTextStyle,
                    }} />
                <Pressable style={styles.shippingInfoStyle} onPress={() => {
                    if (ProductData)
                        {props.navigation.navigate(screenNames.AdditionalInformation, { data: ProductData });}
                }
                }>
                    <Text>{strings.shippingInfo}</Text>
                    <View style={{ transform: [{ rotate: '180deg' }] }}>
                        <NavigationBackIcon />
                    </View>
                </Pressable>
                <View style={styles.similarItemTextView}>
                    <Text>{strings.youCanAlsoLikeThis}</Text>
                    <Text>{similarProducts.length + strings.items}</Text>
                </View>
                <FlatList
                contentContainerStyle={styles.similarlistStyle}
                data={similarProducts}
                keyExtractor={(_,index)=>index.toString()}
                renderItem={renderCards}
                horizontal={true}
                />
            </ScrollView>
            {imageDropDown && <ImagePopUp image={image} closeDropDown={(value) => {
                setImageDropDown(value);
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
     saveView1: {
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
    ratingView: {
        marginLeft: vw(16),
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
        width: vw(300),
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
        alignItems: 'center',
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
            width: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: vh(10),
    },
    cartTextStyle: {
        fontSize: normalize(14),
        fontFamily: fonts.RobotoMedium,
        color: color.Netual_White_Light,
    },
    shippingInfoStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: vh(50),
        width: screenWidth,
        alignSelf: 'center',
        backgroundColor: color.Neutral_White,
        paddingHorizontal: vw(20),
    },
    similarItemTextView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:vw(16),
        marginTop:vh(10),
    },
    mainListComp: {
        marginEnd: vw(20),
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
        similarlistStyle:{
            marginVertical:vh(20),
            marginHorizontal:vw(20),
        },
});
