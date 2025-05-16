import React from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategorySection } from '@components/ingredients-category-section/ingredients-category-section.tsx';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

type TCategory = Record<string, TIngredient[]>;

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const categories: TCategory = ingredients.reduce<
		Record<string, TIngredient[]>
	>((acc: TCategory, ingredient: TIngredient) => {
		(acc[ingredient.type] ||= []).push(ingredient);
		return acc;
	}, {});

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<main className={`${styles.main} pt-10`}>
				<IngredientsCategorySection name='Булки' ingredients={categories.bun} />
				<IngredientsCategorySection
					name='Соусы'
					ingredients={categories.sauce}
				/>
				<IngredientsCategorySection
					name='Начинки'
					ingredients={categories.main}
				/>
			</main>
		</section>
	);
};
