import { getUser } from '@/services/actions/auth';
import { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Preloader } from '../preloader/preloader';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { AppDispatch } from '@/utils/types';

type TProtectedRouteElementProps = {
	element: ReactElement;
};

export const ProtectedRouteElement = ({
	element,
}: TProtectedRouteElementProps): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const { isAuthorized, isLoginChecked } = useAppSelector(
		(state) => state.auth
	);
	useEffect(() => {
		const init = async (): Promise<void> => {
			if (!isAuthorized && !isLoginChecked) {
				await dispatch(getUser());
			}
		};

		void init();
	}, [dispatch, isAuthorized, isLoginChecked]);

	if (!isLoginChecked) {
		return <Preloader />;
	}
	return isAuthorized ? element : <Navigate to='/login' replace />;
};
