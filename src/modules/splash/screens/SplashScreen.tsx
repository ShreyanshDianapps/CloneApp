import { StyleSheet, View, Image, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";

//utils import
import color from '@cloneApp/utils/color';
import { vh, vw, normalize, screenWidth, screenHeight } from '@cloneApp/utils/dimensions';
//assetes import
import localPngImages from '@cloneApp/utils/localPngImages';


export const SplashScreen = () => {
  const animatedSize = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Step 1: Expand first
    Animated.timing(animatedSize, {
      toValue: 1,
      duration: 1000, 
      useNativeDriver: false, 
    }).start(() => {
     
      const startRotation = () => {
        animatedRotation.setValue(0); 
        Animated.timing(animatedRotation, {
          toValue: 1,
          duration: 5000, 
          useNativeDriver: true, 
        }).start(() => startRotation()); 
      };
  
      // Start the rotation
      startRotation();
    });
  }, []);
  
  
  const animatedLogoStyle = {
    transform: [
      {
        translateY: animatedSize.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10], // Moves up (instead of marginTop)
        }),
      },
      {
        scale: animatedSize.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2], 
        }),
      },
      {
        rotate: animatedRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'], // Continuous rotation
        }),
      },
    ],
  };
  

  return (
    <View style={styles.mainStyle}>
     
        <LinearGradient
        colors={[
          color.splashLightColor,
          color.splashLightColor,
          color.splashColor
        ]}
        style={styles.innerCircle}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.05, 1]}
      /> 
     <BlurView style={styles.innerBlurView} blurAmount={10} blurType='light'> </BlurView> 
      <LinearGradient
        colors={[
          color.splashLightColor,
          color.splashColor,
          color.splashLightColor
        ]}
        style={styles.mediumCircle}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5,1]}
      />
      <BlurView style={styles.mediumBlurView} blurAmount={10} blurType='light'></BlurView>
     <LinearGradient
        colors={[
          color.splashLightColor,
          color.splashColor,
          color.splashLightColor
        ]}
        style={styles.outerCircle}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5,1]}
      /> 
      <BlurView style={styles.outerBlurView} blurAmount={10} blurType='light'></BlurView> 
      <View style={styles.rotationalImageView}>
        <View  style={styles.leftView}>
          <Image source={localPngImages.SpashScreenImage} style={styles.leftImage}/>
          <Image source={localPngImages.SpashScreenImage} style={styles.rightImage} />
        </View>
        <View style={styles.rightView}>
        <Image source={localPngImages.SpashScreenImage} style={styles.leftImage}/>
        <Image source={localPngImages.SpashScreenImage} style={styles.rightImage} />
        </View>
        
      </View>
      <View style={styles.logoView}>
        <Animated.Image source={localPngImages.RotatingRing} style={[animatedLogoStyle]}/>
        <Image source={localPngImages.OneGodLogo} style={styles.handLogo}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    backgroundColor: color.Neutral_White,
  },
  innerBlurView: {
    position: 'absolute',
    zIndex: 3,
    top: vh(-(screenHeight * 0.24753694581)),
    width: vw(screenWidth * 1.02133333333),
    height: vh(screenHeight * 0.47167487684),
    borderBottomLeftRadius: normalize((screenWidth * 1.02133333333) / 2),
    borderBottomRightRadius: normalize((screenWidth * 1.02133333333) / 2),
    alignSelf: 'center',

  },
  mediumBlurView: {
    position: 'absolute',
    top: vh(-(screenHeight * 0.25985221674)),
    height: vh(screenHeight * 0.55049261083),
    width: vw(screenWidth * 1.192),
    zIndex: 2,
    borderBottomLeftRadius: normalize((screenWidth * 1.92) / 2),
    borderBottomRightRadius: normalize((screenWidth * 1.92) / 2),
    alignSelf: 'center',
  },
  outerCircle: {
    position: 'absolute',
    zIndex:1,
    top: vh(-(screenHeight * 0.20689655172)),
    height: vh(screenHeight * 0.55049261083),
    width: vw(screenWidth * 1.192),
    borderBottomLeftRadius: normalize((screenWidth * 1.192) / 2),
    borderBottomRightRadius: normalize((screenWidth * 1.192) / 2),
    alignSelf: 'center',
    shadowOffset:{
      height:vh(15),
      width:0
    },
    shadowOpacity:0.6,
    shadowRadius:5,
    shadowColor:color.splashLightColor
  },
  outerBlurView:{
    position: 'absolute',
    zIndex:1,
    top: vh(-(screenHeight * 0.20689655172)),
    height: vh(screenHeight * 0.55049261083),
    width: vw(screenWidth * 1.192),
    borderBottomLeftRadius: normalize((screenWidth * 1.192) / 2),
    borderBottomRightRadius: normalize((screenWidth * 1.192) / 2),
    alignSelf: 'center',
  },
  mediumCircle: {
    position: 'absolute',
    top: vh(-(screenHeight * 0.25985221674)),
    height: vh(screenHeight * 0.55049261083),
    width: vw(screenWidth * 1.192),
    zIndex: 2,
    borderBottomLeftRadius: normalize((screenWidth * 1.92) / 2),
    borderBottomRightRadius: normalize((screenWidth * 1.92) / 2),
    alignSelf: 'center',
    shadowOffset:{
      height:vh(15),
      width:0
    },
    shadowOpacity:0.4,
    shadowRadius:5,
    shadowColor:color.splashLightColor
  },
  innerCircle: {
    position: 'absolute',
    zIndex:3,
    top: vh(-(screenHeight * 0.24753694581)),
    width: vw(screenWidth * 1.02133333333),
    height: vh(screenHeight * 0.47167487684),
    borderBottomLeftRadius: normalize((screenWidth * 1.02133333333) / 2),
    borderBottomRightRadius: normalize((screenWidth * 1.02133333333) / 2),
    alignSelf: 'center',
    shadowOffset:{
      height:vh(15),
      width:0
    },
    shadowOpacity:0.46,
    shadowRadius:5,
    shadowColor:color.splashLightColor
  },
  rotationalImageView: {
    position: 'absolute',
    width: screenWidth,
    top: vh(screenHeight * 0.05418719211),
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(16),
  },
  leftView:{
    flexDirection:'row',
  },
  leftImage:{
    position:'absolute',
    zIndex:4,
    top:vh(-55)
  },
  rightImage:{
    marginTop:vh(30),
    marginLeft:vh(60)
  },
  rightView:{
    transform: [{ rotateY: '180deg' }],
  },
  dotView:{
      position:'absolute',
      height:vh(10),
      width:vw(10),
      borderRadius:normalize(5),
      backgroundColor:color.splashColor,
      top:vh(18),
      left:vw(22)
  },
  logoView:{
    position:'absolute',
    top:vh(338),
    alignSelf:'center'
  },
  handLogo:{
    position:'absolute',
    top:vh(-15),
    alignSelf:'center'

  }
})