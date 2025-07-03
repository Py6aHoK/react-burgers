import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { getIngredients } from '@/services/actions/app';
import { CLOSE_INGREDIENTS_INFO } from '@/services/actions/ingredientInfo';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { AppDispatch, TIngredient } from '@/utils/types';
import { useCallback, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

export const IngredientPage = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();
	const { ingredients } = useAppSelector((state) => state.app);

	const { selectedIngredient } = useAppSelector(
		(state) => state.ingredientInfo
	);

	const [ingredient, setIngredient] = useState<TIngredient>();
	const { id } = useParams();

	useEffect(() => {
		if (selectedIngredient) {
			return;
		}
		dispatch(getIngredients());
	}, [dispatch]);

	useEffect(() => {
		const item: TIngredient | undefined = ingredients.find(
			(item: TIngredient) => item._id === id
		);
		setIngredient(item);
	}, [ingredients, id]);

	const handleCloseModal = useCallback(() => {
		dispatch({ type: CLOSE_INGREDIENTS_INFO });
		void navigate('/');
	}, [dispatch, navigate]);

	return (
		<>
			{ingredient ? (
				<Modal title='Детали ингредиента' closeHandler={handleCloseModal}>
					<IngredientDetails {...ingredient} />
				</Modal>
			) : null}
		</>

		// <div className='flex-center'>
		// 	{ingredient && <IngredientDetails {...ingredient} />}
		// </div>
	);
};
