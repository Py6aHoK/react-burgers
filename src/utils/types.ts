import { Action } from 'redux';
import { RootState } from '@/main';
import { ThunkDispatch } from 'redux-thunk';

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

type TResponseDto = {
	success: boolean;
};
type TResponseWithMessageDto = TResponseDto & {
	message: string;
};
type TWithToken = {
	token: string;
};
type TWithEmail = {
	email: string;
};
type TWithPassword = {
	password: string;
};
type TWithUser = {
	user: TUserInfo;
};
type TWithName = {
	name: string;
};
type TWithTokens = {
	accessToken: string;
	refreshToken: string;
};

export type TDispatchPropmiseVoid = (dispatch: AppDispatch) => Promise<void>;
export type TDispatchVoid = (dispatch: AppDispatch) => void;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;
export type Nullable<T> = T | null;

export type TGetIngredientsDto = {
	data: TIngredient[];
} & TResponseDto;

export type TSendOrderArgs = {
	ingredients: string[];
};

export type TOrder = {
	number: number;
};

export type TSendOrderDto = {
	order: TOrder;
} & TResponseDto &
	TWithName;

export type TUserInfo = {
	email: string;
	name: string;
};

export type TUpdateUserParams = {
	name?: string;
	login?: string;
	password?: string;
};

export type TRegisterUserParams = TLoginUserParams & TWithName;

export type TLoginUserParams = TWithEmail & TWithPassword;
export type TLogoutParams = TWithToken;
export type TResetPasswordInitParams = TWithEmail;
export type TResetPasswordCheckParams = TWithPassword & TWithToken;
export type TRefreshTokenParams = TWithToken;

export type TLogoutDto = TResponseWithMessageDto;
export type TRefreshTokenDto = TResponseWithMessageDto;
export type TResetPasswordInitDto = TResponseWithMessageDto;
export type TResetPasswordCheckDto = TResponseWithMessageDto;
export type TGetUserDto = TResponseDto & TWithUser;
export type TUpdatehUserDto = TResponseDto & TWithUser;
export type TLoginUserDto = TResponseDto & TWithUser & TWithTokens;
export type TRegisterUserDto = TResponseDto & TWithUser & TWithTokens;
