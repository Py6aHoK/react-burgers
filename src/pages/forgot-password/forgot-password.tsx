import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch, TResetPasswordInitParams } from '@/utils/types';
import { resetPasswordInit } from '@/services/actions/passwordReset';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const { isAuthorized } = useAppSelector((state) => state.auth);
	const { isInitRequested, initError } = useAppSelector(
		(state) => state.passwordReset
	);
	const [email, setEmail] = useState<string>('');

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		if (email == '') {
			return;
		}
		const params: TResetPasswordInitParams = { email };
		dispatch(resetPasswordInit(params));
	};

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setEmail(event.target.value);

	if (isAuthorized) {
		return <Navigate to={'/'} />;
	}
	if (isInitRequested) {
		return <Navigate to={'/reset-password'} />;
	}

	return (
		<form onSubmit={onSubmit} className='form flex-center'>
			<span className='text_type_main-medium'>Восстановление пароля</span>
			<EmailInput
				value={email}
				placeholder='Укажите e-mail'
				onChange={handleEmailChange}
			/>
			<Button htmlType='submit' type='primary'>
				Восстановить
			</Button>
			{initError ? <span>{initError}</span> : null}
			<div className='mt-15'>
				<span className='text_type_main-default text_color_inactive pr-2'>
					Вспомнили пароль?
				</span>
				<Link to='/login'>
					<Button htmlType='button' type='secondary'>
						Войти
					</Button>
				</Link>
			</div>
		</form>
	);
};
