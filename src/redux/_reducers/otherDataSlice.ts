import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  readableVersion: string;
}

const initialState: AuthState = {
  readableVersion: '',
};

const otherData = createSlice({
  name: 'otherData',
  initialState,
  reducers: {
    setReadableVersion: (
      state,
      action: PayloadAction<{
        readableVersion: string;
      }>,
    ) => {
      state.readableVersion = action.payload.readableVersion;
    },
  },
});

export const {
  setReadableVersion,
} = otherData.actions;

export default otherData.reducer;
