import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profile/reducers';
import searchSlice from './search/reducers';
import usersSlice from './users/reducers';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    users: usersSlice,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
