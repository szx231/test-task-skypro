import axios, { AxiosError } from 'axios';

import { API_GET_USERS, DEFAULT_USERS_COUNT, TOKEN_GITHUB } from '../../../api/constant';
import { IProfile, IUsersResponse } from '../../types';

const userLogin = 'google';
const page = 0;

const UrlGetUsers = `${API_GET_USERS}${userLogin}&per_page=${DEFAULT_USERS_COUNT}&page=${page}`;
const config = { headers: { Authorization: `Bearer ${TOKEN_GITHUB}` } };

describe('fetchUsers', () => {
  it('should return 200 status code when given valid input', async () => {
    const usersResponse = await axios.get<IUsersResponse>(UrlGetUsers, config);

    expect(usersResponse.status).toBe(200);
  });

  it('should return includes all fields', async () => {
    const usersResponse = await axios.get<IUsersResponse>(UrlGetUsers, config);
    const users = usersResponse.data.items;

    const results = await Promise.all(
      users.map(async (user) => {
        const userProfile = await axios.get<IProfile>(user.url, config);
        return { ...user, ...userProfile.data };
      }),
    );

    results.forEach((item) => {
      expect(item).toHaveProperty('login');
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('avatar_url');
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('html_url');
      expect(item).toHaveProperty('repos_url');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('public_repos');
      expect(item).toHaveProperty('followers');
      expect(item).toHaveProperty('following');
    });
  });

  it('should return array from request', async () => {
    const usersResponse = await axios.get<IUsersResponse>(UrlGetUsers, config);
    const users = usersResponse.data.items;

    const results = await Promise.all(
      users.map(async (user) => {
        const userProfile = await axios.get<IProfile>(user.url, config);
        return { ...user, ...userProfile.data };
      }),
    );

    expect(Array.isArray(results)).toBeTruthy();
  });

  it('should return an error when an invalid token is passed', async () => {
    const TOKEN_GITHUB_INVALID = 'invalidate';
    const configInvalidate = {
      headers: {
        Authorization: `Bearer ${TOKEN_GITHUB_INVALID}`,
      },
    };

    try {
      await axios.get<IUsersResponse>(UrlGetUsers, configInvalidate);
    } catch (err) {
      expect((err as AxiosError).response?.status).toBe(401);
    }
  });
});
