import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/postsSlice';
import { ok } from 'assert';

function* fetchPosts(action: ReturnType<typeof fetchPostsRequest>): Generator<any, void, any> {
	try {
		const { page, pageSize } = (action.payload ?? {}) as { page?: number; pageSize?: number };
		const res: Response = yield call(fetch, '/api/posts');
		if (!res.ok) throw new Error('Failed to fetch posts');
		const data: any[] = yield call([res, 'json']);
		// perform pagination client-side if requested
		if (page && pageSize) {
			const start = (page - 1) * pageSize;
			const items = data.slice(start, start + pageSize);
			yield put(fetchPostsSuccess({ items, total: data.length }));
		} else {
			yield put(fetchPostsSuccess({ items: data, total: data.length }));
		}
	} catch (err: any) {
		yield put(fetchPostsFailure(err?.message ?? 'Error fetching posts'));
	}
}

function* fetchPost(action: ReturnType<typeof fetchPostRequest>): Generator<any, void, any> {
	try {
		const { id } = action.payload as { id: string };
		const res: Response = yield call(fetch, `/api/posts/${id}`);
		if (!res.ok) throw new Error('Post not found');
		const post = yield call([res, 'json']);
		yield put(fetchPostSuccess(post));
	} catch (err: any) {
		yield put(fetchPostFailure(err?.message ?? 'Error fetching post'));
	}
}

function* createPost(action: ReturnType<typeof createPostRequest>): Generator<any, void, any> {
	try {
		const body = action.payload as Partial<any>;
		const res: Response = yield call(fetch, '/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
		if (!res.ok) throw new Error('Failed to create post');
		const post = yield call([res, 'json']);
		yield put(createPostSuccess(post));
	} catch (err: any) {
		yield put(createPostFailure(err?.message ?? 'Error creating post'));
	}
}

function* updatePost(action: ReturnType<typeof updatePostRequest>): Generator<any, void, any> {
	try {
		const { id, data } = action.payload as { id: string; data: any };
		const res: Response = yield call(fetch, `/api/posts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
		if (!res.ok) throw new Error('Failed to update post');
		const post = yield call([res, 'json']);
		yield put(updatePostSuccess(post));
	} catch (err: any) {
		yield put(updatePostFailure(err?.message ?? 'Error updating post'));
	}
}

function* deletePost(action: ReturnType<typeof deletePostRequest>): Generator<any, void, any> {
	try {
		const { id } = action.payload as { id: string };
		// Debug log so we can see saga activity in the browser console
		// eslint-disable-next-line no-console
		console.log('postsSaga: deleting post id', id);
		const res: Response = yield call(fetch, `/api/posts/${id}`, { method: 'DELETE' });
		if (!res.ok) throw new Error('Failed to delete post');
		if(res.ok) {
			console.log('res ok: delete response ok for id', id);
		} else {
			console.log('res ok: delete response NOT ok for id', id, 'status:', res.status);
		}
		yield put(deletePostSuccess({ id }));
	} catch (err: any) {
		yield put(deletePostFailure(err?.message ?? 'Error deleting post'));
	}
}

export default function* postsSaga(): Generator<any, void, any> {
	yield takeLatest(fetchPostsRequest.type, fetchPosts);
	yield takeLatest(fetchPostRequest.type, fetchPost);
	yield takeLatest(createPostRequest.type, createPost);
	yield takeLatest(updatePostRequest.type, updatePost);
	yield takeLatest(deletePostRequest.type, deletePost);
}
