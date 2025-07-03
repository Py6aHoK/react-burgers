import { Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { ProfileMenu } from '@/components/profile-menu/profile-menu';

export const ProfilePage = (): React.JSX.Element => {
	return (
		<div className={`${styles['profile-page']} mt-30`}>
			<ProfileMenu />
			<Outlet />
		</div>
	);
};
