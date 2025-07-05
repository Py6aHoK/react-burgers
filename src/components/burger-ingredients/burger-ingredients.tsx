import React, { RefObject, useCallback, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { AppDispatch, Nullable, TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategorySection } from '@components/ingredients-category-section/ingredients-category-section.tsx';
import {
	SET_BUN_ACTIVE,
	SET_MAIN_ACTIVE,
	SET_SAUCE_ACTIVE,
} from '@/services/actions/tabs';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

type TCategory = Record<string, TIngredient[]>;
type TSectionPosition = {
	key: string;
	distance: number;
};

export const BurgerIngredients = (): React.JSX.Element => {
	const { isBunsActive, isMainActive, isSauceActive } = useAppSelector(
		(state) => state.tabs
	);
	const { ingredients } = useAppSelector((state) => state.app);
	const categories: TCategory = ingredients.reduce<
		Record<string, TIngredient[]>
	>((acc: TCategory, ingredient: TIngredient) => {
		(acc[ingredient.type] ||= []).push(ingredient);
		return acc;
	}, {});
	const dispatch: AppDispatch = useAppDispatch();
	const scrollRef: RefObject<HTMLElement> = useRef<Nullable<HTMLElement>>(null);
	const bunsRef: RefObject<HTMLElement> = useRef<Nullable<HTMLElement>>(null);
	const mainsRef: RefObject<HTMLElement> = useRef<Nullable<HTMLElement>>(null);
	const saucesRef: RefObject<HTMLElement> = useRef<Nullable<HTMLElement>>(null);

	const onScroll = useCallback(() => {
		const scrollY: number | undefined =
			scrollRef.current?.getBoundingClientRect().y;
		if (scrollY === undefined) return;

		const positions: TSectionPosition[] = [
			{ key: 'bun', ref: bunsRef.current },
			{ key: 'main', ref: mainsRef.current },
			{ key: 'sauce', ref: saucesRef.current },
		].map(({ key, ref }) => ({
			key,
			distance: ref
				? Math.abs(scrollY - ref.getBoundingClientRect().y)
				: Infinity,
		}));

		const closest: TSectionPosition = positions.reduce((min, current) =>
			current.distance < min.distance ? current : min
		);

		switch (closest.key) {
			case 'bun':
				dispatch({ type: SET_BUN_ACTIVE });
				return;
			case 'main':
				dispatch({ type: SET_MAIN_ACTIVE });
				return;
			case 'sauce':
				dispatch({ type: SET_SAUCE_ACTIVE });
		}
	}, [scrollRef, bunsRef, mainsRef, saucesRef, dispatch]);

	useEffect(() => {
		dispatch({ type: SET_BUN_ACTIVE });
	}, [dispatch]);

	useEffect(() => {
		const scrollSection: Nullable<Element> =
			document.querySelector('#ingredients');
		scrollSection?.addEventListener('scroll', onScroll);
		return () => {
			scrollSection?.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={isBunsActive}
						onClick={() => {
							if (bunsRef.current && scrollRef.current) {
								scrollRef.current.scrollTop = bunsRef.current.offsetTop;
							}
						}}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={isSauceActive}
						onClick={() => {
							if (saucesRef.current && scrollRef.current) {
								scrollRef.current.scrollTop = saucesRef.current.offsetTop;
							}
						}}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={isMainActive}
						onClick={() => {
							if (mainsRef.current && scrollRef.current) {
								scrollRef.current.scrollTop = mainsRef.current.offsetTop;
							}
						}}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<main id='ingredients' ref={scrollRef} className={`${styles.main} pt-10`}>
				<IngredientsCategorySection
					ref={bunsRef}
					name='Булки'
					ingredients={categories.bun}
				/>
				<IngredientsCategorySection
					ref={saucesRef}
					name='Соусы'
					ingredients={categories.sauce}
				/>
				<IngredientsCategorySection
					ref={mainsRef}
					name='Начинки'
					ingredients={categories.main}
				/>
			</main>
		</section>
	);
};
