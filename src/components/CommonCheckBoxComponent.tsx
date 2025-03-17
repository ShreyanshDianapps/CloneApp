import { Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React, { useState } from 'react';
import { SvgProps } from 'react-native-svg';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';

type Props = {
    selectIcon:React.FC<SvgProps>
    isPressed:(value:boolean)=>void;
    dimensions:number[],
   style?:{
           notSlectedView?: StyleProp<ViewStyle>;
           selectedView?: StyleProp<ViewStyle>;

       }
}

const CommonCheckBoxComponent = (props: Props) => {
    const [isSelect,setIsSelect] = useState(false);
  return (
    <Pressable onPress={()=>{
        setIsSelect(!isSelect);
        props.isPressed(!isSelect);

    }}
    style={[styles.defaultView,isSelect ? props.style?.selectedView : props.style?.notSlectedView,

    ]}>
      {isSelect && <props.selectIcon height={vh(props.dimensions[0])} width={vw(props.dimensions[1])} />}
    </Pressable>
  );
};

export default CommonCheckBoxComponent;

const styles = StyleSheet.create({
    defaultView:{
            width:vh(20),
            height:vw(20),
            borderWidth:normalize(1.5),
            borderRadius:normalize(3),
            borderColor:color.Gray4,
            justifyContent:'center',
            alignItems:'center',
    },
});
