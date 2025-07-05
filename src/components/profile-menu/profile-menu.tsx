import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '@/services/actions/auth';
import styles from './profile-menu.module.css';
import { useAppDispatch } from '@/utils/hooks';
import { AppDispatch } from '@/utils/types';

export const ProfileMenu = (): React.JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const { pathname } = useLocation();

	const hintText: string =
		pathname === '/profile'
			? 'В этом разделе вы можете изменить свои персональные данные'
			: 'В этом разделе вы можете просмотреть свою историю заказов';

	const handleLogoutClick = (): void => {
		dispatch(logout());
	};

	return (
		<div className={styles.wrapper}>
			<NavLink
				to={'/profile'}
				className={({ isActive }) =>
					`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.link} ${isActive ? styles.active : ''}`
				}
				end>
				Профиль
			</NavLink>
			<NavLink
				to={'/profile/orders'}
				className={({ isActive }) =>
					`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.link} ${isActive ? styles.active : ''}`
				}
				end>
				История заказов
			</NavLink>
			<button
				className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.link}`}
				onClick={handleLogoutClick}>
				Выход
			</button>
			<p className='pt-20 text text_type_main-default text_color_inactive'>
				{hintText}
			</p>
		</div>
	);
};
