import { TIngredient } from '@/utils/types';
import {
	ADD_BUN,
	ADD_INGREDIENT,
	DELETE_INGREDIENT,
	SWAP_ITEMS,
	RESET,
} from '../actions/composer';

const initialState = {
	fillingIngredients: [],
	bun: null,
	price: 0,
};

type TComposerReducerAction = {
	type: string;
	ingredient: TIngredient;
	index: number;
	newarr: TIngredient[];
};

export const composerReducer = (
	state = initialState,
	action: TComposerReducerAction
) => {
	switch (action.type) {
		case ADD_BUN: {
			return {
				...state,
				bun: action.ingredient,
			};
		}
		case ADD_INGREDIENT: {
			return {
				...state,
				fillingIngredients: [...state.fillingIngredients, action.ingredient],
			};
		}
		case DELETE_INGREDIENT: {
			state.fillingIngredients.splice(action.index, 1);
			return {
				...state,
				fillingIngredients: state.fillingIngredients,
			};
		}
		case SWAP_ITEMS: {
			return {
				...state,
				fillingIngredients: [...action.newarr],
			};
		}
		case RESET: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
