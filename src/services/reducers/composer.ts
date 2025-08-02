import { Nullable, TIngredient } from '@/utils/types';
import {
	ADD_BUN,
	ADD_INGREDIENT,
	DELETE_INGREDIENT,
	SWAP_ITEMS,
	RESET,
} from '../actions/composer';

export const composerInitialState: TComposerReducerState = {
	fillingIngredients: [],
	bun: null,
	price: 0,
};

type TComposerReducerState = {
	fillingIngredients: TIngredient[];
	bun: Nullable<TIngredient>;
	price: number;
};

type TAddBunAction = {
	readonly type: typeof ADD_BUN;
	readonly ingredient: TIngredient;
};

type TAddIngredientAction = {
	readonly type: typeof ADD_INGREDIENT;
	readonly ingredient: TIngredient;
};

type TDeleteIngredientAction = {
	readonly type: typeof DELETE_INGREDIENT;
	readonly index: number;
};

type TSwapItemsAction = {
	readonly type: typeof SWAP_ITEMS;
	readonly newarr: TIngredient[];
};

type TResetAction = {
	readonly type: typeof RESET;
};

export type TComposerActions =
	| TAddBunAction
	| TAddIngredientAction
	| TDeleteIngredientAction
	| TSwapItemsAction
	| TResetAction;

export const composerReducer = (
	state = composerInitialState,
	action: TComposerActions
): TComposerReducerState => {
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
			return {
				...state,
				fillingIngredients: state.fillingIngredients.filter(
					(_, i) => i !== action.index
				),
			};
		}
		case SWAP_ITEMS: {
			return {
				...state,
				fillingIngredients: [...action.newarr],
			};
		}
		case RESET: {
			return composerInitialState;
		}
		default: {
			return state;
		}
	}
};
