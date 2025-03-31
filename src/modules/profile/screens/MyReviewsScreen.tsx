import { StyleSheet, Animated, View, FlatList, Pressable, Text, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { normalize, screenHeight, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import localPngImages from '@cloneApp/utils/localPngImages';
import { Review } from '@cloneApp/modals';
import { useAppSelector } from '@cloneApp/utils/hooks';
import { RatingComp } from '@cloneApp/modules/shop/components/RatingComp';
import fonts from '@cloneApp/utils/fonts';
import strings from '@cloneApp/utils/strings';
import { OptionsICon } from '@cloneApp/utils/localsvg';
type OptionsProps = {
  id: number;
}
const OptionsContainer = (props: OptionsProps) => {
  return (
    // <View style={styles.optionMainView}>
    <View style={styles.optionContainerView}>
      <Pressable style={styles.optionTextView}>
        <Text style={styles.optionTextStyle}>{strings.delete}</Text>
      </Pressable>
      <Pressable style={styles.optionTextView}>
        <Text style={styles.optionTextStyle}>{strings.edit}</Text>
      </Pressable>
    </View>
    // </View>
  )

}

const MyReviewsScreen = () => {

  const animatedHeightRef = useRef(new Animated.Value(0)).current
  const { MyReviews } = useAppSelector((state) => state.profile)
  const [myReviewData, setMyReviewData] = useState<Review[]>(MyReviews);
  const animatedMarginLeftRef = useRef(new Animated.Value(0)).current
  const animatedCrossRef = useRef(new Animated.Value(0)).current
  const [newState, setNewState] = useState(false)
  const animatedCardRef = useRef(new Animated.Value(0)).current
  const [showOptions, setShowOptions] = useState({
    isShow: false,
    id: -1,
  })

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
  const animatedCardViewStyle = {
    marginTop: animatedCardRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, vh(80)]
    }),
    gap: animatedCardRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, normalize(30)]
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
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const renderHeader = useCallback(() => {
    return (
      <Animated.View style={[styles.upperViewStyle, { height: animatedHeight }]}>
        {selectedReview &&
          <View style={styles.reviewView}>
            <Text style={styles.commentStyle}>{selectedReview.comment}</Text>
          </View>}

      </Animated.View>
    );
  }, [selectedReview]);
  return (
    <Pressable onPress={() => {
      if (showOptions.isShow) {
        setShowOptions({
          isShow: false,
          id: -1
        })
      }
    }} style={styles.container}>
      {renderHeader()}
      <Animated.View style={[styles.defaultStyle, { marginLeft: animatedMarginLeft }]}>
        <FlatList

          contentContainerStyle={styles.conatinerStyle}
          data={myReviewData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(item) => (
            <Pressable onLongPress={() => {
              setSelectedReview(item.item)
            }}
              onPress={() => {
                if (showOptions.isShow) {
                  setShowOptions({
                    isShow: false,
                    id: -1
                  })
                }
              }} style={styles.cardStyle}>
              <ImageBackground source={{ uri: item.item.Product.thumbnail }} style={styles.imageView}>

              </ImageBackground>
              <View  >
                <View style={styles.ratingView}>
                  <Text style={styles.rateText}>{item.item.ratings}</Text>
                  <View style={styles.rateView}>
                    <RatingComp rating={item.item.ratings} />
                  </View>
                </View>
                <View style={styles.commentView}>
                  {item.item.comment.length > 20 ?
                    <Text style={styles.commentText}>{item.item.comment.slice(0, 15)}<Text style={styles.viewMoreText}>{strings.viewMore}</Text></Text>
                    : <Text style={styles.commentText}>{item.item.comment}</Text>}

                </View>
              </View>
              <Pressable onPress={() => setShowOptions({
                isShow: true,
                id: item.index
              })} style={styles.optionsStyle}> <OptionsICon /></Pressable>
              {showOptions.isShow && showOptions.id === item.index && <OptionsContainer id={item.item.Product.id} />}
            </Pressable>


          )}
        />
      </Animated.View>

      <Animated.View style={[styles.defaulFloatingButton, animatedCrossStyle]}>
        <Animated.View style={[animatedCardViewStyle]}>
          <Animated.View style={[styles.defaultCardStyle, animatedCardStyle]}>
            <Pressable onPress={() => {
              const sortedReviews = Array.from(MyReviews).sort((a, b) => a.ratings - b.ratings);
              setMyReviewData(sortedReviews);
            }}> <Text style={styles.cardTextStyle}>{strings.asending}</Text></Pressable>
          </Animated.View>
          <Animated.View style={[styles.defaultCardStyle, animatedCardStyle]}>
            <Pressable onPress={() => {
              const sortedReviews = Array.from(MyReviews).sort((a, b) => b.ratings - a.ratings);
              setMyReviewData(sortedReviews);
            }}><Text style={styles.cardTextStyle}>{strings.desending}</Text></Pressable>
          </Animated.View>
          <Animated.View style={[styles.defaultCardStyle, animatedCardStyle]}>
          <Pressable onPress={() => {
    const sortedReviews = [...MyReviews].sort((a, b) => b.comment.length - a.comment.length);
    setMyReviewData(sortedReviews);
}}><Text style={styles.cardTextStyle}>{strings.apply}</Text></Pressable>

          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Pressable onPress={handleCrossAnimation} style={styles.pressable}>
        <Animated.Image source={localPngImages.CrossIconPng} style={[styles.imageStyle, animatedTransformationStyle]} />
      </Pressable>

    </Pressable>
  );
};

