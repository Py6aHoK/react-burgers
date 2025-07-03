import { TIngredient } from '@/utils/types';
import { uuidV4 } from '@/utils/uuidV4';

export const ADD_BUN: string = 'ADD_BUN';
export const ADD_INGREDIENT: string = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: string = 'DELETE_INGREDIENT';
export const SWAP_ITEMS: string = 'SWAP_ITEMS';
export const RESET: string = 'RESET';

export const addIngridient = (item: TIngredient) => {
	return {
		type: ADD_INGREDIENT,
		ingredient: {
			...item,
			uuid: uuidV4(),
		},
	};
};
