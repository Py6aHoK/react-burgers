import checkMarkImage from '../../images/done.svg';
import styles from './order-details.module.css';
import React from 'react';

type TOrderDetailsProps = {
	orderId: string;
};

export function OrderDetails({
	orderId,
}: TOrderDetailsProps): React.JSX.Element {
	const orderStatusText: string = 'Ваш заказ начали готовить';

	return (
		<div className={`${styles.order_details} text text_type_main-default`}>
			<span className='text_type_digits-large mb-8'>{orderId}</span>
			<span className='text_type_main-medium mb-15'>идентификатор заказа</span>
			<img className='mb-15' src={checkMarkImage} alt={orderStatusText} />
			<span className='mb-2'>{orderStatusText}</span>
			<span className='text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</span>
		</div>
	);
}
