import { TUserInfo } from '@/utils/types';
import {
	LOGIN_REQUEST,
	LOGIN,
	LOGOUT,
	UPDATE_USER_SUCCESS,
	LOGIN_ERROR,
} from '../actions/auth';

const initialState: TAuthReducerState = {
	isLoginChecked: false,
	isAuthorized: false,
	email: '',
	name: '',
	error: '',
};

export type TAuthReducerAction = {
	type: string;
	user: TUserInfo;
	error?: string;
};

type TAuthReducerState = {
	isLoginChecked: boolean;
	isAuthorized: boolean;
	email: string;
	name: string;
	error?: string;
};

export const authReducer = (
	state = initialState,
	action: TAuthReducerAction
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
				error: action.error,
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
		default: {
			return state;
		}
	}
};
