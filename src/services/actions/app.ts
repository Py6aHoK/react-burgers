import { sendGetIngredientsRequest } from '@/utils/network';
import { TGetIngredientsDto } from '@/utils/types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';

export const getIngredients =
	() => async (dispatch: (action: unknown) => void) => {
		dispatch({ type: GET_INGREDIENTS_REQUEST });

		try {
			const { data, success }: TGetIngredientsDto =
				await sendGetIngredientsRequest();

			if (success && data?.length) {
				dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: data });
			} else {
				dispatch({ type: GET_INGREDIENTS_ERROR });
			}
		} catch {
			dispatch({ type: GET_INGREDIENTS_ERROR });
		}
	};
