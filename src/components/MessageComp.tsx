import { StyleSheet, Text ,Animated} from 'react-native';
import React, { useRef,useEffect } from 'react';
import { vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';

type Props = {
    message:string,
    duration:number
}


export const MessageComp = (props: Props) => {
    console.log('Hello i am message Componet');
    const opacity = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
        Animated.timing(opacity,{
                toValue:1,
                duration:500,
                useNativeDriver:true,
        }).start(()=>{
            setTimeout(()=>{
                Animated.timing(opacity,{
                    toValue:0,
                    duration:500,
                    useNativeDriver:true,
                }).start();
            },props.duration);
        });
    },[props.duration]);

  return (
    <Animated.View style={[styles.conatiner,{opacity}]}>
      <Text>{props.message}</Text>
    </Animated.View>
  );
};

export default MessageComp;

const styles = StyleSheet.create({
    conatiner:{
            height:vh(30),
            width:vw(200),
            justifyContent:'center',
            alignSelf:'center',
            alignItems:'center',
            backgroundColor:color.red,
    },
});
