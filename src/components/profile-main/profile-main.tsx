import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './profile-main.module.css';
import { AppDispatch, TUpdateUserParams } from '@/utils/types';
import { updateUser } from '@/services/actions/auth';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

export const ProfileMain = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const {
		name: oldName,
		email: oldEmail,
		error,
	} = useAppSelector((state) => state.auth);
	const [name, setName] = useState<string>(oldName ?? '');
	const [login, setLogin] = useState<string>(oldEmail ?? '');
	const [password, setPassword] = useState<string>('');

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setName(event.target.value);
	const handleLoginChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setLogin(event.target.value);
	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
		setPassword(event.target.value);

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		const params: TUpdateUserParams = { name, login, password };
		dispatch(updateUser(params));
	};

	const handleResetClick = (): void => {
		setName(oldName ?? '');
		setLogin(oldEmail ?? '');
		setPassword('');
	};

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<Input
				placeholder='Имя'
				value={name}
				icon='EditIcon'
				onChange={handleNameChange}
			/>
			<EmailInput
				placeholder='Логин'
				value={login}
				isIcon={true}
				onChange={handleLoginChange}
			/>
			<PasswordInput
				placeholder='Пароль'
				value={password}
				icon='EditIcon'
				onChange={handlePasswordChange}
			/>
			<Button htmlType='submit' type='primary'>
				Сохранить
			</Button>
			<Button htmlType='button' type='secondary' onClick={handleResetClick}>
				Отмена
			</Button>
			{error ? <span>{error}</span> : null}
		</form>
	);
};
