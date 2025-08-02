import {
	OPEN_INGREDIENTS_INFO,
	CLOSE_INGREDIENTS_INFO,
} from '../actions/ingredientInfo';
import {
	ingredientInfoInitialState,
	ingredientInfoReducer,
} from './ingredientInfo';

const testIngredient = {
	_id: 'ing1',
	name: 'Test Sauce',
	type: 'sauce',
	__v: 0,
};

describe('ingredientInfoReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(ingredientInfoReducer(undefined, {})).toEqual(
			ingredientInfoInitialState
		);
	});

	it('Обработка OPEN_INGREDIENTS_INFO', () => {
		const action = {
			type: OPEN_INGREDIENTS_INFO,
			item: testIngredient,
		};
		const state = ingredientInfoReducer(ingredientInfoInitialState, action);
		expect(state.selectedIngredient).toEqual(testIngredient);
	});

	it('Обработка CLOSE_INGREDIENTS_INFO', () => {
		const startState = {
			selectedIngredient: testIngredient,
		};
		const action = {
			type: CLOSE_INGREDIENTS_INFO,
		};
		const state = ingredientInfoReducer(startState, action);
		expect(state.selectedIngredient).toBeNull();
	});
});
