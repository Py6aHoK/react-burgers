import { useCallback, useMemo } from 'react';
import { useAppSelector } from './hooks';
import { TIngredient } from './types';

export function useOrderInfo() {
	const { ingredients } = useAppSelector((state) => state.app);
	const ingredientsMap: Record<string, TIngredient> = useMemo(() => {
		const result: Record<string, TIngredient> = {};
		ingredients.forEach((ingredient: TIngredient) => {
			result[ingredient._id] = ingredient;
		});
		return result;
	}, [ingredients]);

	const getIngredients = useCallback(
		(ids: string[]): TIngredient[] => {
			const result: TIngredient[] = [];
			if (!ingredientsMap) {
				return result;
			}
			ids.forEach((id: string) => {
				const item: TIngredient | undefined = ingredientsMap[id];
				if (item) {
					result.push(item);
				}
			});
			return result;
		},
		[ingredientsMap]
	);

	function getPrice(ingredients: TIngredient[]): number {
		let result: number = 0;
		ingredients.forEach(
			(ingredient: TIngredient) => (result += ingredient.price)
		);
		return result;
	}

	return {
		getIngredients,
		getPrice,
	};
}
