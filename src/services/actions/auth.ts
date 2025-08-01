import { deleteCookie, getCookie, getToken, setCookie } from '@/utils/auth';
import {
	sendGetUserRequest,
	sendLoginUserRequest,
	sendLogoutRequest,
	sendRefreshTokenRequest,
	sendUpdateUserRequest,
} from '@/utils/network';
import {
	AppDispatch,
	TDispatchPropmiseVoid,
	TDispatchVoid,
	TGetUserDto,
	TLoginUserDto,
	TLoginUserParams,
	TLogoutParams,
	TRefreshTokenParams,
	TUpdatehUserDto,
	TUpdateUserParams,
} from '@/utils/types';

export const LOGIN = 'LOGIN' as const;
export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_ERROR = 'LOGIN_REQUEST_ERROR' as const;
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST' as const;
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS' as const;
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR' as const;
export const LOGOUT = 'LOGOUT' as const;
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_ERROR = 'LOGOUT_ERROR' as const;

export function getUser(): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: LOGIN_REQUEST });

		const _sendGetUserRequest = async (): Promise<void> => {
			const response: TGetUserDto = await sendGetUserRequest();
			dispatch({ type: LOGIN, user: response.user });
		};

		try {
			await _sendGetUserRequest();
		} catch (error) {
			const isTokenExpired: boolean =
				typeof error === 'string' && error.includes('expire');

			if (isTokenExpired) {
				const refreshToken: string | undefined = getCookie('refreshToken');
				if (refreshToken) {
					try {
						const params: TRefreshTokenParams = { token: refreshToken };
						await sendRefreshTokenRequest(params);
						await _sendGetUserRequest();
						return;
					} catch {
						// игнорируем ошибку, чтобы продолжить выполнение функции и вызвать событие LOGIN_ERROR
					}
				}
			}

			dispatch({ type: LOGIN_ERROR });
		}
	};
}

export function login(params: TLoginUserParams): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: LOGIN_REQUEST });

		try {
			const response: TLoginUserDto = await sendLoginUserRequest(params);
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			dispatch({ type: LOGIN, user: response.user });
		} catch (error) {
			dispatch({ type: LOGIN_ERROR, error });
		}
	};
}

export function logout(): TDispatchVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: LOGOUT_REQUEST });

		try {
			const refreshToken: string | undefined = getCookie('refreshToken');
			if (refreshToken) {
				const params: TLogoutParams = {
					token: refreshToken,
				};
				await sendLogoutRequest(params);
			}
			deleteCookie('refreshToken');
			deleteCookie('token');
			dispatch({ type: LOGOUT });
		} catch (error) {
			dispatch({ type: LOGOUT_ERROR, error });
		}
	};
}

export function updateUser(params: TUpdateUserParams): TDispatchVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: UPDATE_USER_REQUEST });

		try {
			const response: TUpdatehUserDto = await sendUpdateUserRequest(params);
			dispatch({ type: UPDATE_USER_SUCCESS, user: response.user });
		} catch (error) {
			dispatch({ type: UPDATE_USER_ERROR, error });
		}
	};
}
