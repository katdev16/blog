import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } from '../slices/authSlice';

function fakeLoginApi({ username }: { username: string }) {
	return new Promise<{ token: string; user: { id: string; name: string } }>((resolve, reject) => {
		setTimeout(() => {
			if (!username) return reject(new Error('Missing username'));
			resolve({ token: 'demo-token-' + Date.now(), user: { id: 'u1', name: username } });
		}, 400);
	});
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
	try {
		const { username } = action.payload as { username: string; password: string };
		const res: { token: string; user: { id: string; name: string } } = yield call(fakeLoginApi, { username });
		// persist token
		yield call([localStorage, 'setItem'], 'auth_token', res.token);
		yield put(loginSuccess({ user: res.user, token: res.token }));
	} catch (err: any) {
		yield put(loginFailure(err?.message ?? 'Login failed'));
	}
}

function* handleLogout() {
	try {
		yield call([localStorage, 'removeItem'], 'auth_token');
		yield put(logoutSuccess());
	} catch (err) {
		// still succeed
		yield put(logoutSuccess());
	}
}

export default function* authSaga() {
	yield takeLatest(loginRequest.type, handleLogin);
	yield takeLatest(logoutRequest.type, handleLogout);
}
