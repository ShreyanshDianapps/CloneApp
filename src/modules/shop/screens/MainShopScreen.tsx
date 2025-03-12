import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { HeadingCompnent } from '../components/HeadingCompnent';
import { DummyImage, NavigationBackIcon } from '@cloneApp/utils/localsvg';
import { normalize, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import strings from '@cloneApp/utils/strings';
import color from '@cloneApp/utils/color';
import fonts from '@cloneApp/utils/fonts';
import { useAppDispatch, useAppSelector } from '@cloneApp/utils/hooks';
import { getCategoriesAction } from '../shopAction';
import { CategoriesData } from '@cloneApp/modals';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationStack } from '@cloneApp/utils/type';
import { screenNames } from '@cloneApp/utils/screenNames';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
type Props={
  navigation:NativeStackNavigationProp<RootNavigationStack,'MainShopScreen'>;
}
export const MainShopScreen = (props:Props) => {
  const dispatch = useAppDispatch();
  const categorylist = ['Women', 'Men', 'Kid'];
  const [activeIndigator, setActiveIndigator] = useState(0);
  const [categoryData, setCategoryData] = useState<CategoriesData[]>([]);
  const { loading } = useAppSelector((state) => state.shop);
  //a function to render items according to categories
  // Dispatch when component mounts
  useEffect(() => {
    dispatch(getCategoriesAction()).unwrap().then((res) => {
      setCategoryData(res);
    });
  }, [dispatch]);
  // Function to handle category selection
  const handleCategorySelect = useCallback((index: number) => {
    if (index !== activeIndigator) {
      setActiveIndigator(index);
      dispatch(getCategoriesAction()).unwrap().then((res) => {
        setCategoryData(res);
      });
    }
  }, [activeIndigator, dispatch]);
  //to show the data of the list
  const renderList = ({ item }: { item: CategoriesData }) => {
    return (
      <Pressable
      onPress={()=>{
          props.navigation.navigate(screenNames.SelectedCategoryProductScreen,{url:item.url,name:item.name});
      }}
      style={styles.category_Card_comp} disabled={loading}>
        {loading ? (
          <ShimmerPlaceHolder style={styles.shimmerPlaceHolderView} />
        ) : (
          <>
            <View style={styles.categoryTextView}>
              <Text>{item.name}</Text>
            </View>
            <DummyImage />
          </>
        )}
      </Pressable>
    );
  };



return (
  <View>
    <HeadingCompnent backIcon={NavigationBackIcon} text={strings.categories}
    isBackIconPressed={(value)=>{
      if(value){
        props.navigation.goBack();
      }
    }}/>
    <FlatList
      data={categorylist}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => <Pressable
        onPress={() => {
          handleCategorySelect(index);
        }} style={styles.genderList}><Text style={styles.genderNameStyle}>{item}</Text>
        <View style={[activeIndigator === index && styles.lineIndecator]} />
      </Pressable>}
      contentContainerStyle={styles.flatlistStyle}
    />
    <View style={styles.sale_Card_View}>
      <Text style={styles.summerSaleText}>{strings.summerSale}</Text>
      <Text style={styles.offText}>{strings.offText}</Text>
    </View>
    <View style={styles.categoryDataListView}>
      <FlatList
        data={categoryData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderList}
      />
    </View>
  </View>
);
};
const styles = StyleSheet.create({
  flatlistStyle: {

    flexDirection: 'row',
    backgroundColor: color.Neutral_White,
    height: vh(44),
  },
  genderList: {
    alignItems: 'center',
    height: vh(44),
    width: vw(screenWidth * 0.3),
    justifyContent: 'center',
  },
  lineIndecator: {
    height: vh(4),
    width: vw(screenWidth * 0.33),
    backgroundColor: color.PrimaryRed,
    marginTop: vh(4),
  },
  genderNameStyle: {
    marginTop: vh(14),
    fontSize: normalize(16),
    fontFamily: fonts.RobotoSemiBold,
  },
  sale_Card_View: {
    marginTop: vh(20),
    marginHorizontal: vw(16),
    height: vh(100),
    width: vw(343),
    backgroundColor: color.PrimaryRed,
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  summerSaleText: {
    fontSize: normalize(24),
    fontFamily: fonts.RobotoSemiBold,
    color: color.Neutral_White,
  },
  offText: {
    fontFamily: fonts.RobotoMedium,
    fontSize: normalize(14),
    color: color.Netual_White_Light,
  },
  categoryDataListView: {
    marginHorizontal: vw(16),
    height: vh(450), marginTop: vh(16),

  },
  category_Card_comp: {
    width: vw(343),
    height: vh(93),
    flexDirection: 'row',
    marginBottom: vh(16),
  },
  categoryTextView: {
    width: '50%',
    height: '100%',
    borderTopLeftRadius: normalize(8),
    borderBottomLeftRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Netual_White_Light,
  },
  shimmerPlaceHolderView:{
    width:vw(343),
    height:vh(93),
  },

});
