import {
	ADD_BUN,
	ADD_INGREDIENT,
	DELETE_INGREDIENT,
	SWAP_ITEMS,
	RESET,
} from '../actions/composer';
import { composerInitialState, composerReducer } from './composer';

const testBun = {
	_id: 'bun1',
	name: 'Теестовая булка',
	type: 'bun',
	__v: 0,
};

const testIngredient1 = {
	_id: 'ing1',
	name: 'Тестовый соус',
	type: 'sauce',
	__v: 0,
};

const testIngredient2 = {
	_id: 'ing2',
	name: 'Тестовая сосиска',
	type: 'main',
	__v: 0,
};

describe('composerReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(composerReducer(undefined, {})).toEqual(composerInitialState);
	});

	it('Обработка ADD_BUN', () => {
		const action = {
			type: ADD_BUN,
			ingredient: testBun,
		};
		const state = composerReducer(composerInitialState, action);
		expect(state.bun).toEqual(testBun);
	});

	it('Обработка ADD_INGREDIENT', () => {
		const action = {
			type: ADD_INGREDIENT,
			ingredient: testIngredient1,
		};
		const state = composerReducer(composerInitialState, action);
		expect(state.fillingIngredients).toEqual([testIngredient1]);
	});

	it('Обработка DELETE_INGREDIENT', () => {
		const startState = {
			...composerInitialState,
			fillingIngredients: [testIngredient1, testIngredient2],
		};
		const action = {
			type: DELETE_INGREDIENT,
			index: 0,
		};
		const state = composerReducer(startState, action);
		expect(state.fillingIngredients).toEqual([testIngredient2]);
	});

	it('Обработка SWAP_ITEMS', () => {
		const newArr = [testIngredient2, testIngredient1];
		const action = {
			type: SWAP_ITEMS,
			newarr: newArr,
		};
		const state = composerReducer(
			{
				...composerInitialState,
				fillingIngredients: [testIngredient1, testIngredient2],
			},
			action
		);
		expect(state.fillingIngredients).toEqual(newArr);
	});

	it('Обработка RESET', () => {
		const startState = {
			fillingIngredients: [testIngredient1],
			bun: testBun,
			price: 999,
		};
		const action = { type: RESET };
		const state = composerReducer(startState, action);
		expect(state).toEqual(composerInitialState);
	});
});
