import { ModalOverlay } from '@components/modal-overlay/modal-overlay.tsx';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalHeader } from '@components/modal/modal-header/modal-header.tsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Nullable } from '@/utils/types';

type TModalProps = {
	title?: string | ReactElement;
	closeHandler: () => void;
} & PropsWithChildren;

export const Modal = ({
	title,
	children,
	closeHandler,
}: TModalProps): Nullable<React.JSX.Element> => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeHandler();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [closeHandler]);

	const container: Nullable<HTMLElement> = document.getElementById(
		'modals-portal-container'
	);

	if (!container) return null;
	console.log('aaa');

	return createPortal(
		<div className={styles.modal}>
			<div
				className={`${styles.modal_wrapper} ${title ? 'pt-10 pb-15 pl-10 pr-10' : 'pt-30 pb-30 pl-25 pr-25'}`}>
				{title ? (
					<ModalHeader title={title} onClose={closeHandler} />
				) : (
					<button
						id='modalCloseButton'
						className={styles.close_button}
						onClick={closeHandler}>
						s
						<CloseIcon type='primary' />
					</button>
				)}
				{children}
			</div>
			<ModalOverlay onClose={closeHandler} />
		</div>,
		container
	);
};
