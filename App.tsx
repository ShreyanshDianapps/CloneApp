
import RootNavigationRouter from '@cloneApp/router/RootNavigationRouter';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import store,{persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
const App = () => {

  return (
    <GestureHandlerRootView>
    <PortalProvider>


  <Provider store={store}>
<PersistGate persistor={persistor}>
    <NavigationContainer>
       <RootNavigationRouter/>
    </NavigationContainer>
     </PersistGate>
     </Provider>
     </PortalProvider>
     </GestureHandlerRootView>


  );
};
export default App;
