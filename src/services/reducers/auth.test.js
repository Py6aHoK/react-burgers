import {
	LOGIN_REQUEST,
	LOGIN,
	LOGOUT,
	UPDATE_USER_SUCCESS,
	LOGIN_ERROR,
	UPDATE_USER_ERROR,
	LOGOUT_ERROR,
} from '../actions/auth';
import { authInitialState, authReducer } from './auth';

const testUser = {
	email: 'vasya@pupkin.ru',
	name: 'Vasya Pupkin',
};

describe('authReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(authReducer(undefined, {})).toEqual(authInitialState);
	});

	it('Обработка LOGIN_REQUEST', () => {
		const action = { type: LOGIN_REQUEST };
		const state = authReducer(authInitialState, action);
		expect(state.error).toBe('');
	});

	it('Обработка LOGIN_ERROR', () => {
		const error = 'Ошибка входа';
		const action = { type: LOGIN_ERROR, error };
		const state = authReducer(authInitialState, action);
		expect(state.isAuthorized).toBe(false);
		expect(state.isLoginChecked).toBe(true);
		expect(state.email).toBe('');
		expect(state.name).toBe('');
		expect(state.error).toBe(error);
	});

	it('Обработка LOGIN', () => {
		const action = { type: LOGIN, user: testUser };
		const state = authReducer(authInitialState, action);
		expect(state.isAuthorized).toBe(true);
		expect(state.isLoginChecked).toBe(true);
		expect(state.email).toBe(testUser.email);
		expect(state.name).toBe(testUser.name);
		expect(state.error).toBe('');
	});

	it('Обработка UPDATE_USER_SUCCESS', () => {
		const loggedInState = {
			...authInitialState,
			isAuthorized: true,
			isLoginChecked: true,
			email: 'pupkin@vasya.ru',
			name: 'Pupkin Vasya',
		};
		const action = { type: UPDATE_USER_SUCCESS, user: testUser };
		const state = authReducer(loggedInState, action);
		expect(state.email).toBe(testUser.email);
		expect(state.name).toBe(testUser.name);
	});

	it('Обработка LOGOUT', () => {
		const loggedInState = {
			...authInitialState,
			isAuthorized: true,
			email: testUser.email,
			name: testUser.name,
		};
		const action = { type: LOGOUT };
		const state = authReducer(loggedInState, action);
		expect(state).toEqual(authInitialState);
	});

	it('Обработка UPDATE_USER_ERROR', () => {
		const error = 'Не удалось обновить данные';
		const action = { type: UPDATE_USER_ERROR, error };
		const state = authReducer(authInitialState, action);
		expect(state.error).toBe(error);
	});

	it('Обработка LOGOUT_ERROR', () => {
		const error = 'Ошибка выхода';
		const action = { type: LOGOUT_ERROR, error };
		const state = authReducer(authInitialState, action);
		expect(state.error).toBe(error);
	});
});
