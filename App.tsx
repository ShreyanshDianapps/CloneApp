
import RootNavigationRouter from '@cloneApp/router/RootNavigationRouter';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import store,{persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {

  return (
//   <Provider store={store}>
// <PersistGate persistor={persistor}>
    <NavigationContainer>
       <RootNavigationRouter/>
    </NavigationContainer>
    // </PersistGate>
    // </Provider>
  );
};
export default App;
