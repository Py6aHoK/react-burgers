import styles from './dnd-element.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { RefObject, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT } from '@/services/actions/composer';
import { useAppDispatch } from '@/utils/hooks';
import { AppDispatch, Nullable } from '@/utils/types';

type TDndConstructorElement = {
	index?: number;
	text: string;
	thumbnail: string;
	price: number;
	type?: 'top' | 'bottom';
	isLocked?: boolean;
	extraClass?: string;
	handleClose?: () => void;
	className?: string;
	moveItem?: (dragIndex: number, hoverIndex: number) => void;
};
type DragItem = {
	index: number;
};

export const DndConstructorElement = (
	props: TDndConstructorElement
): React.JSX.Element => {
	const { moveItem, className, type, text, index, ...otherProps } = props;
	const suffix: string =
		type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '';

	const dispatch: AppDispatch = useAppDispatch();
	const ref: RefObject<HTMLDivElement> = useRef<Nullable<HTMLDivElement>>(null);

	const [, drop] = useDrop<DragItem>({
		accept: 'item',
		hover(item) {
			if (item.index === index || index == undefined || !moveItem) return;
			moveItem(item.index, index);
			item.index = index;
		},
	});

	const [, drag] = useDrag({
		type: 'item',
		item: { index },
	});

	drag(drop(ref));

	return (
		<div ref={ref} className={`${styles.dnd_element} ${className} pl-8`}>
			{props.isLocked ? null : <DragIcon type='primary' />}
			<ConstructorElement
				{...otherProps}
				type={type}
				text={text + suffix}
				handleClose={() =>
					dispatch({ type: DELETE_INGREDIENT, actoion: { index } })
				}
			/>
		</div>
	);
};
