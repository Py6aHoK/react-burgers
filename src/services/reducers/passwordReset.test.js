import {
	RESET_PASSWORD_INIT_REQUEST,
	RESET_PASSWORD_INIT_SUCCESS,
	RESET_PASSWORD_INIT_ERROR,
	RESET_PASSWORD_CHECK_REQUEST,
	RESET_PASSWORD_CHECK_SUCCESS,
	RESET_PASSWORD_CHECK_ERROR,
} from '../actions/passwordReset';
import {
	passwordResetInitialState,
	passwordResetReducer,
} from './passwordReset';

describe('passwordResetReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(passwordResetReducer(undefined, {})).toEqual(
			passwordResetInitialState
		);
	});

	it('Обработка RESET_PASSWORD_INIT_REQUEST', () => {
		const action = { type: RESET_PASSWORD_INIT_REQUEST };
		const state = passwordResetReducer(passwordResetInitialState, action);
		expect(state).toEqual({
			...passwordResetInitialState,
			isInitRequest: true,
			isInitRequested: false,
			initError: '',
		});
	});

	it('Обработка RESET_PASSWORD_INIT_SUCCESS', () => {
		const prevState = { ...passwordResetInitialState, isInitRequest: true };
		const action = { type: RESET_PASSWORD_INIT_SUCCESS };
		const state = passwordResetReducer(prevState, action);
		expect(state).toEqual({
			...prevState,
			isInitRequest: false,
			isInitRequested: true,
			initError: '',
		});
	});

	it('Обработка RESET_PASSWORD_INIT_ERROR', () => {
		const error = 'ошибка инициализации';
		const action = { type: RESET_PASSWORD_INIT_ERROR, error };
		const state = passwordResetReducer(passwordResetInitialState, action);
		expect(state).toEqual({
			...passwordResetInitialState,
			isInitRequest: false,
			isInitRequested: false,
			initError: error,
		});
	});

	it('Обработка RESET_PASSWORD_CHECK_REQUEST', () => {
		const action = { type: RESET_PASSWORD_CHECK_REQUEST };
		const state = passwordResetReducer(passwordResetInitialState, action);
		expect(state).toEqual({
			...passwordResetInitialState,
			isCheckRequest: true,
			checkError: '',
		});
	});

	it('Обработка RESET_PASSWORD_CHECK_SUCCESS', () => {
		const prevState = { ...passwordResetInitialState, isCheckRequest: true };
		const action = { type: RESET_PASSWORD_CHECK_SUCCESS };
		const state = passwordResetReducer(prevState, action);
		expect(state).toEqual({
			...prevState,
			isCheckRequest: true,
			checkError: '',
		});
	});

	it('Обработка RESET_PASSWORD_CHECK_ERROR', () => {
		const error = 'ошибка проверки данных';
		const action = { type: RESET_PASSWORD_CHECK_ERROR, error };
		const state = passwordResetReducer(passwordResetInitialState, action);
		expect(state).toEqual({
			...passwordResetInitialState,
			isCheckRequest: true,
			checkError: error,
		});
	});
});
