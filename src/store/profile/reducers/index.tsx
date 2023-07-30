import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMergeProfileRepositories } from '../../types';
import { fetchProfile } from '../thunk';

interface IProfileInitialState {
  status: null | 'loading' | 'success' | 'error';
  profile: IMergeProfileRepositories | null;
}

const initialState: IProfileInitialState = {
  profile: null,
  status: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IMergeProfileRepositories>) => {
      state.profile = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchProfile.rejected, (state) => {
      state.status = 'error';
      state.profile = null;
    });
  },
});

export default profileSlice.reducer;
