import { socketInitialState } from './socket';
import {
	SOCKET_PERSONAL_CONNECTION_START,
	SOCKET_PERSONAL_CONNECTION_SUCCESS,
	SOCKET_PERSONAL_CONNECTION_ERROR,
	SOCKET_PERSONAL_CONNECTION_CLOSED,
	SOCKET_PERSONAL_CONNECTION_CLOSE,
	SOCKET_PERSONAL_GET_MESSAGE,
} from '../actions/socketPersonal';
import { socketPersonalReducer } from './socketPersonal';

describe('socketPersonalReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(socketPersonalReducer(undefined, {})).toEqual(socketInitialState);
	});

	it('Обработка SOCKET_PERSONAL_CONNECTION_START', () => {
		const action = { type: SOCKET_PERSONAL_CONNECTION_START };
		const expectedState = {
			...socketInitialState,
			connected: false,
		};
		expect(socketPersonalReducer(socketInitialState, action)).toEqual(
			expectedState
		);
	});

	it('Обработка SOCKET_PERSONAL_CONNECTION_SUCCESS', () => {
		const action = { type: SOCKET_PERSONAL_CONNECTION_SUCCESS };
		const expectedState = {
			...socketInitialState,
			connected: true,
			error: undefined,
		};
		expect(socketPersonalReducer(socketInitialState, action)).toEqual(
			expectedState
		);
	});

	it('Обработка SOCKET_PERSONAL_CONNECTION_ERROR', () => {
		const fakeError = new Event('ошибка');
		const action = {
			type: SOCKET_PERSONAL_CONNECTION_ERROR,
			payload: fakeError,
		};
		const expectedState = {
			...socketInitialState,
			connected: false,
			error: fakeError,
		};
		expect(socketPersonalReducer(socketInitialState, action)).toEqual(
			expectedState
		);
	});

	it('Обработка SOCKET_PERSONAL_CONNECTION_CLOSED', () => {
		const action = { type: SOCKET_PERSONAL_CONNECTION_CLOSED };
		const prevState = {
			...socketInitialState,
			connected: true,
			error: new Event('ошибка'),
		};
		const expectedState = {
			...prevState,
			connected: false,
			error: undefined,
		};
		expect(socketPersonalReducer(prevState, action)).toEqual(expectedState);
	});

	it('Обработка SOCKET_PERSONAL_CONNECTION_CLOSE', () => {
		const action = { type: SOCKET_PERSONAL_CONNECTION_CLOSE };
		expect(socketPersonalReducer(socketInitialState, action)).toEqual(
			socketInitialState
		);
	});

	it('Обработка SOCKET_PERSONAL_GET_MESSAGE', () => {
		const payload = {
			orders: [
				{
					_id: '1',
					name: 'Тестовый заказ',
					status: 'done',
					ingredients: [],
					number: 1,
					createdAt: '',
					updatedAt: '',
				},
			],
			total: 100,
			totalToday: 10,
		};
		const action = { type: SOCKET_PERSONAL_GET_MESSAGE, payload };
		const expectedState = {
			...socketInitialState,
			orders: payload.orders,
			error: undefined,
		};
		expect(socketPersonalReducer(socketInitialState, action)).toEqual(
			expectedState
		);
	});
});
