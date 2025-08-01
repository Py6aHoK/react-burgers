import { RootState } from '@/main';
import { ThunkDispatch } from 'redux-thunk';
import { TComposerActions } from '@/services/reducers/composer';
import { TAppActions } from '@/services/reducers/app';
import { TAuthActions } from '@/services/reducers/auth';
import { TIngredientInfoActions } from '@/services/reducers/ingredientInfo';
import { TOrderActions } from '@/services/reducers/order';
import { TPasswordResetActions } from '@/services/reducers/passwordReset';
import { TRegistrationActions } from '@/services/reducers/register';
import { TTabsActions } from '@/services/reducers/tabs';
import { TSocketActions } from '@/services/reducers/socket';
import {
	SOCKET_CONNECTION_CLOSE,
	SOCKET_CONNECTION_CLOSED,
	SOCKET_CONNECTION_ERROR,
	SOCKET_CONNECTION_START,
	SOCKET_CONNECTION_SUCCESS,
	SOCKET_GET_MESSAGE,
} from '@/services/actions/socket';
import {
	SOCKET_PERSONAL_CONNECTION_CLOSE,
	SOCKET_PERSONAL_CONNECTION_CLOSED,
	SOCKET_PERSONAL_CONNECTION_ERROR,
	SOCKET_PERSONAL_CONNECTION_START,
	SOCKET_PERSONAL_CONNECTION_SUCCESS,
	SOCKET_PERSONAL_GET_MESSAGE,
} from '@/services/actions/socketPersonal';
import { TSocketPersonalActions } from '@/services/reducers/socketPersonal';

export type TOrderStatus = 'created' | 'pending' | 'done';

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

export type TOrderInfo = {
	ingredients: string[];
	_id: string;
	status: TOrderStatus;
	name: string;
	number: number;
	createdAt: string;
	updatedAt: string;
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

export type TWSocketActions = {
	wsInit:
		| typeof SOCKET_CONNECTION_START
		| typeof SOCKET_PERSONAL_CONNECTION_START;
	wsClose:
		| typeof SOCKET_CONNECTION_CLOSE
		| typeof SOCKET_PERSONAL_CONNECTION_CLOSE;
	onOpen:
		| typeof SOCKET_CONNECTION_SUCCESS
		| typeof SOCKET_PERSONAL_CONNECTION_SUCCESS;
	onClose:
		| typeof SOCKET_CONNECTION_CLOSED
		| typeof SOCKET_PERSONAL_CONNECTION_CLOSED;
	onError:
		| typeof SOCKET_CONNECTION_ERROR
		| typeof SOCKET_PERSONAL_CONNECTION_ERROR;
	onMessage: typeof SOCKET_GET_MESSAGE | typeof SOCKET_PERSONAL_GET_MESSAGE;
};

export type AppActions =
	| TAppActions
	| TAuthActions
	| TComposerActions
	| TIngredientInfoActions
	| TOrderActions
	| TPasswordResetActions
	| TRegistrationActions
	| TTabsActions
	| TSocketActions
	| TSocketPersonalActions;

export type TDispatchPropmiseVoid = (dispatch: AppDispatch) => Promise<void>;
export type TDispatchVoid = (dispatch: AppDispatch) => void;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type Nullable<T> = T | null;

export type TGetIngredientsDto = {
	data: TIngredient[];
} & TResponseDto;

export type TSendOrderArgs = {
	ingredients: string[];
};

export type TSendGetOrderInfoArgs = {
	id: string;
};

export type TOrder = {
	number: number;
};

export type TSendOrderDto = {
	order: TOrder;
} & TResponseDto &
	TWithName;

export type TSendGetOrderInfoDto = {
	orders: TOrderInfo[];
};

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
