import { resetPasswordCheck } from '@/services/actions/passwordReset';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { AppDispatch, TResetPasswordCheckParams } from '@/utils/types';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export const ResetPasswordPage = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const [password, setPassword] = useState<string>('');
	const [token, setToken] = useState<string>('');
	const { isAuthorized } = useAppSelector((state) => state.auth);
	const { isInitRequested, checkError } = useAppSelector(
		(state) => state.passwordReset
	);

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setPassword(event.target.value);
	const handleTokenChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setToken(event.target.value);

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		if (token == '' || password == '') {
			return;
		}
		const params: TResetPasswordCheckParams = { password, token };
		dispatch(resetPasswordCheck(params));
	};

	if (isAuthorized) {
		return <Navigate to={'/'} />;
	}
	if (!isInitRequested) {
		return <Navigate to={'/forgot-password'} />;
	}

	return (
		<form onSubmit={onSubmit} className='form flex-center'>
			<span className='text_type_main-medium'>Восстановление пароля</span>
			<PasswordInput value={password} onChange={handlePasswordChange} />
			<Input
				value={token}
				placeholder='Введите код из письма'
				onChange={handleTokenChange}
			/>
			<Button htmlType='submit' type='primary'>
				Сохранить
			</Button>
			{checkError ? <span>{checkError}</span> : null}
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
