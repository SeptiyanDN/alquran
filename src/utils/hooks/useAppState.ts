import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type AppStatus = 'active' | 'background' | 'inactive';

const useAppState = (): AppStatus => {
  const [appState, setAppState] = useState<AppStatus>(
    AppState.currentState as AppStatus,
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState as AppStatus);
    };

    // Subscribe to app state changes
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      // Clean up the subscription
      appStateSubscription.remove();
    };
  }, []);

  return appState;
};

export default useAppState;
