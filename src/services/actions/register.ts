import { getToken, setCookie } from '@/utils/auth';
import { sendRegusterUserRequest } from '@/utils/network';
import {
	TRegisterUserParams,
	TRegisterUserDto,
	TDispatchPropmiseVoid,
	AppDispatch,
} from '@/utils/types';
import { LOGIN } from './auth';

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST' as const;
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS' as const;
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED' as const;

export function register(data: TRegisterUserParams): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: USER_REGISTRATION_REQUEST });

		try {
			const response: TRegisterUserDto = await sendRegusterUserRequest(data);
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			dispatch({ type: USER_REGISTRATION_SUCCESS });
			dispatch({ type: LOGIN, user: response.user });
		} catch (error) {
			dispatch({ type: USER_REGISTRATION_FAILED, error });
		}
	};
}
