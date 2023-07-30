export interface IUserRepositories {
  name: string;
  html_url: string;
  description: string;
}

export interface IUserOnArrayUsers {
  avatar_url: string;
  html_url: string;
  id: number;
  login: string;
  url: string;
}

export interface IProfile {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  repos_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface IMergeProfileRepositories {
  repos: IUserRepositories[];
  userProfile: IProfile;
}

export interface IMergeUsersData {
  users: IProfile[];
  total_count: number;
}

export interface IUserRepositoriesReponse {
  data: IUserRepositories;
  status: number;
  statusText: string;
}

export interface IUsersResponse {
  items: IUserOnArrayUsers[];
  total_count: number;
}
