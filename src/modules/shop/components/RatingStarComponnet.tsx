import { StyleSheet, View, TouchableOpacity, Image, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';
//utils import
import localPngImages from '@cloneApp/utils/localPngImages';
import { normalize, vh, vw } from '../../../utils/dimensions';
import color from '../../../utils/color';
type Props={
    starWidth:number;
    sendRatings?:(value:number)=>void
    style?:{
        mainStyle?:StyleProp<ViewStyle>
    }
}
export const RatingStarComponent = (props:Props) => {
    const [rating, setRating] = useState(0);
    const handlePress = (index: number, event: GestureResponderEvent) => {
        const { locationX } = event.nativeEvent;
        const starWidth = props.starWidth;
        if (locationX < starWidth / 2) {
            setRating(index + 0.5); // Half-star rating
        } else {
            setRating(index + 1); // Full-star rating
        }
        if(props.sendRatings){
            props.sendRatings(rating);
        }
    };
    return (
        <View style={[styles.ratingView,props.style?.mainStyle]}>
            {Array.from({ length: 5 }).map((_, index) => {
                const isFull = rating >= index + 1;
                const isHalf = rating === index + 0.5;
                return (
                    <TouchableOpacity key={index} onPress={(event) => handlePress(index, event)} style={styles.starContainer}>
                        <Image source={isFull ? localPngImages.FullStarIcon : localPngImages.EmptyStarIcon} style={styles.starIcon} />
                        {isHalf && <View style={styles.halfStarOverlay} >
                            <Image source={localPngImages.FullStarIcon} style={styles.starIcon} />
                            <View style={styles.halfStarMask} />
                        </View>
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
const styles = StyleSheet.create({
    ratingView: {
        flexDirection: 'row',
        gap: normalize(5),
    },
    starContainer: {
        width: vw(36),
        height: vh(36),
        position: 'relative',
    },
    starIcon: {
        width: vh(35),
        height: vh(35),
    },
    halfStarOverlay: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        left: 0,
        // top:0,
        overflow: 'hidden',
    },
    halfStarMask: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
});
