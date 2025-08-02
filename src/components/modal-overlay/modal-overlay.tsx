import styles from './modal-overlay.module.css';
import React from 'react';

type TModalOverlayProps = {
	onClose: () => void;
};

export const ModalOverlay = ({
	onClose,
}: TModalOverlayProps): React.JSX.Element => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div id='modalOverlay' onClick={onClose} className={styles.modal_overlay} />
	);
};
