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
      publishableKey="pk_live_51MheApLjXdkkwBdXbrAKxjnsSIl9FStlDbVoG1j43lsFzIshb95EbmhVYzQuH7hxCudUMTOe3Ck11FrXiba5TUtV00lOCCCqPx"
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
