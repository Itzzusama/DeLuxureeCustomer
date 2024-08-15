import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigation from './src/navigation';
import { persistor, store } from './src/store';
import '@react-native-firebase/app';
import '@react-native-firebase/storage';
import "@react-native-firebase/auth";
import { requestUserPermission, NotificationListner } from './src/utils/pushnotification_helper';


const App = () => {

  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  return (

    <StripeProvider
      publishableKey="pk_test_51MheApLjXdkkwBdXGrVWbtUWP6iPoO1v3WZ75V14b9pWCHNk4oB2OkqGn6arX4zrVukrRsgd37eswlqLrQIy7Ku100FWia7mHe"
      urlScheme="your-url-scheme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>

        </PersistGate>
      </Provider>
    </StripeProvider>

  );
};

export default App;
