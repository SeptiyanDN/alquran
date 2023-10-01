import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isSignedIn: boolean;
  data?: any;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isSignedIn: false,
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        data: any;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.data = action.payload.data;
      state.isSignedIn = true;
    },
    setNewTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    clearTokens: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isSignedIn = false;
      state.data = null;
    },
  },
});

export const { setAuthTokens, clearTokens, setNewTokens } = authSlice.actions;

export default authSlice.reducer;
