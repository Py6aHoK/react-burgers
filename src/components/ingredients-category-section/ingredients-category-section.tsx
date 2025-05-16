import { TIngredient } from '@utils/types.ts';
import styles from './ingredients-category-section.module.css';
import { IngredientItem } from '@components/ingredient-item/ingredient-item.tsx';
import React from 'react';

type TIngredientsCategorySectionProps = {
	name: string;
	ingredients: TIngredient[];
};

export function IngredientsCategorySection({
	name,
	ingredients,
}: TIngredientsCategorySectionProps): React.JSX.Element {
	return (
		<section className={styles.ingredients_category_section}>
			<span className='text_type_main-medium'>{name}</span>
			<ul className={`${styles.items} pt-6 pb-10 pl-3`}>
				{ingredients.map((item: TIngredient) => (
					<IngredientItem key={item._id} count={1} {...item} />
				))}
			</ul>
		</section>
	);
}
