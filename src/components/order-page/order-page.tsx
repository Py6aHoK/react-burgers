import { getOrder } from '@/services/actions/order';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
	NavigateFunction,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { Preloader } from '../preloader/preloader';
import { Modal } from '../modal/modal';
import { Status } from '../status/status';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { TIngredient } from '@/utils/types';
import { useOrderInfo } from '@/utils/order';
import styles from './order-page.module.css';

export const OrderPage = (): React.JSX.Element => {
	const navigate: NavigateFunction = useNavigate();
	const { orderInfo, getOrderRequest } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();
	const { id } = useParams<string>();
	const { getIngredients, getPrice } = useOrderInfo();
	const [currentIngredients, setIngredients] = useState<TIngredient[]>([]);
	const [price, setPrice] = useState<number>(0);
	const location = useLocation();
	const [number, setNumber] = useState<string | undefined>();

	useEffect((): void => {
		if (id) {
			dispatch(getOrder(id));
		}
	}, [dispatch, id]);

	const handleCloseModal = useCallback(() => {
		void navigate(location.pathname.split('/').slice(0, -1).join('/'));
	}, [navigate]);

	useEffect((): void => {
		if (!orderInfo) {
			return;
		}
		const orderIngredients: TIngredient[] = getIngredients(
			orderInfo.ingredients
		);
		setIngredients(orderIngredients);
		setPrice(getPrice(orderIngredients));
		setNumber('#' + orderInfo.number.toString().padStart(6, '0'));
	}, [dispatch, orderInfo]);

	return (
		<>
			<Modal
				title={
					number ? (
						<span className='text_type_digits-medium'>{number}</span>
					) : undefined
				}
				closeHandler={handleCloseModal}>
				{getOrderRequest ? (
					<Preloader />
				) : orderInfo ? (
					<div className={`${styles.order} mt-10`}>
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
				) : (
					<>Ошибка получения данных</>
				)}
			</Modal>
		</>
	);
};
