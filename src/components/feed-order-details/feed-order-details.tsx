import { Price } from '@/components/price/price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import styles from './feed-order-details.module.css';
import { IngredientsList } from '@/components/ingredients-list/ingredients-list';
import { TIngredient } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useOrderInfo } from '@/utils/order';
import { OrderNumber } from '../order-number/order-number';
import { Preloader } from '../preloader/preloader';
import { Status } from '../status/status';

export const FeedOrderDetails = (): React.JSX.Element => {
	const [currentIngredients, setIngredients] = useState<TIngredient[]>([]);
	const [price, setPrice] = useState<number>(0);
	const { orderInfo } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();
	const { getIngredients, getPrice } = useOrderInfo();

	useEffect((): void => {
		if (!orderInfo) {
			return;
		}
		const orderIngredients: TIngredient[] = getIngredients(
			orderInfo.ingredients
		);
		setIngredients(orderIngredients);
		setPrice(getPrice(orderIngredients));
	}, [dispatch, orderInfo]);

	if (!orderInfo) {
		return <Preloader />;
	}

	return (
		<div className={styles.order}>
			<OrderNumber number={orderInfo.number} className='mb-10' />
			<div className='text_type_main-medium mb-3'>{orderInfo.name}</div>
			<Status className='mb-15' status={orderInfo.status} />
			<div className='text_type_main-medium mb-6'>Состав:</div>
			<IngredientsList ingredients={currentIngredients} />
			<div className={styles.info}>
				{orderInfo && (
					<FormattedDate
						date={new Date(orderInfo.createdAt)}
						className='text_type_main-default text_color_inactive mt-10'
					/>
				)}
				<Price>{price}</Price>
			</div>
		</div>
	);
};
