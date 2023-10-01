import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Platform } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import thunk from 'redux-thunk';

import {
  authSlice,
  otherDataSlice,
} from '../_reducers/';

const rootReducer = combineReducers({
  otherDataSlice,
  authSlice,
});

const storage = Platform.OS === 'ios' ? AsyncStorage : EncryptedStorage;

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authSlice','otherDataSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
