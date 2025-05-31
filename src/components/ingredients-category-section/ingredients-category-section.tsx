import { TIngredient } from '@utils/types.ts';
import styles from './ingredients-category-section.module.css';
import { IngredientItem } from '@components/ingredient-item/ingredient-item.tsx';
import { Ref, useCallback, forwardRef } from 'react';
import { Modal } from '@components/modal/modal.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_INGREDIENTS_INFO,
	OPEN_INGREDIENTS_INFO,
} from '@/services/actions/ingredientInfo';
import { AppDispatch, RootState } from '@/main';

type TIngredientsCategorySectionProps = {
	ref: Ref<HTMLElement>;
	name: string;
	ingredients: TIngredient[];
};

export const IngredientsCategorySection = forwardRef<
	HTMLSpanElement,
	TIngredientsCategorySectionProps
>(({ ingredients, name }: TIngredientsCategorySectionProps, ref) => {
	const dispatch = useDispatch<AppDispatch>();
	const { selectedIngredient } = useSelector(
		(state: RootState) => state.ingredientInfo
	);
	const { fillingIngredients, bun } = useSelector(
		(state: RootState) => state.composer
	);

	const count = useCallback(
		(itemId: string) => {
			if (bun && bun._id === itemId) {
				return 2;
			}
			return fillingIngredients.filter(
				(item: TIngredient) => item._id === itemId
			).length;
		},
		[fillingIngredients, bun]
	);

	return (
		<>
			<section className={styles.ingredients_category_section}>
				<span ref={ref} className='text_type_main-medium'>
					{name}
				</span>
				<ul className={`${styles.items} pt-6 pb-10 pl-3`}>
					{ingredients.map((item: TIngredient) => (
						<IngredientItem
							onClick={() => dispatch({ type: OPEN_INGREDIENTS_INFO, item })}
							key={item._id}
							count={count(item._id)}
							{...item}
						/>
					))}
				</ul>
			</section>
			{selectedIngredient ? (
				<Modal
					title='Детали ингредиента'
					closeHandler={() => dispatch({ type: CLOSE_INGREDIENTS_INFO })}>
					<IngredientDetails {...selectedIngredient} />
				</Modal>
			) : null}
		</>
	);
});
