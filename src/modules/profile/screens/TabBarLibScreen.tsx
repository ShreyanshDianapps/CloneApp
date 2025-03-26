import { Tabs } from 'react-native-collapsible-tab-view';
import { View, StyleSheet, ListRenderItem } from 'react-native';
import React from 'react';

const HEADER_HEIGHT = 250;
const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + '';

const Header = () => <View style={styles.header} />;

export const TabBarLibScreen = () => {
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => (
    <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
  ), []);

  return (
    <Tabs.Container renderHeader={Header} headerHeight={HEADER_HEIGHT}>
      <Tabs.Tab name="Tab A">
        <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tab B">
        <Tabs.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: { height: 250, width: '100%' },
  boxA: { backgroundColor: 'white' },
  boxB: { backgroundColor: '#D8D8D8' },
  header: { height: HEADER_HEIGHT, width: '100%', backgroundColor: '#2196f3' },
});
