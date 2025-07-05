import {
	SET_BUN_ACTIVE,
	SET_MAIN_ACTIVE,
	SET_SAUCE_ACTIVE,
} from '../actions/tabs';

const initialState: TTabsReducerState = {
	isBunsActive: false,
	isMainActive: false,
	isSauceActive: false,
};

type TTabsReducerState = {
	isBunsActive: boolean;
	isMainActive: boolean;
	isSauceActive: boolean;
};

type TTabsReducerAction = {
	type: string;
};

export const tabsReducer = (
	state = initialState,
	action: TTabsReducerAction
): TTabsReducerState => {
	switch (action.type) {
		case SET_BUN_ACTIVE: {
			return {
				...initialState,
				isBunsActive: true,
			};
		}
		case SET_MAIN_ACTIVE: {
			return {
				...initialState,
				isMainActive: true,
			};
		}
		case SET_SAUCE_ACTIVE: {
			return {
				...initialState,
				isSauceActive: true,
			};
		}
		default: {
			return state;
		}
	}
};
