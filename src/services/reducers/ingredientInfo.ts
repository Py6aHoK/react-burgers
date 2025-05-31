import { TIngredient } from '@/utils/types';
import {
	OPEN_INGREDIENTS_INFO,
	CLOSE_INGREDIENTS_INFO,
} from '../actions/ingredientInfo';

const initialState = {
	selectedIngredient: null,
};

type TIngredientInfoReducerAction = {
	type: string;
	item: TIngredient;
};

export const ingredientInfoReducer = (
	state = initialState,
	action: TIngredientInfoReducerAction
) => {
	switch (action.type) {
		case OPEN_INGREDIENTS_INFO: {
			return {
				...state,
				selectedIngredient: action.item,
			};
		}
		case CLOSE_INGREDIENTS_INFO: {
			return {
				...state,
				selectedIngredient: null,
			};
		}
		default: {
			return state;
		}
	}
};
