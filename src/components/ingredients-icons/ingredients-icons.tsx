import { TIngredient } from '@/utils/types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import styles from './ingredients-icons.module.css';

type IngredientsIconsProps = {
	ingredients: TIngredient[];
};

export function IngredientsIcons({
	ingredients,
}: IngredientsIconsProps): React.JSX.Element {
	const [stack, setStack] = useState<TIngredient[]>([]);
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		if (ingredients.length > 5) {
			setStack(ingredients.slice(0, 6));
			setCount(ingredients.length - 5);
		} else {
			setStack(ingredients);
		}
	}, [ingredients]);

	return (
		<div>
			{stack.map((ingredient: TIngredient, index: number) => {
				return (
					<Button
						htmlType='button'
						size='small'
						extraClass={styles.button}
						style={{ zIndex: ingredients.length - index }}
						onClick={(): void => {}}
						key={index}>
						<img
							src={ingredient.image_mobile}
							className={styles.image}
							alt={ingredient.name}
						/>
						{count ? (
							<div
								className={`${styles.counter} text_type_main-default`}>{`+${count}`}</div>
						) : null}
					</Button>
				);
			})}
		</div>
	);
}
