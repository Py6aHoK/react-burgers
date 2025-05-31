import {
	SET_BUN_ACTIVE,
	SET_MAIN_ACTIVE,
	SET_SAUCE_ACTIVE,
} from '../actions/tabs';

const initialState = {
	isBunsActive: false,
	isMainActive: false,
	isSauceActive: false,
};

type TTabsReducerAction = {
	type: string;
};

export const tabsReducer = (
	state = initialState,
	action: TTabsReducerAction
) => {
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
