import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { RatingStarComponent } from '../components/RatingStarComponnet';
import strings from '@cloneApp/utils/strings';
import { normalize, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import color from '@cloneApp/utils/color';
import { CommonTextInput } from '@cloneApp/components/CommonTextInput';
import { Portal } from '@gorhom/portal';
import { CommonButton } from '@cloneApp/components/CommonButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { Review } from '@cloneApp/modals';
import { RouteProp, useRoute } from '@react-navigation/native';
import { checkingReview, getReviews, storeReviews, Users } from '../shopAction';


type Props = {
  navigation: NativeStackNavigationProp<RootNavigationStack, 'BottomSheetReviwComp'>;
};

export const BottomSheetReviwComp = (props: Props) => {
  const [text, setText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const {user} = useAppSelector((state)=>state.auth);
  const [ratings,setRatings] = useState(0);
  const [buttonText,setButtonText] = useState(strings.sendReview);
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ShopNavigationStack,'BottomSheetReviwComp'>>();
  const {data} = route.params;

  // Memoized snap points to avoid unnecessary re-renders
  console.log('First Rendert');
  const snapPoints = useMemo(() => [540 + keyboardHeight], [keyboardHeight]);

  useEffect(()=>{
const payload:Users = {
  userId:user?.userId ?? '',
  productId:data?.id ?? '',
};
dispatch(checkingReview(payload)).unwrap().then((res:Review| null)=>{
  if(res){
    setRatings(res.ratings);
    // setText(res.comment);
    setButtonText(strings.updateReview);
  }
});
  },[dispatch,user]);

  // Keyboard Listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height );
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Handle Close Animation
  const handleClose = useCallback(() => {
    console.log('Helli i am pen down');
    Keyboard.dismiss();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      props.navigation.goBack();
    });
  }, [props.navigation]);

  // Memoized onChange to prevent unnecessary re-renders
  return (
    <Pressable onPress={handleClose} style={{ flex: 1 }}>
      <Portal>
        <BottomSheet

          backgroundStyle={styles.bottomSheetStyle}
          enableDynamicSizing={false}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.indicatorStyle}
          onClose={handleClose}
        >
          <Text style={styles.headingText}>{strings.whatIsYourRate}</Text>
          <RatingStarComponent starWidth={36} sendRatings={(rating)=>{setRatings(rating);}} style={{ mainStyle: styles.ratingView }} rating={ratings} />
          <Text style={styles.thoughtText}>{strings.pleaseShareYourOpinion}</Text>
          <CommonTextInput
            placeholder={strings.yourReview}
            value={text}
            onChange={setText}
            style={{
              mainViewInput: styles.textInput,
              InputTextStyle: styles.textTextInput,
            }}
          />
          <CommonButton
            text={buttonText}
            onPress={async() => {

              if(user){
                const payload:Review = {
                  userId:user?.userId ?? ' ',
                  ratings:ratings,
                  comment:text,
                  Product:data,
              };
                await dispatch(storeReviews(payload));
                dispatch(getReviews(user.userId));
              }

            }}
            style={{
              mainView: styles.buttonMainView,
              InputTextStyle: styles.buttonTextStyle,
            }}
          />
        </BottomSheet>
      </Portal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: color.Netual_White_Light,
    borderTopRightRadius: normalize(60),
    borderTopLeftRadius: normalize(60),
  },
  indicatorStyle: {
    width: vw(60),
    height: vh(6),
    backgroundColor: color.Gray3,
    marginBottom: vh(16),
  },
  headingText: {
    fontSize: normalize(18),
    alignSelf: 'center',
    fontFamily: fonts.RobotoSemiBold,
    marginBottom: vh(17),
  },
  ratingView: {
    alignSelf: 'center',
    marginBottom: vh(34),
  },
  thoughtText: {
    width: vw(227),
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(18),
    fontFamily: fonts.RobotoSemiBold,
    marginBottom: vh(18),
  },
  textInput: {
    width: vw(327),
    height: vh(148),
    alignSelf: 'center',
    backgroundColor: color.Neutral_White,
    padding: normalize(12),
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  textTextInput: {
    fontSize: normalize(14),
    fontFamily: fonts.RobotoMedium,
  },
  buttonMainView: {
    marginTop: vh(35),
    alignSelf: 'center',
    height: vh(48),
    backgroundColor: color.PrimaryRed,
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: normalize(14),
    fontFamily: fonts.RobotoMedium,
    color: color.Netual_White_Light,
  },
});
