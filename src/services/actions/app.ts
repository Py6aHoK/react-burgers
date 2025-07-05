import { sendGetIngredientsRequest } from '@/utils/network';
import {
	AppDispatch,
	TDispatchPropmiseVoid,
	TGetIngredientsDto,
} from '@/utils/types';

export const GET_INGREDIENTS_REQUEST: string = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: string = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: string = 'GET_INGREDIENTS_ERROR';
export const DECREASE_COUNTER: string = 'DECREASE_COUNTER';
export const INCREASE_COUNTER: string = 'INCREASE_COUNTER';

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
