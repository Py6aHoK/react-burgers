import React, { PropsWithChildren } from 'react';
import styles from './price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TPriceProps = {
	className?: string;
	size?: 'default' | 'medium';
} & PropsWithChildren;

export function Price({
	children,
	size = 'default',
	className,
}: TPriceProps): React.JSX.Element {
	return (
		<div
			className={`text ${styles.price} ${styles[size]} text_type_digits-${size} ${className} `}>
			{children} <CurrencyIcon className='ml-2' type='primary' />
		</div>
	);
}
