import { RootState } from '../index';

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectCurrentPost = (state: RootState) => state.posts.current;
export const selectPostsTotal = (state: RootState) => state.posts.total;
