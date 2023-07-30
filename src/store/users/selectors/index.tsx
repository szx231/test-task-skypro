import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

export const selectUsers = (state: RootState) => state.users;

export const sortToDownSelector = createSelector(
  (state: RootState) => state.users.users,
  (users) => users.slice().sort((a, b) => b.public_repos - a.public_repos),
);

export const sortToBiggerSelector = createSelector(
  (state: RootState) => state.users.users,
  (users) => users.slice().sort((a, b) => a.public_repos - b.public_repos),
);
