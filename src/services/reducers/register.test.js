import { registerInitialState, registrationReducer } from './register';
import {
	USER_REGISTRATION_REQUEST,
	USER_REGISTRATION_SUCCESS,
	USER_REGISTRATION_FAILED,
} from '../actions/register';

describe('registrationReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(registrationReducer(undefined, {})).toEqual(registerInitialState);
	});

	it('Обработка USER_REGISTRATION_REQUEST', () => {
		const action = { type: USER_REGISTRATION_REQUEST };
		const state = registrationReducer(registerInitialState, action);
		expect(state).toEqual({
			...registerInitialState,
			registrationRequest: true,
			registrationRequestFailed: false,
			error: '',
		});
	});

	it('Обработка USER_REGISTRATION_SUCCESS', () => {
		const prevState = {
			...registerInitialState,
			registrationRequest: true,
		};
		const action = { type: USER_REGISTRATION_SUCCESS };
		const state = registrationReducer(prevState, action);
		expect(state).toEqual({
			...prevState,
			registrationRequest: false,
			registrationRequestFailed: false,
			error: '',
		});
	});

	it('Обработка USER_REGISTRATION_FAILED', () => {
		const error = 'Ошибка регистрации';
		const action = { type: USER_REGISTRATION_FAILED, error };
		const state = registrationReducer(registerInitialState, action);
		expect(state).toEqual({
			...registerInitialState,
			registrationRequest: false,
			registrationRequestFailed: true,
			error,
		});
	});
});
