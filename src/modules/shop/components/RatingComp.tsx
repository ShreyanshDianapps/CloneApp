import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { EmptyStarIcon, FilledStarIcon } from '@cloneApp/utils/localsvg'
import { normalize } from '@cloneApp/utils/dimensions'

type Props = {
    rating:number
    style?:{
    mainStyle?:StyleProp<ViewStyle>
    }

}

 const RatingComp = (props: Props) => {
  return (
    
      <View style={[styles.ratingCompRateingView,props.style?.mainStyle]}>
            {Array.from({ length: 5 }, (_, i) => (
                <View key={i}>
                    {i < props.rating ? <FilledStarIcon /> : <EmptyStarIcon />}
                </View>
            ))}
        </View>
   
  )
}
export default RatingComp
const styles = StyleSheet.create({
    ratingCompRateingView:{
            gap:normalize(2),
            flexDirection:'row',
        },
})