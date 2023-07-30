import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_GET_PROFILE, DEFAULT_REPOS_COUNT_PROFILE, TOKEN_GITHUB } from '../../../api/constant';
import { IProfile, IUserRepositories } from '../../types';
import { ACTION_FETCH_PROFILE } from '../actions';

export const fetchProfile = createAsyncThunk(
  ACTION_FETCH_PROFILE,
  async ({ userLogin, page }: { userLogin: string; page: number }, { rejectWithValue }) => {
    try {
      const urlUserRepositories = `${API_GET_PROFILE}/${userLogin}/repos?page=${page}&per_page=${DEFAULT_REPOS_COUNT_PROFILE}`;
      const urlUserProfile = `${API_GET_PROFILE}/${userLogin}`;

      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN_GITHUB}`,
        },
      };

      const fetchRepos = axios.get<IUserRepositories[]>(urlUserRepositories, config);
      const fetchUser = axios.get<IProfile>(urlUserProfile, config);

      const [reposData, userData] = await Promise.all([fetchRepos, fetchUser]);

      const mergedData = { repos: reposData.data, userProfile: userData.data };

      return mergedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
      throw new Error('An error occurred while fetching user profile.');
    }
  },
);
