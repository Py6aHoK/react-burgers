import {
	RESET_PASSWORD_CHECK_FAILED,
	RESET_PASSWORD_CHECK_REQUEST,
	RESET_PASSWORD_CHECK_SUCCESS,
	RESET_PASSWORD_INIT_FAILED,
	RESET_PASSWORD_INIT_REQUEST,
	RESET_PASSWORD_INIT_SUCCESS,
} from '../actions/passwordReset';

const initialState: TPasswordResetReducerState = {
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

export type TPasswordResetReducerAction = {
	type: string;
	error?: string;
};

export const passwordResetReducer = (
	state = initialState,
	action: TPasswordResetReducerAction
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
		case RESET_PASSWORD_INIT_FAILED: {
			return {
				...state,
				isInitRequest: false,
				isInitRequested: false,
				initError: action.error,
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
		case RESET_PASSWORD_CHECK_FAILED: {
			return {
				...state,
				isCheckRequest: true,
				checkError: action.error,
			};
		}
		default: {
			return state;
		}
	}
};
