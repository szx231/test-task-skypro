import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_GET_USERS, DEFAULT_USERS_COUNT, TOKEN_GITHUB } from '../../../api/constant';
import { IProfile, IUsersResponse } from '../../types';
import { ACTION_FETCH_USERS } from '../actions';

export const fetchUsers = createAsyncThunk(
  ACTION_FETCH_USERS,
  async ({ userLogin, page }: { userLogin: string; page: number }, { rejectWithValue }) => {
    try {
      const UrlGetUsers = `${API_GET_USERS}${userLogin}&per_page=${DEFAULT_USERS_COUNT}&page=${page}`;

      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN_GITHUB}`,
        },
      };

      const usersResponse = await axios.get<IUsersResponse>(UrlGetUsers, config);
      const users = usersResponse.data.items;
      const { total_count } = usersResponse.data;

      const promises = users.map(async (user) => {
        const userProfile = await axios.get<IProfile>(user.url, config);

        return { ...user, ...userProfile.data };
      });

      const allInfoUsers = await Promise.all(promises);

      return { users: allInfoUsers, total_count };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
      throw new Error('An error occurred while fetching the users.');
    }
  },
);
