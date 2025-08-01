import { TIngredient } from '@/utils/types';
import { uuidV4 } from '@/utils/uuidV4';

export const ADD_BUN = 'ADD_BUN' as const;
export const ADD_INGREDIENT = 'ADD_INGREDIENT' as const;
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT' as const;
export const SWAP_ITEMS = 'SWAP_ITEMS' as const;
export const RESET = 'RESET' as const;

export const addIngridient = (item: TIngredient) => {
	return {
		type: ADD_INGREDIENT,
		ingredient: {
			...item,
			uuid: uuidV4(),
		},
	};
};
