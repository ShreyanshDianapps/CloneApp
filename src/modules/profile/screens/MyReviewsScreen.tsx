import { StyleSheet, Animated, View, FlatList, Pressable, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { normalize, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import localPngImages from '@cloneApp/utils/localPngImages';


const MyReviewsScreen = () => {
  const array = [1, 1, 1, 1, 1, 1]
  const animatedHeightRef = useRef(new Animated.Value(0)).current
  const animatedMarginLeftRef = useRef(new Animated.Value(0)).current
  const animatedCrossRef = useRef(new Animated.Value(0)).current
  const [newState, setNewState] = useState(false)
  const animatedCardRef = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeightRef, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(animatedMarginLeftRef, {
        toValue: 1,
        useNativeDriver: false,
        duration: 1000
      })
    ]).start()
  }, [])
  const animatedCardViewStyle={
      marginTop:animatedCardRef.interpolate({
        inputRange:[0,1],
        outputRange:[0,vh(80)]
      }),
      gap:animatedCardRef.interpolate({
        inputRange:[0,1],
        outputRange:[0,normalize(30)]
      })

  }
  const animatedTransformationStyle = {
    transform: [
      {
        rotate: animatedCardRef.interpolate({
          inputRange: [0, 1], // From 0 to 1
          outputRange: ['0deg', '180deg'], // Maps 0 to 70 degrees
        }),
      },
    ],
  };
  const animatedHeight = animatedHeightRef.interpolate({
    inputRange: [0, 1],
    outputRange: [100, vh(350)], // Width expands from 0 to 250vw
  });
  const animatedMarginLeft = animatedMarginLeftRef.interpolate({
    inputRange: [0, 1],
    outputRange: [vw(-300), vw(40)],
  });
  const handleCrossAnimation = () => {
    setNewState(!newState)
    Animated.parallel([
      Animated.timing(animatedCrossRef, {
        toValue: newState ? 1 : 0,
        useNativeDriver: false,
        duration: 1000
      }),
      Animated.timing(animatedCardRef, {
        toValue: newState ? 1 : 0,
        useNativeDriver: false,
        duration: 1000
      })
    ]).start()
  }
  const animatedCardStyle = {
    width: animatedCardRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200]
    }),
    height: animatedCardRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, vh(45)]
    }),
    backgroundColor: animatedCardRef.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', color.Netual_White_Light]
    }),
  }
  const animatedCrossStyle = {
    width: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 390]
    }),
    height: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 500]
    }),
    top: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [620, 300]
    }),
    right: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    }),
    backgroundColor: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(70,130,180,0.8)', 'rgba(70, 130, 180, 0.9)']
    }),
    borderTopLeftRadius: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 450]
    }),
    borderBottomRightRadius: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    }),
    borderTopRightRadius: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    }),
    borderBottomLeftRadius: animatedCrossRef.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 10]
    }),
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.upperViewStyle, { height: animatedHeight }]}>

      </Animated.View>
      <Animated.View style={[styles.defaultStyle, { marginLeft: animatedMarginLeft }]}>
        <FlatList
          contentContainerStyle={styles.conatinerStyle}
          data={array}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(item) => (
            <View style={styles.cardStyle}>
                
            </View>
          )}
        />
      </Animated.View>

      <Animated.View style={[styles.defaulFloatingButton, animatedCrossStyle]}>
        <Animated.View style={[animatedCardViewStyle]}>
        <Animated.View style={[styles.defaultCardStyle, animatedCardStyle]}>
        </Animated.View>
        <Animated.View style={[styles.defaultCardStyle, animatedCardStyle]}>
        </Animated.View>
        <Animated.View style={[styles.defaultCardStyle, animatedCardStyle]}>

        </Animated.View>
        </Animated.View>
      </Animated.View>
      <Pressable onPress={handleCrossAnimation} style={styles.pressable}>
      <Animated.Image source={localPngImages.CrossIconPng} style={[styles.imageStyle,animatedTransformationStyle]}/>
      </Pressable>

    </View>
  );
};

export default MyReviewsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary40

  },
  upperViewStyle: {
    height: vh(300),
    backgroundColor: color.stellBlue,
    borderBottomLeftRadius: normalize(50),
    borderBottomRightRadius: normalize(50)
  },
  cardStyle: {
    height: vh(80),
    backgroundColor: color.Neutral_White,
    width: vw(303),
    borderRadius: normalize(15)
  },
  defaultStyle: {
    position: 'absolute',
    zIndex: 1,
    top: vh(300),

    height: vh(400)
    // left:0,
    // right:0,
    // bottom:0,

  },
  conatinerStyle: {
    gap: normalize(10)
  },
  defaulFloatingButton: {
    position: 'absolute',
    backgroundColor: color.Gray2,
    height: vh(80),
    width: vw(80),
    borderRadius: normalize(40),
    top: vh(600),
    alignSelf: 'flex-end',
    right: vw(20),
    zIndex: 1,
    // justifyContent:'center'
  },
  pressable: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    left: screenWidth - 95,
    top: vh(580),
    zIndex: 1,
  },
  defaultCardStyle: {
    alignSelf: 'flex-end',
    marginRight: vw(10),
    borderRadius: normalize(10)
  },
  imageStyle:{
    height:vh(70),
    width:vw(70),
    
  }
}); 
