import { Nullable, TIngredient } from '@/utils/types';
import {
	OPEN_INGREDIENTS_INFO,
	CLOSE_INGREDIENTS_INFO,
} from '../actions/ingredientInfo';

export const ingredientInfoInitialState: TIngredientInfoReducerState = {
	selectedIngredient: null,
};

type TIngredientInfoReducerState = {
	selectedIngredient: Nullable<TIngredient>;
};

type TOpenIngredientsInfoAction = {
	readonly type: typeof OPEN_INGREDIENTS_INFO;
	readonly item: TIngredient;
};

type TCloseIngredientsInfoAction = {
	readonly type: typeof CLOSE_INGREDIENTS_INFO;
};

export type TIngredientInfoActions =
	| TOpenIngredientsInfoAction
	| TCloseIngredientsInfoAction;

export const ingredientInfoReducer = (
	state = ingredientInfoInitialState,
	action: TIngredientInfoActions
): TIngredientInfoReducerState => {
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
