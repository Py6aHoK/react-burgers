import { getOrder } from '@/services/actions/order';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FeedOrderDetails } from '../feed-order-details/feed-order-details';
import { Preloader } from '../preloader/preloader';

export const OrderPage = (): React.JSX.Element => {
	const { orderInfo, getOrderRequest, getOrderRequestError } = useAppSelector(
		(state) => state.order
	);
	const dispatch = useAppDispatch();
	const { id } = useParams<string>();

	useEffect((): void => {
		if (id) {
			dispatch(getOrder(id));
		}
	}, [dispatch, id]);

	if (getOrderRequest || !orderInfo) {
		return <Preloader />;
	}
	if (getOrderRequestError) {
		return <>Ошибка получения данных</>;
	}

	return <FeedOrderDetails />;
};
