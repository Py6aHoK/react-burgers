import { useEffect, useState } from 'react';
import { useAppSelector } from '@/utils/hooks';
import styles from './orders-tables.module.css';
import { TOrderInfo } from '@/utils/types';
import { OrderTableColumn } from '../order-table-column/order-table-column';

export const OrdersTables = (): React.JSX.Element => {
	const [doneOrders, setDoneOrders] = useState<number[]>([]);
	const [pendingOrders, setPendingOrders] = useState<number[]>([]);
	const { orders } = useAppSelector((state) => state.socket);

	const getSplittedArrays = (
		orders: TOrderInfo[]
	): Record<string, number[]> => {
		const done: number[] = [];
		const pending: number[] = [];

		orders.forEach((order: TOrderInfo) => {
			if (order.status === 'done') {
				done.push(order.number);
			} else if (order.status === 'pending') {
				pending.push(order.number);
			}
		});
		return { done, pending };
	};

	useEffect((): void => {
		const { done, pending } = getSplittedArrays(orders);

		setDoneOrders(done);
		setPendingOrders(pending);
	}, [orders]);

	return (
		<div className={styles.table}>
			<OrderTableColumn title='Готовы:' ids={doneOrders} isDone={true} />
			<OrderTableColumn title='В работе:' ids={pendingOrders} />
		</div>
	);
};
