import { Preloader } from '@/components/preloader/preloader';
import {
	SOCKET_CONNECTION_CLOSED,
	SOCKET_CONNECTION_START,
} from '@/services/actions/socket';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './feed.module.css';
import { TOrderInfo } from '@/utils/types';
import { FeedOrder } from '@/components/feed-order/feed-order';
import { OrdersTables } from '@/components/orders-tables/orders-tables';

export const FeedPage = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { connected, orders, total, totalToday } = useAppSelector(
		(state) => state.socket
	);

	useEffect(() => {
		dispatch({ type: SOCKET_CONNECTION_START });
		return () => {
			dispatch({ type: SOCKET_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	return (
		<div className={styles.feed}>
			{connected && orders.length ? (
				<>
					<h1 className='page-title text text_type_main-large mt-10 mb-5 pl-5'>
						Лента заказов
					</h1>
					<div className='main pl-5 pr-5'>
						<section className={`${styles.orders} custom-scroll mr-15`}>
							{orders.map(
								(order: TOrderInfo): React.JSX.Element => (
									<FeedOrder key={order._id} {...order} />
								)
							)}
						</section>
						<section className={styles.table}>
							<OrdersTables />
							<div className='text_type_main-medium mt-15'>
								Выполнено за все время:
								<div className='text_type_digits-large'>{total}</div>
							</div>
							<div className='text_type_main-medium mt-15'>
								Выполнено за сегодня:
								<div className='text_type_digits-large'>{totalToday}</div>
							</div>
						</section>
					</div>
				</>
			) : (
				<Preloader />
			)}
			<Outlet />
		</div>
	);
};
