import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { register } from '@/services/actions/register';
import { AppDispatch, TRegisterUserParams } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

export const RegisterPage = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const { isAuthorized } = useAppSelector((state) => state.auth);
	const { error } = useAppSelector((state) => state.registration);
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		if (name == '' || email == '' || password == '') {
			return;
		}
		const params: TRegisterUserParams = { email, password, name };
		dispatch(register(params));
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setName(event.target.value);
	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setEmail(event.target.value);
	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setPassword(event.target.value);

	if (isAuthorized) {
		return <Navigate to={'/'} />;
	}

	return (
		<form onSubmit={onSubmit} className='form flex-center'>
			<span className='text_type_main-medium'>Регистрация</span>
			<Input value={name} placeholder='Имя' onChange={handleNameChange} />
			<EmailInput
				value={email}
				placeholder='E-mail'
				onChange={handleEmailChange}
			/>
			<PasswordInput value={password} onChange={handlePasswordChange} />
			<Button htmlType='submit' type='primary'>
				Зарегистрироваться
			</Button>
			{error ? <span>{error}</span> : null}
			<div className='mt-15'>
				<span className='text_type_main-default text_color_inactive pr-2'>
					Уже зарегистрированы?
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
