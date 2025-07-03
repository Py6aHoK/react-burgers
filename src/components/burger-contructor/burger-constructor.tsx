import { AppDispatch, TIngredient } from '@utils/types.ts';
import React, { useCallback, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { DndConstructorElement } from '@components/dnd-element/dnd-element.tsx';
import { Price } from '@components/price/price.tsx';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import { useDrop } from 'react-dnd';
import {
	ADD_BUN,
	addIngridient,
	SWAP_ITEMS,
} from '@/services/actions/composer';
import { CLOSE_ORDER_MODAL, sendOrder } from '@/services/actions/order';
import { INCREASE_COUNTER, DECREASE_COUNTER } from '@/services/actions/app';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

export const BurgerConstructor = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();
	const { isAuthorized } = useAppSelector((state) => state.auth);
	const { fillingIngredients, bun } = useAppSelector((state) => state.composer);
	const { isModalOpen, order } = useAppSelector((state) => state.order);

	const handleDrop = (item: TIngredient): void => {
		const isBun: boolean = item.type === 'bun';

		if (isBun) {
			dispatch({ type: ADD_BUN, ingredient: item });

			if (bun) {
				dispatch({ type: DECREASE_COUNTER, itemId: bun });
			}
		} else {
			dispatch(addIngridient(item));
		}

		dispatch({ type: INCREASE_COUNTER, itemId: item._id });
	};

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(item) {
			handleDrop(item as TIngredient);
		},
	});

	const handleSendOrderClick = useCallback(() => {
		if (!isAuthorized) {
			navigate('/login');
			return;
		}
		if (!(fillingIngredients.length || bun)) {
			return;
		}
		const ingredientsIds: string[] = fillingIngredients.map(
			(item: TIngredient) => item._id
		);
		bun && ingredientsIds.push(...[bun._id, bun._id]);
		dispatch(sendOrder({ ingredients: ingredientsIds }));
	}, [dispatch, navigate, isAuthorized, fillingIngredients, bun]);

	const handleCloseModal = (): void => {
		dispatch({ type: CLOSE_ORDER_MODAL });
	};

	const price: number = useMemo(() => {
		const bunPrice: number = bun?.price ?? 0;
		const fillingsPrice: number =
			fillingIngredients?.reduce(
				(sum: number, item: TIngredient) => sum + item.price,
				0
			) ?? 0;
		return bunPrice * 2 + fillingsPrice;
	}, [bun, fillingIngredients]);

	const moveItem = (from: number, to: number): void => {
		const updated: TIngredient[] = [...fillingIngredients];
		const [moved] = updated.splice(from, 1);
		updated.splice(to, 0, moved);
		dispatch({ type: SWAP_ITEMS, newarr: updated });
	};

	return (
		<>
			<section ref={dropTarget} className={styles.burger_constructor}>
				{bun ? (
					<DndConstructorElement
						className='mb-4'
						price={bun.price}
						text={bun.name}
						isLocked={true}
						thumbnail={bun.image}
						type='top'
					/>
				) : null}
				<div className={`${styles.scroll_area} custom-scroll`}>
					{fillingIngredients?.map((item: TIngredient, index: number) => (
						<DndConstructorElement
							key={item.uuid}
							index={index}
							className='mb-4'
							price={item.price}
							text={item.name}
							thumbnail={item.image}
							moveItem={moveItem}
						/>
					))}
				</div>
				{bun ? (
					<DndConstructorElement
						className='mt-4'
						price={bun.price}
						text={bun.name}
						isLocked={true}
						thumbnail={bun.image}
						type='bottom'
					/>
				) : null}
				<div className={`${styles.sum_wrapper} mt-10 mt-13`}>
					<Price size='medium' className='mr-8'>
						{price ?? 0}
					</Price>
					<Button htmlType='submit' size='large' onClick={handleSendOrderClick}>
						Оформить заказ
					</Button>
				</div>
			</section>
			{order && isModalOpen ? (
				<Modal closeHandler={handleCloseModal}>
					<OrderDetails orderId={order.number} />
				</Modal>
			) : null}
		</>
	);
};
