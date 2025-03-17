import { StyleSheet, View } from 'react-native';
import React, { ComponentType,useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
type  MyCustomProp={
  dataSort?:string[],
  isPressedSort?:(index:number)=>void;
}
type Props= {
  Component: ComponentType<MyCustomProp>;
  // componentProps: T;
  componentProps?: MyCustomProp;
};

const CommonBottomSheet = (props:Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    console.log('Hello');
  return (
    <Portal>
        <BottomSheet
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        snapPoints={[400]}
        ref={bottomSheetRef}>
    <props.Component  />
      </BottomSheet>
      </Portal>
  );
};

export default CommonBottomSheet;

const styles = StyleSheet.create({
  // mainView: {
  //   flex: 1,
  // },
});
