import React, { useEffect, useState } from 'react';
import { TIngredient, TOrderStatus } from '@utils/types.ts';
import { Link } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { useOrderInfo } from '@/utils/order';
import styles from './feed-order.module.css';
import { IngredientsIcons } from '../ingredients-icons/ingredients-icons';
import { Status } from '../status/status';
import { OrderNumber } from '../order-number/order-number';

type TFeedOrderProps = {
	ingredients: string[];
	_id: string;
	status: TOrderStatus;
	name: string;
	number: number;
	createdAt: string;
	updatedAt: string;
};

export const FeedOrder = (props: TFeedOrderProps): React.JSX.Element => {
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [price, setPrice] = useState<number>(0);
	const { getIngredients, getPrice } = useOrderInfo();

	useEffect((): void => {
		const orderIngredients: TIngredient[] = getIngredients(props.ingredients);
		setIngredients(orderIngredients);
		setPrice(getPrice(orderIngredients));
	}, []);

	return (
		<Link
			to={{
				pathname: `${location.pathname}/${props._id}`,
			}}>
			<div className={`${styles.card} mb-4 mr-2 p-6`}>
				<div className={styles.info}>
					<OrderNumber number={props.number} />
					<span className='text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(props.createdAt)} />
					</span>
				</div>
				<div className='text_type_main-medium mt-6 mb-6'>{props.name}</div>
				<Status status={props.status} />
				<div className={styles.price}>
					<IngredientsIcons ingredients={ingredients} />
					<Price>{price}</Price>
				</div>
			</div>
		</Link>
	);
};
