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

type TRegistrationReducerAction = {
	type: string;
	error: string;
};

export const registrationReducer = (
	state = registrationState,
	action: TRegistrationReducerAction
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
				error: action.error,
			};
		}
		default: {
			return state;
		}
	}
};
