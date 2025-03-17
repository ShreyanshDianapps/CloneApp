import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import strings from '@cloneApp/utils/strings';
import { DollarIcon, FilledStarIcon, FordwardIcon, NavigationBackIcon } from '@cloneApp/utils/localsvg';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import color from '@cloneApp/utils/color';
import { normalize, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import fonts from '@cloneApp/utils/fonts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStack, ShopNavigationStack } from '@cloneApp/utils/type';
import { SvgProps } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screenNames } from '@cloneApp/utils/screenNames';
import ApplyChangesComponent from '../components/ApplyChangesComponent';
import { useAppDispatch } from '@cloneApp/utils/hooks';
import { FilteredData } from '@cloneApp/modals';
import { setFilterFields } from '../shopSlice';

type CustomSliderProps = {
  headinText: string,
  sliderValues: number[],
  icon: React.FC<SvgProps>,
  sendValue:(value:number[])=>void
};

const CustomSlider = (props: CustomSliderProps) => {
  const [sliderValues, setSliderValues] = useState(props.sliderValues);
  return (
    <>

      <Text style={styles.commonTextView}>{props.headinText}</Text>
      <View style={styles.priceRangeView}>
        <View style={styles.priceTextView}>
          <View style={styles.customValueView} >
            <props.icon height={vh(20)} width={vw(20)} />
            <Text>
              {sliderValues[0]}
            </Text>
          </View>
          <View style={styles.customValueView}>
            <props.icon height={vh(20)} width={vw(20)} />
            <Text> {sliderValues[1]}
            </Text>
          </View>
        </View>

        <MultiSlider
          values={sliderValues}
          trackStyle={{ backgroundColor: color.Gray1 }}
          sliderLength={300}
          min={sliderValues[0]}
          max={sliderValues[1]}
          step={1}
          allowOverlap={false}
          snapped
          onValuesChange={(values) => {
            setSliderValues(values);
          }}
          onValuesChangeFinish={(values)=>{

            props.sendValue(values);
          }}
          customMarker={(e) => <CustomMarker
          />}
        />
      </View>
    </>
  );
};
type Props={
  navigation:NativeStackNavigationProp<RootNavigationStack,'FilterScreen'>;
}
export const FilterScreen = (props:Props) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const route = useRoute<RouteProp<ShopNavigationStack, 'FilterScreen'>>();
  const {  brands } = route.params;
  const [filterdBrand,setFilteredBrand] = useState<string[]>(brands);
  const dispatch = useAppDispatch();
  const callBackBrand = (data:string[])=>{
      if(data.length > 0){
          setFilteredBrand(data);
      }
  };
  return (
    <View style={styles.container}>
      {/* Heading with back button */}
      <HeadingCompnent
        text={strings.filters}
        backIcon={NavigationBackIcon}
        isBackIconPressed={() =>props.navigation.goBack()}
      />
      <CustomSlider headinText={strings.priceRange} sliderValues={priceRange} icon={DollarIcon}
      sendValue={(value)=>{
        setPriceRange(value);}} />
      <CustomSlider headinText={strings.ratingRange} sliderValues={ratingRange} icon={FilledStarIcon}
        sendValue={(value)=>{
          setRatingRange(value);}}/>
      <View style={styles.brandsView}>
        <Text style={styles.brandText}>{strings.brands}</Text>
        <View style={styles.mainBrandView}>
          <View style={styles.allBrandTextView}>
            {
              brands.map((item, index) => (
                <Text style={styles.allBrandText} key={index}>
                  {item}
                </Text>
              ))
            }
          </View>
          <Pressable onPress={()=>props.navigation.navigate(screenNames.BrandsScreen,{brands:brands,callBackBrand})} style={{ transform: [{ rotate: '180deg' }] }}>
            <NavigationBackIcon />
          </Pressable>
        </View>
      </View>
      <ApplyChangesComponent isApplyPressed={()=>{
        const payload:FilteredData = {
          priceRange:priceRange,
          ratingRange:ratingRange,
          brands: filterdBrand,
        };
       dispatch(setFilterFields(payload));
       props.navigation.goBack();

      }} isDiscardPressed={()=>{
        props.navigation.goBack();
      }}/>
    </View>

  );
};

/* ✅ Custom Marker Component */
const CustomMarker = () => {
  return (
    <View style={styles.marker}> </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Netual_White_Light,
  },

  marker: {
    height: vw(30),
    width: vh(30),
    borderRadius: normalize(15),
    backgroundColor: color.PrimaryRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: '#fff',
  },
  priceRangeView: {
    paddingVertical: vh(20),
    backgroundColor: color.Neutral_White,
    alignItems: 'center',
  },
  priceTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: vh(280),
  },
  customValueView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(3),
  },
  commonHeadingTextView: {
    width: vw(screenWidth),
    height: vh(42),
    backgroundColor: color.Netual_White_Light,
  },
  commonTextView: {
    marginVertical: vh(12),
    marginLeft: vw(16),
    fontFamily: fonts.RobotoSemiBold,
    fontSize: normalize(16),
  },
  brandsView: {
    width: vw(343),
    alignSelf: 'center',
    marginTop: vh(10),
  },
  brandText: {
    fontFamily: fonts.RobotoSemiBold,
    fontSize: normalize(16),
    marginBottom: vh(5),
  },
  allBrandTextView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: vw(300),
    gap: normalize(5),
  },
  mainBrandView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allBrandText: {
    fontFamily: fonts.RobotoRegular,
    fontSize: normalize(11),
  },

});
