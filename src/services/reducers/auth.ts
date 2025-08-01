import { TUserInfo } from '@/utils/types';
import {
	LOGIN_REQUEST,
	LOGIN,
	LOGOUT,
	UPDATE_USER_SUCCESS,
	LOGIN_ERROR,
	UPDATE_USER_REQUEST,
	UPDATE_USER_ERROR,
	LOGOUT_REQUEST,
	LOGOUT_ERROR,
} from '../actions/auth';

const initialState: TAuthReducerState = {
	isLoginChecked: false,
	isAuthorized: false,
	email: '',
	name: '',
	error: '',
};

type TAuthReducerState = {
	isLoginChecked: boolean;
	isAuthorized: boolean;
	email: string;
	name: string;
	error?: string;
};

type TLoginRequestAction = {
	readonly type: typeof LOGIN_REQUEST;
};

type TLoginErrorAction = {
	readonly type: typeof LOGIN_ERROR;
	readonly error?: unknown;
};

type TLoginAction = {
	readonly type: typeof LOGIN;
	readonly user: TUserInfo;
};

type TUpdateUserAction = {
	readonly type: typeof UPDATE_USER_REQUEST;
};

type TUpdateUserErrorAction = {
	readonly type: typeof UPDATE_USER_ERROR;
	readonly error?: unknown;
};

type TUpdateUserSuccessAction = {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly user: TUserInfo;
};

type TLogoutAction = {
	readonly type: typeof LOGOUT;
};

type TLogoutRequestAction = {
	readonly type: typeof LOGOUT_REQUEST;
};

type TLogoutErrorAction = {
	readonly type: typeof LOGOUT_ERROR;
	readonly error?: unknown;
};

export type TAuthActions =
	| TLoginRequestAction
	| TLoginErrorAction
	| TLoginAction
	| TUpdateUserAction
	| TUpdateUserErrorAction
	| TUpdateUserSuccessAction
	| TLogoutAction
	| TLogoutErrorAction
	| TLogoutRequestAction;

export const authReducer = (
	state = initialState,
	action: TAuthActions
): TAuthReducerState => {
	switch (action.type) {
		case LOGIN_REQUEST: {
			return {
				...state,
				error: '',
			};
		}
		case LOGIN_ERROR: {
			return {
				...state,
				isAuthorized: false,
				isLoginChecked: true,
				email: '',
				name: '',
				error: action.error as string,
			};
		}
		case LOGIN: {
			return {
				...state,
				isAuthorized: true,
				isLoginChecked: true,
				email: action.user.email,
				name: action.user.name,
				error: '',
			};
		}
		case UPDATE_USER_SUCCESS: {
			return {
				...state,
				email: action.user.email,
				name: action.user.name,
			};
		}
		case LOGOUT: {
			return { ...initialState };
		}
		case UPDATE_USER_ERROR: {
			return {
				...state,
				error: action.error as string,
			};
		}
		case LOGOUT_ERROR: {
			return {
				...state,
				error: action.error as string,
			};
		}
		default: {
			return state;
		}
	}
};
