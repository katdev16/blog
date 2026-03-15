import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = { id: string; name?: string } | null;

interface AuthState {
	user: User;
	token: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest(state: AuthState, _action: PayloadAction<{ username: string; password: string }>) {
			state.loading = true;
			state.error = null;
		},
		loginSuccess(state: AuthState, action: PayloadAction<{ user: User; token: string }>) {
			state.loading = false;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.error = null;
		},
		loginFailure(state: AuthState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		logoutRequest(state: AuthState) {
			state.loading = true;
		},
		logoutSuccess(state: AuthState) {
			state.loading = false;
			state.user = null;
			state.token = null;
			state.error = null;
		},
		setToken(state: AuthState, action: PayloadAction<string | null>) {
			state.token = action.payload;
		},
	},
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess, setToken } = authSlice.actions;
export default authSlice.reducer;
