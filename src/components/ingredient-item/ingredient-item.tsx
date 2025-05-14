import styles from './ingredient-item.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '@utils/types.ts';
import { Price } from '@components/price/price.tsx';
import React from 'react';

type TIngredientItemProps = {
	count?: number;
} & TIngredient;

export function IngredientItem(props: TIngredientItemProps): React.JSX.Element {
	const { name, price, image, count } = props;

	return (
		<li className={styles.ingredient_item}>
			<img className='ml-4 mr-4 mb-1' src={image} alt={name} />
			<Price className={`${styles.price} mb-1`}>{price}</Price>
			<span className='text_type_main-default'>{name}</span>
			{count ? <Counter count={count} /> : null}
		</li>
	);
}
