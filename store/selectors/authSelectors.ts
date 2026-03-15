import { RootState } from '../index';

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
