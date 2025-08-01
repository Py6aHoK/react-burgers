import React, { useMemo } from 'react';
import styles from './order-table-column.module.css';
import { OrderNumber } from '../order-number/order-number';
import { MAX_ROWS_PER_BLOCK } from '@/utils/constants';

type TOrderTableColumnProps = {
	title: string;
	ids: number[];
	isDone?: boolean;
};

export const OrderTableColumn = ({
	title,
	ids,
	isDone,
}: TOrderTableColumnProps): React.JSX.Element => {
	const orders: number[][] = useMemo(() => {
		const result: number[][] = [];
		for (let i = 0; i < ids.length; i += MAX_ROWS_PER_BLOCK) {
			result.push(ids.slice(i, i + MAX_ROWS_PER_BLOCK));
		}
		return result;
	}, [ids]);

	return (
		<div className={`${styles.column}`}>
			<div className='text_type_main-medium mb-6'>{title}</div>
			<div className={`${styles.content} custom-scroll`}>
				{orders.map((group: number[], index: number) => {
					return (
						<div key={`group_${index}`}>
							{group.map((order: number) => (
								<OrderNumber
									className='mb-2'
									key={order}
									number={order}
									isDone={isDone}
								/>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};
