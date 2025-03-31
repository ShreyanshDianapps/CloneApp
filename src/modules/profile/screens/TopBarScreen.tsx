import { StyleSheet, Text, View, useWindowDimensions, Animated, SafeAreaView, Platform, Image ,RefreshControl, ActivityIndicator} from 'react-native';
import { TabView } from 'react-native-tab-view';
import React, { useRef, useEffect } from 'react';
import { normalize, screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
import localPngImages from '@cloneApp/utils/localPngImages';
import { useAppSelector } from '@cloneApp/utils/hooks';

// Define the type for route props
type RouteProps = {
  scrollY: Animated.Value;
};

// Data for FlatList
const data = Array.from({ length: 60 }, (_, i) => `Item ${i + 1}`);

// FlatList Route
const FlatListRoute: React.FC<RouteProps> = ({ scrollY }) => (
  <Animated.FlatList
    data={data}
    keyExtractor={(item, index) => index.toString()}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    )}
    scrollEventThrottle={16}
    renderItem={({ item }) => (
      <View style={styles.box}>
       <Image source={localPngImages.BigBanner} style={styles.imageStyle}/>
      </View>
    )}
    contentContainerStyle={{ paddingBottom: vh(100) }} 
  />
);

// ScrollView Route
const ScrollViewRoute: React.FC<RouteProps> = ({ scrollY }) => {
  const { ProductsData } = useAppSelector((state) => state.home);
  const [refreshing,setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate a refresh action
  };
  return (
    
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
       refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      scrollEventThrottle={16}
      style={styles.scene}
    >
      {refreshing && <ActivityIndicator/>}
      {ProductsData.map((item, index) => (
        <View key={index} style={styles.box}>
          <Image source={{ uri: item.thumbnail }} style={styles.imageStyle} />
          <Text style={styles.textStyle}> {item.description}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export const TopBarScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  // Animated Values
  const scrollY = useRef(new Animated.Value(0)).current;

  // diffClamp to limit scroll values
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 400);

  // Interpolate header height using diffClamp
  const headerHeight1 = diffClampScrollY.interpolate({
    inputRange: [0, 400],
    outputRange: [400, Platform.OS === 'ios' ? vh(50) : 0],
    extrapolate: 'clamp',
  });

  const routes = [
    { key: 'first', title: 'tab1' },
    { key: 'second', title: 'tab2' },
    { key: 'third', title: 'tab3' },
    { key: 'fourth', title: 'tab4' },
  ];

  // Render scenes with specific components
  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'first':
        return <FlatListRoute scrollY={scrollY} />;
      case 'second':
        return <ScrollViewRoute scrollY={scrollY} />;
      case 'third':
        return <FlatListRoute scrollY={scrollY} />;
      case 'fourth':
        return <ScrollViewRoute scrollY={scrollY} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.defaultStyle, { height: headerHeight1 }]} />
      <TabView
        style={styles.container}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Gray4,
  },
  scene: {
    flex: 1,
  },
  box: {
    height: vh(120),
    width: vw(screenWidth - 30),
    backgroundColor: color.Neutral_White,
    marginTop: vh(20),
    borderRadius: normalize(10),
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  defaultStyle: {
    backgroundColor: color.stellBlue,
  },
  defaultView: {
    flex: 1,
  },
  imageStyle: {
    height: vh(70),
    width: vw(100),
  },
  textStyle: {
    width: vw(260),
  },
});