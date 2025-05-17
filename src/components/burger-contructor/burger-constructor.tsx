import { TIngredient } from '@utils/types.ts';
import React, { useCallback, useState } from 'react';
import styles from './burger-constructor.module.css';
import { DndConstructorElement } from '@components/dnd-element/dnd-element.tsx';
import { Price } from '@components/price/price.tsx';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

type TBurgerComposition = {
	topBun?: TIngredient;
	fillingIngredients: TIngredient[];
	bottomBun?: TIngredient;
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const bun: TIngredient | undefined = ingredients.find(
		(item: TIngredient) => item.type === 'bun'
	);
	const fillingIngredients: TIngredient[] = ingredients.filter(
		(item: TIngredient) => item.type !== 'bun'
	);
	const burgerComposition: TBurgerComposition = {
		topBun: bun,
		fillingIngredients,
		bottomBun: bun,
	};

	const handleSendOrderClick = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	return (
		<>
			<section className={styles.burger_constructor}>
				{burgerComposition.topBun ? (
					<DndConstructorElement
						className='mb-4'
						price={burgerComposition.topBun.price}
						text={burgerComposition.topBun.name}
						isLocked={true}
						thumbnail={burgerComposition.topBun.image}
						type='top'
					/>
				) : null}
				<div className={`${styles.scroll_area} custom-scroll`}>
					{burgerComposition.fillingIngredients.map(
						(item: TIngredient, index: number) => (
							<DndConstructorElement
								key={`${item._id}_${index}`}
								className='mb-4'
								price={item.price}
								text={item.name}
								thumbnail={item.image}
							/>
						)
					)}
				</div>
				{burgerComposition.bottomBun ? (
					<DndConstructorElement
						className='mt-4'
						price={burgerComposition.bottomBun.price}
						text={burgerComposition.bottomBun.name}
						isLocked={true}
						thumbnail={burgerComposition.bottomBun.image}
						type='bottom'
					/>
				) : null}
				<div className={`${styles.sum_wrapper} mt-10 mt-13`}>
					<Price size='medium' className='mr-8'>
						610
					</Price>
					<Button htmlType='submit' size='large' onClick={handleSendOrderClick}>
						Оформить заказ
					</Button>
				</div>
			</section>
			{isModalOpen ? (
				<Modal closeHandler={() => setIsModalOpen(false)}>
					<OrderDetails orderId='034536' />
				</Modal>
			) : null}
		</>
	);
};
