import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMergeUsersData, IProfile } from '../../types';
import { fetchUsers } from '../thunk';

interface IInitialState {
  users: IProfile[];
  total_count: number;
  status: null | 'loading' | 'success' | 'error';
}

const initialState: IInitialState = {
  users: [],
  status: null,
  total_count: 0,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    sortToDown: (state) => {
      state.users.sort((a, b) => b.public_repos - a.public_repos);
    },
    sortToBigger: (state) => {
      state.users.sort((a, b) => a.public_repos - b.public_repos);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IMergeUsersData>) => {
      state.users = action.payload.users;
      state.status = 'success';
      state.total_count = action.payload.total_count;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'error';
      state.users = [];
    });
  },
});

export const { sortToDown, sortToBigger } = usersSlice.actions;

export default usersSlice.reducer;
