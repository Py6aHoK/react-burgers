import {
	sendResetPasswordCheckRequest,
	sendResetPasswordInitRequest,
} from '@/utils/network';
import {
	AppDispatch,
	TDispatchPropmiseVoid,
	TResetPasswordCheckParams,
	TResetPasswordInitParams,
} from '@/utils/types';

export const RESET_PASSWORD_INIT_REQUEST: string =
	'RESET_PASSWORD_INIT_REQUEST';
export const RESET_PASSWORD_INIT_SUCCESS: string =
	'RESET_PASSWORD_INIT_SUCCESS';
export const RESET_PASSWORD_INIT_FAILED: string = 'RESET_PASSWORD_INIT_FAILED';
export const RESET_PASSWORD_CHECK_REQUEST: string =
	'RESET_PASSWORD_CHECK_REQUEST';
export const RESET_PASSWORD_CHECK_SUCCESS: string =
	'RESET_PASSWORD_CHECK_SUCCESS';
export const RESET_PASSWORD_CHECK_FAILED: string =
	'RESET_PASSWORD_CHECK_FAILED';

export function resetPasswordInit(
	data: TResetPasswordInitParams
): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: RESET_PASSWORD_INIT_REQUEST });

		try {
			await sendResetPasswordInitRequest(data);
			dispatch({ type: RESET_PASSWORD_INIT_SUCCESS });
		} catch (error) {
			dispatch({ type: RESET_PASSWORD_INIT_FAILED, error });
		}
	};
}

export function resetPasswordCheck(
	data: TResetPasswordCheckParams
): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: RESET_PASSWORD_CHECK_REQUEST });

		try {
			await sendResetPasswordCheckRequest(data);
			dispatch({ type: RESET_PASSWORD_CHECK_SUCCESS });
		} catch (error) {
			dispatch({ type: RESET_PASSWORD_CHECK_FAILED, error });
		}
	};
}
