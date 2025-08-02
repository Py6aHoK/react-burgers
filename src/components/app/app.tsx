import React, { useEffect } from 'react';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '@/pages/profile/profile';
import { RegisterPage } from '@/pages/register/register';
import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '@/pages/reset-password/reset-password';
import { NotFound404 } from '@/pages/not-found-404/not-found-404';
import { LoginPage } from '@/pages/login/login';
import { HomePage } from '@/pages/home/home';
import { ProtectedRouteElement } from '@/components/protected-route-element/protected-route-element';
import { IngredientPage } from '@/pages/ingredients/ingredients';
import { ProfileMain } from '@/components/profile-main/profile-main';
import { OrdersPage } from '@pages/orders/orders';
import { useAppDispatch } from '@/utils/hooks';
import { getIngredients } from '@/services/actions/app';
import { AppDispatch } from '@/utils/types';
import { FeedPage } from '@/pages/feed/feed';
import { OrderPage } from '@/components/order-page/order-page';

export const App = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<AppHeader />
			<Routes>
				<Route path='/' element={<HomePage />}>
					<Route path='/ingredients/:id' element={<IngredientPage />} />
				</Route>
				<Route path='/feed' element={<FeedPage />}>
					<Route path='/feed/:id' element={<OrderPage />} />
				</Route>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password' element={<ResetPasswordPage />} />
				<Route
					path='/profile'
					element={<ProtectedRouteElement element={<ProfilePage />} />}>
					<Route path='' element={<ProfileMain />} />
					<Route path='orders' element={<OrdersPage />} />
					<Route path='/profile/orders/:id' element={<OrderPage />} />
				</Route>
				<Route path='*' element={<NotFound404 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
