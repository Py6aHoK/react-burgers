import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ReactElement } from 'react';

type TModalHeader = {
	title?: string | ReactElement;
	onClose: () => void;
};

export const ModalHeader = ({
	title,
	onClose,
}: TModalHeader): React.JSX.Element => {
	return (
		<div className={styles.modal_header}>
			<span className='text text_type_main-large'>{title}</span>
			<button className={styles.close_button} onClick={onClose}>
				<CloseIcon type='primary' />
			</button>
		</div>
	);
};
