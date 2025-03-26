import { StyleSheet, Text, View, useWindowDimensions, Animated, SafeAreaView, Platform } from 'react-native';
import { TabView } from 'react-native-tab-view';
import React, { useRef, useEffect } from 'react';
import { screenWidth, vh, vw } from '@cloneApp/utils/dimensions';
import color from '@cloneApp/utils/color';
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
        <Text style={styles.text}>{item}</Text>
      </View>
    )}
    contentContainerStyle={{ paddingBottom: vh(100) }} 
  />
);

// ScrollView Route
const ScrollViewRoute: React.FC<RouteProps> = ({ scrollY }) => (
  <Animated.ScrollView
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    )}
    scrollEventThrottle={16}
    style={styles.scene}
  >
    {data.map((item, index) => (
      <View key={index} style={styles.box}>
        <Text style={styles.text}>{item}</Text>
      </View>
    ))}
  </Animated.ScrollView>
);

export const TopBarScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  // Animated Values
  const scrollY = useRef(new Animated.Value(0)).current;
  // Effect to trigger Animated.timing
  
  // Define the available routes
  const headerHeight1 = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 0],
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
    {Platform.OS==='ios' ?
    <SafeAreaView style={{flex:1}}>
        <TabView
          style={styles.container}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
        </SafeAreaView>:
         <TabView
         style={styles.container}
         navigationState={{ index, routes }}
         renderScene={renderScene}
         onIndexChange={setIndex}
         initialLayout={{ width: layout.width }}
       />
    }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     backgroundColor:color.red,
  },
  scene: {
    flex: 1,
  },
  box: {
    height: vh(80),
    width: vw(screenWidth),
    alignSelf: 'center',
    backgroundColor: color.secondary100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(20),
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  defaultStyle: {
    backgroundColor: color.red,
  },
  defaultView: {
    flex: 1,
   
  },
});