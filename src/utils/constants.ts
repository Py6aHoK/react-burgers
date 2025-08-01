export const API_URL: string = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_ENDPOINT: string = '/ingredients';
export const ORDERS_ENPOINT: string = '/orders';
export const PASSWORD_RESET_INIT_ENPOINT: string = '/password-reset';
export const PASSWORD_RESET_CHECK_ENPOINT: string = '/password-reset/reset';
export const REGISTER_ENPOINT: string = '/auth/register';
export const USER_ENPOINT: string = '/auth/user';
export const LOGIN_ENPOINT: string = '/auth/login';
export const LOGOUT_ENPOINT: string = '/auth/logout';
export const TOKEN_ENPOINT: string = '/auth/token';
export const WEB_SOCKET_URL: string = 'wss://norma.nomoreparties.space/orders';

export enum HTTPMethods {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
}
export const MAX_ROWS_PER_BLOCK: number = 10;
