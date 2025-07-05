import { AppDispatch, TIngredient } from '@utils/types.ts';
import styles from './ingredients-category-section.module.css';
import { IngredientItem } from '@components/ingredient-item/ingredient-item.tsx';
import { Ref, useCallback, forwardRef } from 'react';
import { OPEN_INGREDIENTS_INFO } from '@/services/actions/ingredientInfo';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type TIngredientsCategorySectionProps = {
	ref: Ref<HTMLElement>;
	name: string;
	ingredients: TIngredient[];
};

export const IngredientsCategorySection = forwardRef<
	HTMLSpanElement,
	TIngredientsCategorySectionProps
>(
	(
		{ ingredients, name }: TIngredientsCategorySectionProps,
		ref
	): React.JSX.Element => {
		const dispatch: AppDispatch = useAppDispatch();
		const navigate: NavigateFunction = useNavigate();
		const { fillingIngredients, bun } = useAppSelector(
			(state) => state.composer
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

		const handleOpenModal = useCallback(
			(item: TIngredient) => {
				dispatch({ type: OPEN_INGREDIENTS_INFO, item });
				void navigate(`/ingredients/${item._id}`);
			},
			[dispatch, navigate]
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
								onClick={() => handleOpenModal(item)}
								key={item._id}
								count={count(item._id)}
								{...item}
							/>
						))}
					</ul>
				</section>
			</>
		);
	}
);
