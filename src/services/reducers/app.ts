import {
	GET_INGREDIENTS_ERROR,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	DECREASE_COUNTER,
	INCREASE_COUNTER,
} from '../actions/app';
import { TIngredient } from '@/utils/types';

export const appInitialState: TAppReducerState = {
	ingredientsRequest: false,
	ingredientsRequestError: false,
	ingredients: [],
};

function increaseCounter(array: TIngredient[], itemId: string): TIngredient[] {
	return array.map((item: TIngredient) =>
		item._id === itemId
			? { ...item, __v: item.__v + (item.type === 'bun' ? 2 : 1) }
			: item
	);
}

function decreaseCounter(array: TIngredient[], itemId: string): TIngredient[] {
	return array.map((item: TIngredient) =>
		item._id === itemId
			? { ...item, __v: item.__v - (item.type === 'bun' ? 2 : 1) }
			: item
	);
}

type TAppReducerState = {
	ingredientsRequest: boolean;
	ingredientsRequestError: boolean;
	ingredients: TIngredient[];
};

type TGetIngredientsAction = {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsSuccessAction = {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: TIngredient[];
};

type TGetIngredientsErrorAction = {
	readonly type: typeof GET_INGREDIENTS_ERROR;
};

type TIncreaseCounterAction = {
	readonly type: typeof INCREASE_COUNTER;
	readonly itemId: string;
};

type TDecreaseCounterAction = {
	readonly type: typeof DECREASE_COUNTER;
	readonly itemId: string;
};

export type TAppActions =
	| TGetIngredientsAction
	| TGetIngredientsSuccessAction
	| TGetIngredientsErrorAction
	| TIncreaseCounterAction
	| TDecreaseCounterAction;

export const appReducer = (
	state = appInitialState,
	action: TAppActions
): TAppReducerState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredientsRequest: true,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredientsRequestError: false,
				ingredients: action.ingredients,
				ingredientsRequest: false,
			};
		}
		case GET_INGREDIENTS_ERROR: {
			return {
				...appInitialState,
				ingredientsRequestError: true,
			};
		}
		case INCREASE_COUNTER: {
			return {
				...state,
				ingredients: increaseCounter(state.ingredients, action.itemId),
			};
		}
		case DECREASE_COUNTER: {
			return {
				...state,
				ingredients: decreaseCounter(state.ingredients, action.itemId),
			};
		}
		default: {
			return state;
		}
	}
};
