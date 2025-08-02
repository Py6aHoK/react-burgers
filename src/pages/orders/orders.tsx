import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import styles from './orders.module.css';
import { TOrderInfo } from '@/utils/types';
import { Preloader } from '@/components/preloader/preloader';
import { Outlet } from 'react-router-dom';
import { FeedOrder } from '@/components/feed-order/feed-order';
import {
	SOCKET_PERSONAL_CONNECTION_CLOSE,
	SOCKET_PERSONAL_CONNECTION_START,
} from '@/services/actions/socketPersonal';

export const OrdersPage = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { connected, orders } = useAppSelector((state) => state.socketPersonal);

	useEffect(() => {
		dispatch({ type: SOCKET_PERSONAL_CONNECTION_START });
		return () => {
			dispatch({ type: SOCKET_PERSONAL_CONNECTION_CLOSE });
		};
	}, [dispatch]);

	return (
		<>
			{connected ? (
				orders.length ? (
					<section className={`${styles.column} custom-scroll`}>
						{orders.map((order: TOrderInfo): React.JSX.Element => {
							return <FeedOrder {...order} key={order._id} />;
						})}
					</section>
				) : (
					<div className='text_type_main-medium'>Пока нет заказов</div>
				)
			) : (
				<Preloader />
			)}
			<Outlet />
		</>
	);
};
