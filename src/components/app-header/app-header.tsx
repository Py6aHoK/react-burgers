import { Link, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = (): React.JSX.Element => {
	const { pathname } = useLocation();

	const normalizePath = (path: string): string => {
		if (path.startsWith('/profile')) return '/profile';
		if (path === '/feed' || path === '/') return path;
		return '';
	};

	const activeTab: string = normalizePath(pathname);
	const isMainTabActive: boolean = activeTab === '/';
	const isFeedTabActive: boolean = activeTab === '/feed';
	const isProfileTabActive: boolean = activeTab === '/profile';

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<Link
						to='/'
						className={`${styles.link} ${isMainTabActive ? styles.link_active : undefined}`}>
						<BurgerIcon type={isMainTabActive ? 'primary' : 'secondary'} />
						<p className='text text_type_main-default ml-2'>Конструктор</p>
					</Link>
					<Link
						to='/feed'
						className={`${styles.link} ${isFeedTabActive ? styles.link_active : undefined} ml-10`}>
						<ListIcon type={isFeedTabActive ? 'primary' : 'secondary'} />
						<p className='text text_type_main-default ml-2'>Лента заказов</p>
					</Link>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<Link
					to='/profile'
					className={`${styles.link} ${styles.link_position_last} ${isProfileTabActive ? styles.link_active : undefined}`}>
					<ProfileIcon type={isProfileTabActive ? 'primary' : 'secondary'} />
					<p className='text text_type_main-default ml-2'>Личный кабинет</p>
				</Link>
			</nav>
		</header>
	);
};
