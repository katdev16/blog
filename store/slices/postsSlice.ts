import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
	id: string;
	title: string;
	shortDescription?: string;
	longDescription?: string;
	imageSrc?: string;
}

interface PostsState {
	items: Post[];
	current: Post | null;
	loading: boolean;
	error: string | null;
	total: number;
}

const initialState: PostsState = {
	items: [],
	current: null,
	loading: false,
	error: null,
	total: 0,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		fetchPostsRequest(state: PostsState, _action: PayloadAction<{ page?: number; pageSize?: number } | undefined>) {
			state.loading = true;
			state.error = null;
		},
		fetchPostsSuccess(state: PostsState, action: PayloadAction<{ items: Post[]; total?: number }>) {
			state.loading = false;
			state.items = action.payload.items;
			state.total = action.payload.total ?? action.payload.items.length;
			state.error = null;
		},
		fetchPostsFailure(state: PostsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		fetchPostRequest(state: PostsState, _action: PayloadAction<{ id: string }>) {
			state.loading = true;
			state.error = null;
		},
		fetchPostSuccess(state: PostsState, action: PayloadAction<Post>) {
			state.loading = false;
			state.current = action.payload;
			state.error = null;
		},
		fetchPostFailure(state: PostsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		createPostRequest(state: PostsState, _action: PayloadAction<Partial<Post>>) {
			state.loading = true;
			state.error = null;
		},
		createPostSuccess(state: PostsState, action: PayloadAction<Post>) {
			state.loading = false;
			state.items.unshift(action.payload);
		},
		createPostFailure(state: PostsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		updatePostRequest(state: PostsState, _action: PayloadAction<{ id: string; data: Partial<Post> }>) {
			state.loading = true;
			state.error = null;
		},
		updatePostSuccess(state: PostsState, action: PayloadAction<Post>) {
			state.loading = false;
			state.items = state.items.map((p: Post) => (p.id === action.payload.id ? action.payload : p));
			if (state.current?.id === action.payload.id) state.current = action.payload;
		},
		updatePostFailure(state: PostsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		deletePostRequest(state: PostsState, _action: PayloadAction<{ id: string }>) {
			state.loading = true;
			state.error = null;
		},
		deletePostSuccess(state: PostsState, action: PayloadAction<{ id: string }>) {
			state.loading = false;
			state.items = state.items.filter((p: Post) => p.id !== action.payload.id);
			if (state.current?.id === action.payload.id) state.current = null;
		},
		deletePostFailure(state: PostsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchPostsRequest,
	fetchPostsSuccess,
	fetchPostsFailure,
	fetchPostRequest,
	fetchPostSuccess,
	fetchPostFailure,
	createPostRequest,
	createPostSuccess,
	createPostFailure,
	updatePostRequest,
	updatePostSuccess,
	updatePostFailure,
	deletePostRequest,
	deletePostSuccess,
	deletePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
