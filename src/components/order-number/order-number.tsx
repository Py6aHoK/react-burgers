import React, { useEffect, useState } from 'react';

type TOrderNumberProps = {
	number: number;
	isDone?: boolean;
	className?: string;
};

export const OrderNumber = ({
	number,
	isDone = false,
	className,
}: TOrderNumberProps): React.JSX.Element => {
	const [formatedNumber, setFormatedNumber] = useState<string>('');

	useEffect(() => {
		if (number === undefined) {
			return;
		}
		setFormatedNumber(number.toString().padStart(6, '0'));
	}, [number]);

	return (
		<div
			className={`${className} text_type_digits-default ${isDone ? 'text_color_success' : ''}`}>
			#{formatedNumber}
		</div>
	);
};
