export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
	uuid?: string;
};

export type TGetIngredientsDto = {
	success: boolean;
	data: TIngredient[];
};

export type TSendOrderArgs = {
	ingredients: string[];
};

export type TOrder = {
	number: number;
};

export type TSendOrderDto = {
	success: boolean;
	name: string;
	order: TOrder;
};
