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

export const RESET_PASSWORD_INIT_REQUEST =
	'RESET_PASSWORD_INIT_REQUEST' as const;
export const RESET_PASSWORD_INIT_SUCCESS =
	'RESET_PASSWORD_INIT_SUCCESS' as const;
export const RESET_PASSWORD_INIT_ERROR = 'RESET_PASSWORD_INIT_ERROR' as const;
export const RESET_PASSWORD_CHECK_REQUEST =
	'RESET_PASSWORD_CHECK_REQUEST' as const;
export const RESET_PASSWORD_CHECK_SUCCESS =
	'RESET_PASSWORD_CHECK_SUCCESS' as const;
export const RESET_PASSWORD_CHECK_ERROR = 'RESET_PASSWORD_CHECK_ERROR' as const;

export function resetPasswordInit(
	data: TResetPasswordInitParams
): TDispatchPropmiseVoid {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: RESET_PASSWORD_INIT_REQUEST });

		try {
			await sendResetPasswordInitRequest(data);
			dispatch({ type: RESET_PASSWORD_INIT_SUCCESS });
		} catch (error) {
			dispatch({ type: RESET_PASSWORD_INIT_ERROR, error });
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
			dispatch({ type: RESET_PASSWORD_CHECK_ERROR, error });
		}
	};
}
