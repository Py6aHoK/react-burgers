import { socketReducer, socketInitialState } from '../reducers/socket';
import {
	SOCKET_CONNECTION_START,
	SOCKET_CONNECTION_SUCCESS,
	SOCKET_CONNECTION_ERROR,
	SOCKET_CONNECTION_CLOSED,
	SOCKET_CONNECTION_CLOSE,
	SOCKET_GET_MESSAGE,
} from '../actions/socket';

describe('socketReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(socketReducer(undefined, {})).toEqual(socketInitialState);
	});

	it('Обработка SOCKET_CONNECTION_START', () => {
		const action = { type: SOCKET_CONNECTION_START };
		const expectedState = {
			...socketInitialState,
			connected: false,
		};
		expect(socketReducer(socketInitialState, action)).toEqual(expectedState);
	});

	it('Обработка SOCKET_CONNECTION_SUCCESS', () => {
		const action = { type: SOCKET_CONNECTION_SUCCESS };
		const expectedState = {
			...socketInitialState,
			connected: true,
			error: undefined,
		};
		expect(socketReducer(socketInitialState, action)).toEqual(expectedState);
	});

	it('Обработка SOCKET_CONNECTION_ERROR', () => {
		const fakeError = new Event('ошибка');
		const action = { type: SOCKET_CONNECTION_ERROR, payload: fakeError };
		const expectedState = {
			...socketInitialState,
			connected: false,
			error: fakeError,
		};
		expect(socketReducer(socketInitialState, action)).toEqual(expectedState);
	});

	it('Обработка SOCKET_CONNECTION_CLOSED', () => {
		const action = { type: SOCKET_CONNECTION_CLOSED };
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
		expect(socketReducer(prevState, action)).toEqual(expectedState);
	});

	it('Обработка SOCKET_CONNECTION_CLOSE', () => {
		const action = { type: SOCKET_CONNECTION_CLOSE };
		expect(socketReducer(socketInitialState, action)).toEqual(
			socketInitialState
		);
	});

	it('Обработка SOCKET_GET_MESSAGE', () => {
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
		const action = { type: SOCKET_GET_MESSAGE, payload };
		const expectedState = {
			...socketInitialState,
			orders: payload.orders,
			total: payload.total,
			totalToday: payload.totalToday,
			error: undefined,
		};
		expect(socketReducer(socketInitialState, action)).toEqual(expectedState);
	});
});
