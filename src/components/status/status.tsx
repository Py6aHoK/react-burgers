import { Nullable, TOrderStatus } from '@/utils/types';
import React from 'react';

type TStatusProps = {
	status: TOrderStatus;
	className?: string;
};

export const Status = ({
	status,
	className,
}: TStatusProps): Nullable<React.JSX.Element> => {
	if (status === 'created') {
		return (
			<div className={`${className} text_type_main-default mt-2 mb-6`}>
				Создан
			</div>
		);
	} else if (status === 'pending') {
		return (
			<div className={`${className} text_type_main-default mt-2 mb-6`}>
				Готовится
			</div>
		);
	} else if (status === 'done') {
		return (
			<div
				className={`${className} text_type_main-default mt-2 mb-6 text_color_success`}>
				Выполнен
			</div>
		);
	}
	return null;
};
