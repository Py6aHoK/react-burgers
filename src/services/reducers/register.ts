import {
	USER_REGISTRATION_FAILED,
	USER_REGISTRATION_REQUEST,
	USER_REGISTRATION_SUCCESS,
} from '../actions/register';

const registrationState = {
	registrationRequest: false,
	registrationRequestFailed: false,
	email: '',
	name: '',
	password: '',
	accessToken: '',
	error: '',
};

type TRegistrationReducerAction = {
	type: string;
	error: string;
};

export const registrationReducer = (
	state = registrationState,
	action: TRegistrationReducerAction
) => {
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
