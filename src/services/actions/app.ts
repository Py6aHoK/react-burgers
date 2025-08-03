import { sendGetIngredientsRequest } from '@/utils/network';
import {
	AppDispatch,
	TDispatchPropmiseVoid,
	TGetIngredientsDto,
} from '@/utils/types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR' as const;
export const INCREASE_COUNTER = 'INCREASE_COUNTER' as const;
export const DECREASE_COUNTER = 'DECREASE_COUNTER' as const;

export function getIngredients(): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: GET_INGREDIENTS_REQUEST });

		try {
			const { data }: TGetIngredientsDto = await sendGetIngredientsRequest();
			dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: data });
		} catch {
			dispatch({ type: GET_INGREDIENTS_ERROR });
		}
	};
}
