import { StyleSheet, Text, View ,Pressable,ImageBackground} from 'react-native';
import { PlusIcon,MinusIcon,OptionsICon } from '@cloneApp/utils/localsvg';
import React from 'react';
import { AddProduct } from '@cloneApp/modals';
import strings from '@cloneApp/utils/strings';
import { vh,normalize,vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import color from '@cloneApp/utils/color';
import { debounce } from '@cloneApp/utils/sign_in';

type Props={
    data:AddProduct,
    sendQunatityBack:(value:number)=>void
}

const RenderMyBag = (props: Props) => {
    const [quantity,setQuantity] = React.useState(props.data.quantity);
    const handleQualityChange = (change:number)=>{
        const debouncedSendQuantity = debounce((change: number) => {
            props.sendQunatityBack(change);
          }, 4000);

          // Call it when needed
          debouncedSendQuantity(change);
    };
  return (
    <View style={styles.myBagCard}>
        <ImageBackground source={{ uri:props.data.Product.thumbnail }} style={styles.imageStyle} resizeMode="contain">
          <View style={styles.overlay} />
        </ImageBackground>
        <View style={styles.itemDataView}>
          <Pressable style={styles.optionsStyle}>
            <OptionsICon />
          </Pressable>
          <Text style={styles.titleText}>{props.data.Product.title}</Text>
          <Text style={styles.titleText}>{props.data.Product.brand}</Text>
          <View style={styles.price_quantity}>
            <View style={styles.adjustquantity}>
              <Pressable
                onPress={() => {
                   setQuantity(quantity + 1);
                   handleQualityChange(quantity + 1);

                }}
                style={styles.minus}
              >
                <MinusIcon />
              </Pressable>
              <Text>{quantity}</Text>
              <Pressable
                onPress={() => {

                    setQuantity(quantity - 1);
                    handleQualityChange(quantity + 1);
                }}
                style={styles.minus}
              >
                <PlusIcon />
              </Pressable>
            </View>
            <Text style={styles.priceText}>{props.data.Product.price + strings.dollar}</Text>
          </View>
        </View>
      </View>
  );
};

export default RenderMyBag;

const styles = StyleSheet.create({
     myBagStyle:{
            flexDirection:'row',
          fontSize:normalize(34),
          fontFamily:fonts.RobotoBold,
      },
          myBagCard:{
            width:vw(343),
          height:vh(106),
          flexDirection:'row',
          shadowOffset:{
            height:4,
            width:0,
          },
          shadowOpacity:0.5,
          shadowRadius:5,
          elevation:5,

      },
          imageStyle:{
            width:vw(104),
          height:vh(104),
      },
          itemDataView:{
            width:vw(239),
          height:vh(104),
          backgroundColor:color.Neutral_White,
      },
          overlay:{
            position:'absolute',
          backgroundColor:'rgba(0,0,0,0.1)',
          zIndex:1,
          top:0,
          left:0,
          right:0,
          bottom:0,
      },
          titleText:{
            marginLeft:vw(5),
          fontSize:normalize(13),
          fontFamily:fonts.RobotoRegular,
          marginTop:vh(5),
          width:vw(190),
      },
          optionsStyle:{
            position:'absolute',
          alignSelf:'flex-end',
          right:vw(20),
          marginTop:vh(8),
      },
          adjustquantity:{
            flexDirection:'row',
          gap:normalize(8),
          alignItems:'center',
          marginLeft:vw(5),
          marginTop:vh(10),
      },
          minus:{
            height:vh(36),
          width:vw(36),
          backgroundColor:color.Neutral_White,
          borderRadius:normalize(18),
          justifyContent:'center',
          alignItems:'center',
          shadowOffset:{
            height:3,
          width:0,
        },
          shadowOpacity:0.5,
          shadowRadius:5,
          elevation:5,
      },
      price_quantity:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
       marginRight:vw(13),
      },
      priceText:{
        fontSize:normalize(16),
        fontFamily:fonts.RobotoBold,
        alignSelf:'center',
        marginTop:vh(10),
      },
});
