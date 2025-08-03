import { ReactNode } from 'react';
import styles from './ingredients-list.module.css';
import { Price } from '@/components/price/price';
import { TIngredient } from '@/utils/types';

type TIngredientsListProps = {
	ingredients: TIngredient[];
};

export const IngredientsList = ({
	ingredients,
}: TIngredientsListProps): React.JSX.Element => {
	return (
		<div className={`${styles.list} pr-6`}>
			{ingredients.map((ingredient: TIngredient, index: number): ReactNode => {
				return (
					<div
						key={`${ingredient._id}_${index}`}
						className={`${styles.item} mb-4`}>
						<img
							src={ingredient.image_mobile}
							className={styles.image}
							alt={ingredient.name}
						/>
						<div className={`${styles.name} text_type_main-default mr-6 ml-6`}>
							{ingredient.name}
						</div>
						<div className={`${styles.price} text_type_digits-default`}>
							{ingredient.type === 'bun' ? '2 x ' : '1 x '}
							<Price className='ml-2'>{ingredient.price}</Price>
						</div>
					</div>
				);
			})}
		</div>
	);
};
