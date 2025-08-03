import {
	RESET_PASSWORD_CHECK_ERROR,
	RESET_PASSWORD_CHECK_REQUEST,
	RESET_PASSWORD_CHECK_SUCCESS,
	RESET_PASSWORD_INIT_ERROR,
	RESET_PASSWORD_INIT_REQUEST,
	RESET_PASSWORD_INIT_SUCCESS,
} from '../actions/passwordReset';

export const passwordResetInitialState: TPasswordResetReducerState = {
	isInitRequest: false,
	isInitRequested: false,
	initError: '',
	isCheckRequest: false,
	checkError: '',
};

type TPasswordResetReducerState = {
	isInitRequest: boolean;
	isInitRequested: boolean;
	initError?: string;
	isCheckRequest: boolean;
	checkError?: string;
};

type TResetPasswordInitAction = {
	readonly type: typeof RESET_PASSWORD_INIT_REQUEST;
};

type TResetPasswordInitSuccessAction = {
	readonly type: typeof RESET_PASSWORD_INIT_SUCCESS;
};

type TResetPasswordInitErrorAction = {
	readonly type: typeof RESET_PASSWORD_INIT_ERROR;
	readonly error: unknown;
};

type TResetPasswordCheckAction = {
	readonly type: typeof RESET_PASSWORD_CHECK_REQUEST;
};

type TResetPasswordCheckSuccessAction = {
	readonly type: typeof RESET_PASSWORD_CHECK_SUCCESS;
};

type TResetPasswordCheckErrorAction = {
	readonly type: typeof RESET_PASSWORD_CHECK_ERROR;
	readonly error: unknown;
};

export type TPasswordResetActions =
	| TResetPasswordInitAction
	| TResetPasswordInitSuccessAction
	| TResetPasswordInitErrorAction
	| TResetPasswordCheckAction
	| TResetPasswordCheckSuccessAction
	| TResetPasswordCheckErrorAction;

export const passwordResetReducer = (
	state = passwordResetInitialState,
	action: TPasswordResetActions
): TPasswordResetReducerState => {
	switch (action.type) {
		case RESET_PASSWORD_INIT_REQUEST: {
			return {
				...state,
				isInitRequest: true,
				isInitRequested: false,
				initError: '',
			};
		}
		case RESET_PASSWORD_INIT_SUCCESS: {
			return {
				...state,
				isInitRequest: false,
				isInitRequested: true,
				initError: '',
			};
		}
		case RESET_PASSWORD_INIT_ERROR: {
			return {
				...state,
				isInitRequest: false,
				isInitRequested: false,
				initError: action.error as string,
			};
		}
		case RESET_PASSWORD_CHECK_REQUEST: {
			return {
				...state,
				isCheckRequest: true,
				checkError: '',
			};
		}
		case RESET_PASSWORD_CHECK_SUCCESS: {
			return {
				...state,
				isCheckRequest: true,
				checkError: '',
			};
		}
		case RESET_PASSWORD_CHECK_ERROR: {
			return {
				...state,
				isCheckRequest: true,
				checkError: action.error as string,
			};
		}
		default: {
			return state;
		}
	}
};
