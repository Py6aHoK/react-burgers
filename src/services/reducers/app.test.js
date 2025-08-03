import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
	INCREASE_COUNTER,
	DECREASE_COUNTER,
} from '../actions/app';
import { appInitialState, appReducer } from './app';

const testIngredients = [
	{ _id: '1', name: 'Булка', type: 'bun', __v: 0 },
	{ _id: '2', name: 'Соус', type: 'main', __v: 0 },
];

describe('appReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(appReducer(undefined, {})).toEqual(appInitialState);
	});

	it('Обработка GET_INGREDIENTS_REQUEST', () => {
		const action = { type: GET_INGREDIENTS_REQUEST };
		const state = appReducer(appInitialState, action);
		expect(state.ingredientsRequest).toBe(true);
	});

	it('Обработка GET_INGREDIENTS_SUCCESS', () => {
		const action = {
			type: GET_INGREDIENTS_SUCCESS,
			ingredients: testIngredients,
		};
		const state = appReducer(appInitialState, action);
		expect(state.ingredients).toEqual(testIngredients);
		expect(state.ingredientsRequest).toBe(false);
		expect(state.ingredientsRequestError).toBe(false);
	});

	it('Обработка GET_INGREDIENTS_ERROR', () => {
		const action = { type: GET_INGREDIENTS_ERROR };
		const state = appReducer(appInitialState, action);
		expect(state.ingredientsRequestError).toBe(true);
		expect(state.ingredientsRequest).toBe(false);
		expect(state.ingredients).toEqual([]);
	});

	it('Обработка INCREASE_COUNTER для булки', () => {
		const startState = { ...appInitialState, ingredients: testIngredients };
		const action = { type: INCREASE_COUNTER, itemId: '1' };
		const state = appReducer(startState, action);
		const updated = state.ingredients.find((i) => i._id === '1');
		expect(updated?.__v).toBe(2);
	});

	it('Обработка INCREASE_COUNTER не для булки', () => {
		const startState = { ...appInitialState, ingredients: testIngredients };
		const action = { type: INCREASE_COUNTER, itemId: '2' };
		const state = appReducer(startState, action);
		const updated = state.ingredients.find((i) => i._id === '2');
		expect(updated?.__v).toBe(1);
	});

	it('Обработка DECREASE_COUNTER для булки', () => {
		const ingredientsWithBun = [
			{ _id: '1', name: 'Булка', type: 'bun', __v: 2 },
		];
		const startState = { ...appInitialState, ingredients: ingredientsWithBun };
		const action = { type: DECREASE_COUNTER, itemId: '1' };
		const state = appReducer(startState, action);
		expect(state.ingredients[0].__v).toBe(0);
	});

	it('Обработка DECREASE_COUNTER не для булки', () => {
		const ingredientsWithMain = [
			{ _id: '2', name: 'Соус', type: 'main', __v: 1 },
		];
		const startState = { ...appInitialState, ingredients: ingredientsWithMain };
		const action = { type: DECREASE_COUNTER, itemId: '2' };
		const state = appReducer(startState, action);
		expect(state.ingredients[0].__v).toBe(0);
	});
});
