import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
	theme: 'light' | 'dark';
	modalOpen: boolean;
	notification: { message: string; type?: 'info' | 'error' | 'success' } | null;
}

const initialState: UIState = {
	theme: 'light',
	modalOpen: false,
	notification: null,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<'light' | 'dark'>) {
			state.theme = action.payload;
		},
		openModal(state) {
			state.modalOpen = true;
		},
		closeModal(state) {
			state.modalOpen = false;
		},
		showNotification(state, action: PayloadAction<{ message: string; type?: 'info' | 'error' | 'success' }>) {
			state.notification = action.payload;
		},
		clearNotification(state) {
			state.notification = null;
		},
	},
});

export const { setTheme, openModal, closeModal, showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
