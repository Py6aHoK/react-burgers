import { TIngredient } from '@utils/types.ts';
import styles from './ingredients-category-section.module.css';
import { IngredientItem } from '@components/ingredient-item/ingredient-item.tsx';
import React, { useState } from 'react';
import { Modal } from '@components/modal/modal.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';

type TIngredientsCategorySectionProps = {
	name: string;
	ingredients: TIngredient[];
};

export function IngredientsCategorySection({
	name,
	ingredients,
}: TIngredientsCategorySectionProps): React.JSX.Element {
	const [selectedIngredient, setSelectedIngredient] = useState<
		TIngredient | undefined
	>(undefined);

	return (
		<>
			<section className={styles.ingredients_category_section}>
				<span className='text_type_main-medium'>{name}</span>
				<ul className={`${styles.items} pt-6 pb-10 pl-3`}>
					{ingredients.map((item: TIngredient) => (
						<IngredientItem
							onClick={() => setSelectedIngredient(item)}
							key={item._id}
							count={1}
							{...item}
						/>
					))}
				</ul>
			</section>
			{selectedIngredient ? (
				<Modal
					title='Детали ингредиента'
					closeHandler={() => setSelectedIngredient(undefined)}>
					<IngredientDetails {...selectedIngredient} />
				</Modal>
			) : null}
		</>
	);
}
