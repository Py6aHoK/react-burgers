import { tabsReducer, tabsInitialState } from './tabs';
import {
	SET_BUN_ACTIVE,
	SET_MAIN_ACTIVE,
	SET_SAUCE_ACTIVE,
} from '../actions/tabs';

describe('tabsReducer', () => {
	it('Проверка возврата исходного состояния', () => {
		expect(tabsReducer(undefined, {})).toEqual(tabsInitialState);
	});

	it('Обработка SET_BUN_ACTIVE', () => {
		const action = { type: SET_BUN_ACTIVE };
		const expectedState = {
			isBunsActive: true,
			isMainActive: false,
			isSauceActive: false,
		};
		expect(tabsReducer(tabsInitialState, action)).toEqual(expectedState);
	});

	it('Обработка SET_MAIN_ACTIVE', () => {
		const action = { type: SET_MAIN_ACTIVE };
		const expectedState = {
			isBunsActive: false,
			isMainActive: true,
			isSauceActive: false,
		};
		expect(tabsReducer(tabsInitialState, action)).toEqual(expectedState);
	});

	it('Обработка SET_SAUCE_ACTIVE', () => {
		const action = { type: SET_SAUCE_ACTIVE };
		const expectedState = {
			isBunsActive: false,
			isMainActive: false,
			isSauceActive: true,
		};
		expect(tabsReducer(tabsInitialState, action)).toEqual(expectedState);
	});
});
