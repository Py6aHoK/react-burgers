import {
	API_URL,
	HTTPMethods,
	INGREDIENTS_ENDPOINT,
	LOGIN_ENPOINT,
	LOGOUT_ENPOINT,
	ORDERS_ENPOINT,
	PASSWORD_RESET_CHECK_ENPOINT,
	PASSWORD_RESET_INIT_ENPOINT,
	REGISTER_ENPOINT,
	TOKEN_ENPOINT,
	USER_ENPOINT,
} from '@/utils/constants';
import {
	TGetIngredientsDto,
	TGetUserDto,
	TLoginUserDto,
	TLoginUserParams,
	TUpdatehUserDto,
	TRegisterUserDto,
	TRegisterUserParams,
	TResetPasswordCheckDto,
	TResetPasswordCheckParams,
	TResetPasswordInitDto,
	TResetPasswordInitParams,
	TSendOrderArgs,
	TSendOrderDto,
	TUpdateUserParams,
	TLogoutParams,
	TLogoutDto,
	TRefreshTokenParams,
	TRefreshTokenDto,
	TSendGetOrderInfoArgs,
	TSendGetOrderInfoDto,
} from './types';
import { getCookie } from './auth';

async function sendRequest<T>(
	endpoint: string,
	method: HTTPMethods = HTTPMethods.GET,
	body?: string,
	additionalCookies?: Record<string, string>
): Promise<T> {
	const response: Response = await fetch(`${API_URL}${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...additionalCookies,
		},
		body,
	});
	const data = await response.json();
	if (response.ok) {
		if (data?.success) {
			return data as T;
		}
		throw data;
	}
	throw data?.message ?? response.status.toString();
}

async function sendAuthRequest<T>(
	endpoint: string,
	method: HTTPMethods = HTTPMethods.GET,
	body?: string
): Promise<T> {
	const additionalCookies: Record<string, string> = {
		Authorization: 'Bearer ' + getCookie('token'),
	};
	return sendRequest<T>(endpoint, method, body, additionalCookies);
}

export async function sendGetIngredientsRequest(): Promise<TGetIngredientsDto> {
	const endpoint: string = INGREDIENTS_ENDPOINT;
	return sendRequest<TGetIngredientsDto>(endpoint);
}

export async function sendOrderRequest(
	params: TSendOrderArgs
): Promise<TSendOrderDto> {
	const endpoint: string = ORDERS_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendAuthRequest<TSendOrderDto>(endpoint, HTTPMethods.POST, body);
}

export async function sendGetOrderInfoRequest(
	params: TSendGetOrderInfoArgs
): Promise<TSendGetOrderInfoDto> {
	const endpoint: string = `${ORDERS_ENPOINT}/${params.id}`;
	return sendRequest<TSendGetOrderInfoDto>(endpoint, HTTPMethods.GET);
}

export async function sendGetUserRequest(): Promise<TGetUserDto> {
	const endpoint: string = USER_ENPOINT;
	return sendAuthRequest<TGetUserDto>(endpoint);
}

export async function sendUpdateUserRequest(
	params: TUpdateUserParams
): Promise<TUpdatehUserDto> {
	const endpoint: string = USER_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendAuthRequest<TUpdatehUserDto>(endpoint, HTTPMethods.PATCH, body);
}

export async function sendRegusterUserRequest(
	params: TRegisterUserParams
): Promise<TRegisterUserDto> {
	const endpoint: string = REGISTER_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TRegisterUserDto>(endpoint, HTTPMethods.POST, body);
}

export async function sendLoginUserRequest(
	params: TLoginUserParams
): Promise<TLoginUserDto> {
	const endpoint: string = LOGIN_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TLoginUserDto>(endpoint, HTTPMethods.POST, body);
}

export async function sendResetPasswordInitRequest(
	params: TResetPasswordInitParams
): Promise<TResetPasswordInitDto> {
	const endpoint: string = PASSWORD_RESET_INIT_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TResetPasswordInitDto>(endpoint, HTTPMethods.POST, body);
}

export async function sendResetPasswordCheckRequest(
	params: TResetPasswordCheckParams
): Promise<TResetPasswordCheckDto> {
	const endpoint: string = PASSWORD_RESET_CHECK_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TResetPasswordCheckDto>(endpoint, HTTPMethods.POST, body);
}

export async function sendLogoutRequest(
	params: TLogoutParams
): Promise<TLogoutDto> {
	const endpoint: string = LOGOUT_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TLogoutDto>(endpoint, HTTPMethods.POST, body);
}

export async function sendRefreshTokenRequest(
	params: TRefreshTokenParams
): Promise<TRefreshTokenDto> {
	const endpoint: string = TOKEN_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TRefreshTokenDto>(endpoint, HTTPMethods.POST, body);
}
