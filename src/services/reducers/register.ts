import {
	USER_REGISTRATION_FAILED,
	USER_REGISTRATION_REQUEST,
	USER_REGISTRATION_SUCCESS,
} from '../actions/register';

const registrationState: TRegistrationReducerState = {
	registrationRequest: false,
	registrationRequestFailed: false,
	email: '',
	name: '',
	password: '',
	accessToken: '',
	error: '',
};

type TRegistrationReducerState = {
	registrationRequest: boolean;
	registrationRequestFailed: boolean;
	email: string;
	name: string;
	password: string;
	accessToken: string;
	error: string;
};

type TUserRegistrationAction = {
	readonly type: typeof USER_REGISTRATION_REQUEST;
};

type TUserRegistrationSuccessAction = {
	readonly type: typeof USER_REGISTRATION_SUCCESS;
};

type TUserRegistrationFailesAction = {
	readonly type: typeof USER_REGISTRATION_FAILED;
	readonly error: unknown;
};

export type TRegistrationActions =
	| TUserRegistrationAction
	| TUserRegistrationSuccessAction
	| TUserRegistrationFailesAction;

export const registrationReducer = (
	state = registrationState,
	action: TRegistrationActions
): TRegistrationReducerState => {
	switch (action.type) {
		case USER_REGISTRATION_REQUEST: {
			return {
				...state,
				registrationRequest: true,
				registrationRequestFailed: false,
				error: '',
			};
		}
		case USER_REGISTRATION_SUCCESS: {
			return {
				...state,
				registrationRequest: false,
				registrationRequestFailed: false,
				error: '',
			};
		}
		case USER_REGISTRATION_FAILED: {
			return {
				...state,
				registrationRequestFailed: true,
				registrationRequest: false,
				error: action.error as string,
			};
		}
		default: {
			return state;
		}
	}
};
