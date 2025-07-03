import styles from './nutritional-value.module.css';
import React from 'react';

type TNutritionalValueProps = {
	name: string;
	value: number;
	className?: string;
};

export const NutritionalValue = ({
	name,
	value,
	className,
}: TNutritionalValueProps): React.JSX.Element => {
	const formatedValue: string = Number.isInteger(value)
		? value.toString()
		: value.toFixed(2).replace('.', ',');

	return (
		<div
			className={`${styles.nutritional_value} ${className} text_color_inactive`}>
			<span className='text text_type_main-default mb-2'>{name}</span>
			<span className='text text_type_digits-default'>{formatedValue}</span>
		</div>
	);
};
