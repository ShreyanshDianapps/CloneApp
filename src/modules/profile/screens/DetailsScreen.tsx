import { FlatList, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { HeadingCompnent } from '@cloneApp/modules/shop/components/HeadingCompnent';
import strings from '@cloneApp/utils/strings';
import { NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { ProfileNavigationStack } from '@cloneApp/utils/type';
import { useAppSelector } from '@cloneApp/utils/hooks';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import color from '@cloneApp/utils/color';

type Props = {
    navigation: NativeStackNavigationProp<ProfileNavigationStack, 'DetailsScreen'>;
}

export const DetailsScreen = (props: Props) => {
    const route = useRoute<RouteProp<ProfileNavigationStack, 'DetailsScreen'>>();
    const { index } = route.params;
    const { MyOrder } = useAppSelector((state) => state.profile);
    const item = MyOrder[index];
    return (
        <View>
            <HeadingCompnent text={strings.orderDetails} backIcon={NavigationBackIcon} isBackIconPressed={() => props.navigation.goBack()} />
            <View style={styles.mainView}>
                <View style={styles.orderAndCreatedText}>
                    <Text style={styles.orderText}>{strings.orderNo}<Text>{item.orderNumber}</Text></Text>
                </View>
            </View>
            <FlatList
            data={item.items.items}
            keyExtractor={(_,index)=>index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>(
                <View style={styles.itemView}>
                 <ImageBackground source={{uri:item.Product.thumbnail}} style={styles.imageStyle} >
                    <View style={styles.overlayStyle}/>
                 </ImageBackground>
                <View style={styles.infoView}>
                    <Text style={styles.titleText}>{item.Product.title}</Text>
                    <Text style={styles.categoryText}>{item.Product.category}</Text>
                    <Text style={styles.brandText}>{strings.tags}<Text style={styles.brandValueText}>{item.Product.tags[0]}</Text></Text>
                    <View style={styles.quantityAndPriceView}>
                       <View style={styles.quantityView}>
                        <Text style={styles.unitText}>{strings.units}</Text>
                        <Text style={styles.quantityValueText}>{item.quantity}</Text>
                       </View>
                       <Text style={styles.priceText}>{(item.Product.price * item.quantity).toFixed(2) + strings.dollar}</Text>
                        </View>
                </View>

                </View>
            )}
            />

        </View>
    );
};


const styles = StyleSheet.create({
    orderAndCreatedText: {
        marginTop: vh(20),
        justifyContent: 'space-between',
    },
    orderText: {
        fontSize: normalize(18),
        fontFamily: fonts.RobotoSemiBold,
    },
    mainView: {
        marginHorizontal: vw(16),
    },
    itemView:{
        flexDirection:'row',
        marginHorizontal:vw(16),
        marginTop:vh(10),
        // height:vh(104),
        backgroundColor:color.Neutral_White,
        borderRadius:normalize(10),
    },
    imageStyle:{
        width:vw(104),
        height:'100%'
    },
    overlayStyle:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:1,
        backgroundColor:'rgba(0,0,0,0.09)',
    },
    infoView:{
        marginHorizontal:vw(10),
        marginTop:vh(5),
        flex:1,
    },
    titleText:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoSemiBold,
    },
    categoryText:{
        marginTop:vh(5),
        fontSize:normalize(11),
        fontFamily:fonts.RobotoRegular,
        color:color.Gray3,
    },
    brandText:{
        marginTop:vh(5),
        fontSize:normalize(11),
        fontFamily:fonts.RobotoRegular,
        color:color.Gray3,
    },
    brandValueText:{
            fontSize:normalize(13),
            fontFamily:fonts.RobotoSemiBold,
            color:color.Gray2,
    },
    quantityAndPriceView:{
        flexDirection:'row',
       justifyContent:'space-between',
        marginTop:vh(5),
        alignItems:'center',
        marginBottom:vh(5)


    },
    quantityView:{
        flexDirection:'row',
    },
    quantityValueText:{
        fontSize:normalize(11),
        fontFamily:fonts.RobotoSemiBold,
    },
    unitText:{
        fontSize:normalize(11),
        fontFamily:fonts.RobotoRegular,
    },
    priceText:{
        fontSize:normalize(13),
        fontFamily:fonts.RobotoSemiBold,
    },
});
