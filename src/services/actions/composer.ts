import { TIngredient } from '@/utils/types';
import { uuidV4 } from '@/utils/uuidV4';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SWAP_ITEMS = 'SWAP_ITEMS';
export const RESET = 'RESET';

export const addIngridient = (item: TIngredient) => {
	return {
		type: ADD_INGREDIENT,
		ingredient: {
			...item,
			uuid: uuidV4(),
		},
	};
};
