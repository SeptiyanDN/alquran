import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routes/RootNavigation';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/_store/store';
import ErrorBoundary from 'react-native-error-boundary';
import { Sentry } from './utils/services';
import { AlertProvider, Alert } from './components';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import { usePushNotificationManager } from './utils/hooks/PushNotificationManager';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const SentryErrorBoundary = ({ children }: { children: any }) => (
  <ErrorBoundary
    onError={(error: Error) => {
      Sentry.captureException(error);
    }}>
    {children}
  </ErrorBoundary>
);

const App = () => {
usePushNotificationManager();

  return (
    <SentryErrorBoundary>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AlertProvider>
          <NavigationContainer>
            <RootNavigation />
            <Alert />
            <Toast />
          </NavigationContainer>
        </AlertProvider>
      </PersistGate>
    </Provider>
  </SentryErrorBoundary>
  );
};

export default codePush(codePushOptions)(App);
