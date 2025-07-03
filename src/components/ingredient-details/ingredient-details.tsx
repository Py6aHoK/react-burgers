import styles from './ingredient-details.module.css';
import React from 'react';
import { TIngredient } from '@utils/types.ts';
import { NutritionalValue } from '@components/ingredient-details/nutritional-value/nutritional-value.tsx';

export const IngredientDetails = ({
	name,
	image_large,
	calories,
	fat,
	proteins,
	carbohydrates,
}: TIngredient): React.JSX.Element => {
	return (
		<div className={styles.ingredient_details}>
			<img className={`${styles.image} mb-4`} src={image_large} alt={name} />
			<span className='text text_type_main-medium mb-8'>{name}</span>
			<div className={styles.nutrition_values}>
				<NutritionalValue
					className='mr-5'
					name='Калории, ккал'
					value={calories}
				/>
				<NutritionalValue className='mr-5' name='Белки, г' value={proteins} />
				<NutritionalValue className='mr-5' name='Жиры, г' value={fat} />
				<NutritionalValue name='Углеводы, г' value={carbohydrates} />
			</div>
		</div>
	);
};
