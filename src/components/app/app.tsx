import React, { useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '@/services/actions/app';
import { AppDispatch, RootState } from '@/main';
import { Preloader } from '../preloader/preloader';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { ingredients, ingredientsRequest, ingredientsRequestError } =
		useSelector((state: RootState) => state.app);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} text_type_main-default pl-5 pr-5 pb-10`}>
				{ingredientsRequest ? <Preloader /> : null}
				{ingredientsRequestError ? <p>Ошибка получения данных</p> : null}
				{ingredients.length > 0 ? (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor />
					</DndProvider>
				) : null}
			</main>
		</div>
	);
};

export default App;
