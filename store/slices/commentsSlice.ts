import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
	id: string;
	postId: string;
	author: string;
	text: string;
}

interface CommentsState {
	byPost: Record<string, Comment[]>;
	loading: boolean;
	error: string | null;
}

const initialState: CommentsState = {
	byPost: {},
	loading: false,
	error: null,
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		fetchCommentsRequest(state: CommentsState, _action: PayloadAction<{ postId: string }>) {
			state.loading = true;
			state.error = null;
		},
		fetchCommentsSuccess(state: CommentsState, action: PayloadAction<{ postId: string; comments: Comment[] }>) {
			state.loading = false;
			state.byPost[action.payload.postId] = action.payload.comments;
		},
		fetchCommentsFailure(state: CommentsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		addCommentRequest(state: CommentsState, _action: PayloadAction<{ postId: string; comment: Omit<Comment, 'id'> }>) {
			state.loading = true;
			state.error = null;
		},
		addCommentSuccess(state: CommentsState, action: PayloadAction<{ postId: string; comment: Comment }>) {
			state.loading = false;
			const arr = state.byPost[action.payload.postId] ?? [];
			arr.push(action.payload.comment);
			state.byPost[action.payload.postId] = arr;
		},
		addCommentFailure(state: CommentsState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure, addCommentRequest, addCommentSuccess, addCommentFailure } = commentsSlice.actions;
export default commentsSlice.reducer;
