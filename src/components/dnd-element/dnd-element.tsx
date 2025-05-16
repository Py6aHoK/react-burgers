import styles from './dnd-element.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

type TDndConstructorElement = {
	text: string;
	thumbnail: string;
	price: number;
	type?: 'top' | 'bottom';
	isLocked?: boolean;
	extraClass?: string;
	handleClose?: () => void;
	className?: string;
};

export function DndConstructorElement(
	props: TDndConstructorElement
): React.JSX.Element {
	const { className, type, text, ...otherProps } = props;
	const suffix: string =
		type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '';

	return (
		<div className={`${styles.dnd_element} ${className} pl-8`}>
			{props.isLocked ? null : <DragIcon type='primary' />}
			<ConstructorElement {...otherProps} type={type} text={text + suffix} />
		</div>
	);
}