export default MyReviewsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary40

  },
  upperViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    height: vh(300),
    backgroundColor: color.stellBlue,
    borderBottomLeftRadius: normalize(50),
    borderBottomRightRadius: normalize(50)
  },
  cardStyle: {
    height: vh(80),
    backgroundColor: color.Neutral_White,
    width: vw(303),
    borderRadius: normalize(15),
    flexDirection: 'row'
  },
  defaultStyle: {
    zIndex: 1,
    top: vh(300),
    height: vh(400)
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
  imageStyle: {
    height: vh(70),
    width: vw(70),
  },
  imageView: {
    height: vh(60),
    width: vw(60),
    // borderRadius:normalize(30),
  },
  ratingView: {
    marginTop: vh(10),
    marginLeft: vw(10),
    flexDirection: 'row'
  },
  rateView: {
    marginTop: vh(4),
    marginLeft: vw(4)
  },
  rateText: {
    fontSize: normalize(18),
    fontFamily: fonts.RobotoSemiBold
  },
  commentView: {

    height: vh(40),
    marginTop: vh(6),

    marginLeft: vw(10)
  },
  commentText: {
    fontSize: normalize(11.3),
    fontFamily: fonts.RobotoRegular,
    color: color.Gray2
  },
  viewMoreText: {
    fontSize: normalize(14),
    fontFamily: fonts.RobotoSemiBold,
    color: color.secondary40
  },
  optionsStyle: {
    position: 'absolute',
    left: '94%',
    top: vh(9),

  },
  reviewView: {

  },
  commentStyle: {
    alignSelf: 'center',
    marginTop: vh(70),
    fontSize: normalize(20),
    color: color.secondary40
  },
  optionContainerView: {
    position: 'absolute',
    height: vh(60),
    left: '60%',
    top: vh(20),
    width: vw(140),
    backgroundColor: color.Netual_White_Light,
    zIndex: 1,
    borderRadius: normalize(10)
  },
  optionMainView: {

    height: vh(screenHeight),
    width: vw(screenWidth),
    backgroundColor: color.Netual_White_Light,
    zIndex: 1
  },
  optionTextStyle: {
    fontSize: normalize(18),
    fontFamily: fonts.RobotoSemiBold

    // marginTop:vh(10),

  },
  optionTextView: {
    // marginTop:vh(10),
    height: '50%',
    width: '100%',
    borderBottomWidth: normalize(0.3),
    borderColor: color.Gray4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextStyle: {
    alignSelf: 'center',
    marginTop: vh(12),
    fontSize: normalize(20)
  }
}); 
