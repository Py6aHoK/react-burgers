import {
	SEND_ORDER_REQUEST,
	SEND_ORDER_SUCCESS,
	SEND_ORDER_ERROR,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILED,
} from '../actions/order';
import { orderInitialState, orderReducer } from './order';

const mockOrder = {
	number: 1234,
};

const mockOrderInfo = {
	_id: 'order123',
	name: 'Test Order',
	ingredients: ['123', '456'],
	status: 'done',
	number: 1234,
	createdAt: '2025-08-01T10:00:00.000Z',
	updatedAt: '2025-08-01T10:05:00.000Z',
};

describe('orderReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(orderReducer(undefined, {})).toEqual(orderInitialState);
	});

	it('Обработка SEND_ORDER_REQUEST', () => {
		const action = { type: SEND_ORDER_REQUEST };
		const state = orderReducer(orderInitialState, action);
		expect(state.orderRequest).toBe(true);
	});

	it('Обработка SEND_ORDER_SUCCESS', () => {
		const action = { type: SEND_ORDER_SUCCESS, order: mockOrder };
		const state = orderReducer(
			{ ...orderInitialState, orderRequest: true },
			action
		);
		expect(state.order).toEqual(mockOrder);
		expect(state.orderRequest).toBe(false);
		expect(state.orderRequestError).toBe(false);
	});

	it('Обработка SEND_ORDER_ERROR', () => {
		const action = { type: SEND_ORDER_ERROR };
		const state = orderReducer(orderInitialState, action);
		expect(state.orderRequestError).toBe(true);
		expect(state.order).toBeUndefined();
	});

	it('Обработка OPEN_ORDER_MODAL', () => {
		const action = { type: OPEN_ORDER_MODAL };
		const state = orderReducer(orderInitialState, action);
		expect(state.isModalOpen).toBe(true);
	});

	it('Обработка CLOSE_ORDER_MODAL', () => {
		const action = { type: CLOSE_ORDER_MODAL };
		const state = orderReducer(
			{ ...orderInitialState, isModalOpen: true },
			action
		);
		expect(state.isModalOpen).toBe(false);
	});

	it('Обработка GET_ORDER_REQUEST', () => {
		const action = { type: GET_ORDER_REQUEST };
		const state = orderReducer(orderInitialState, action);
		expect(state.getOrderRequest).toBe(true);
		expect(state.getOrderRequestError).toBe(false);
		expect(state.orderInfo).toBeUndefined();
	});

	it('Обработка GET_ORDER_SUCCESS', () => {
		const action = { type: GET_ORDER_SUCCESS, order: mockOrderInfo };
		const state = orderReducer(
			{ ...orderInitialState, getOrderRequest: true },
			action
		);
		expect(state.getOrderRequest).toBe(false);
		expect(state.getOrderRequestError).toBe(false);
		expect(state.orderInfo).toEqual(mockOrderInfo);
	});

	it('Обработка GET_ORDER_FAILED', () => {
		const action = { type: GET_ORDER_FAILED };
		const state = orderReducer(orderInitialState, action);
		expect(state.getOrderRequestError).toBe(true);
		expect(state.orderInfo).toBeUndefined();
	});
});
