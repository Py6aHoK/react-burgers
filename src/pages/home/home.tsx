import styles from './home.module.css';
import { Preloader } from '@/components/preloader/preloader';
import { DndProvider } from 'react-dnd';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/utils/hooks';

export const HomePage = (): React.JSX.Element => {
	const { ingredients, ingredientsRequest, ingredientsRequestError } =
		useAppSelector((state) => state.app);

	return (
		<div className={styles.home}>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} text_type_main-default pl-5 pr-5 pb-10`}>
				{ingredientsRequest ? <Preloader /> : null}
				{ingredientsRequestError ? <p>Ошибка получения данных</p> : null}
				{!ingredientsRequest && ingredients.length > 0 ? (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				) : null}
			</main>
			<Outlet />
		</div>
	);
};
