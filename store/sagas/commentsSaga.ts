import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure, addCommentRequest, addCommentSuccess, addCommentFailure } from '../slices/commentsSlice';

function mockFetchComments(postId: string) {
	return new Promise<any[]>((resolve) => {
		setTimeout(() => {
			const key = `comments_${postId}`;
			const raw = localStorage.getItem(key);
			const comments = raw ? JSON.parse(raw) : [
				{ id: 'c1', postId, author: 'Alice', text: 'Nice post!' },
			];
			resolve(comments);
		}, 200);
	});
}

function mockAddComment(postId: string, comment: Omit<any, 'id'>) {
	return new Promise<any>((resolve) => {
		setTimeout(() => {
			const key = `comments_${postId}`;
			const raw = localStorage.getItem(key);
			const comments = raw ? JSON.parse(raw) : [];
			const newComment = { id: `c_${Date.now()}`, postId, ...comment };
			comments.push(newComment);
			localStorage.setItem(key, JSON.stringify(comments));
			resolve(newComment);
		}, 200);
	});
}

function* handleFetchComments(action: ReturnType<typeof fetchCommentsRequest>) {
	try {
		const { postId } = action.payload as { postId: string };
		const comments: any[] = yield call(mockFetchComments, postId);
		yield put(fetchCommentsSuccess({ postId, comments }));
	} catch (err: any) {
		yield put(fetchCommentsFailure(err?.message ?? 'Error fetching comments'));
	}
}

function* handleAddComment(action: ReturnType<typeof addCommentRequest>) {
	try {
		const { postId, comment } = action.payload as { postId: string; comment: any };
		const newComment: any = yield call(mockAddComment, postId, comment);
		yield put(addCommentSuccess({ postId, comment: newComment }));
	} catch (err: any) {
		yield put(addCommentFailure(err?.message ?? 'Error adding comment'));
	}
}

export default function* commentsSaga() {
	yield takeLatest(fetchCommentsRequest.type, handleFetchComments);
	yield takeLatest(addCommentRequest.type, handleAddComment);
}
