import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { TGetIngredientsDto, TIngredient } from '@utils/types.ts';
import { API_URL } from '@utils/constants.ts';

export const App = (): React.JSX.Element => {
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				const response: Response = await fetch(`${API_URL}/ingredients`);
				if (!response.ok) {
					setIsError(true);
					return;
				}
				const { data, success }: TGetIngredientsDto = await response.json();
				if (success && data?.length > 0) {
					setIngredients(data);
					setIsError(false);
				} else {
					setIsError(true);
				}
			} catch {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		void loadData();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} text_type_main-default pl-5 pr-5 pb-10`}>
				{isLoading ? <p>Загрузка данных...</p> : null}
				{isError ? <p>Ошибка получения данных</p> : null}
				{ingredients.length > 0 ? (
					<>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor ingredients={ingredients} />
					</>
				) : null}
			</main>
		</div>
	);
};

export default App;
