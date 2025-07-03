import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { login } from '@/services/actions/auth';
import { AppDispatch, TLoginUserParams } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

export const LoginPage = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const { isAuthorized } = useAppSelector((state) => state.auth);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { error } = useAppSelector((state) => state.auth);

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		if (email == '' || password == '') {
			return;
		}
		const params: TLoginUserParams = { email, password };
		dispatch(login(params));
	};

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setEmail(event.target.value);

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setPassword(event.target.value);

	if (isAuthorized) {
		return <Navigate to={'/'} />;
	}

	return (
		<form onSubmit={onSubmit} className='form flex-center'>
			<span className='text_type_main-medium'>Вход</span>
			<EmailInput
				value={email}
				placeholder='E-mail'
				onChange={handleEmailChange}
			/>
			<PasswordInput value={password} onChange={handlePasswordChange} />
			<Button htmlType='submit' type='primary'>
				Войти
			</Button>
			{error ? <span>{error}</span> : null}
			<div className={`${styles.buttons} mt-15`}>
				<div className='mb-4'>
					<span className='text_type_main-default text_color_inactive pr-2'>
						Вы — новый пользователь?
					</span>
					<Link to='/register'>
						<Button htmlType='button' type='secondary' size='medium'>
							Зарегистрироваться
						</Button>
					</Link>
				</div>
				<div>
					<span className='text_type_main-default text_color_inactive pr-2'>
						Забыли пароль?
					</span>
					<Link to='/forgot-password'>
						<Button htmlType='button' type='secondary' size='medium'>
							Восстановить пароль
						</Button>
					</Link>
				</div>
			</div>
		</form>
	);
};
