import { getToken, setCookie } from '@/utils/auth';
import { sendRegusterUserRequest } from '@/utils/network';
import {
	TRegisterUserParams,
	TRegisterUserDto,
	TDispatchPropmiseVoid,
	AppDispatch,
} from '@/utils/types';
import { LOGIN } from './auth';

export const USER_REGISTRATION_REQUEST: string = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS: string = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED: string = 'USER_REGISTRATION_FAILED';

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
