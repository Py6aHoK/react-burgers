import { TOrder } from '@/utils/types';
import {
	SEND_ORDER_ERROR,
	SEND_ORDER_REQUEST,
	SEND_ORDER_SUCCESS,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
} from '../actions/order';

const initialState: TOrderReducerState = {
	isModalOpen: false,
	orderRequest: false,
	orderRequestError: false,
	order: undefined,
};

type TOrderReducerState = {
	isModalOpen: boolean;
	orderRequest: boolean;
	orderRequestError: boolean;
	order?: TOrder;
};

type TOrdersReducerAction = {
	type: string;
	order: TOrder;
};

export const orderReducer = (
	state = initialState,
	action: TOrdersReducerAction
): TOrderReducerState => {
	switch (action.type) {
		case SEND_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
			};
		}
		case SEND_ORDER_SUCCESS: {
			return {
				...state,
				orderRequestError: false,
				order: action.order,
				orderRequest: false,
			};
		}
		case SEND_ORDER_ERROR: {
			return {
				...initialState,
				orderRequestError: true,
			};
		}
		case OPEN_ORDER_MODAL: {
			return {
				...state,
				isModalOpen: true,
			};
		}
		case CLOSE_ORDER_MODAL: {
			return {
				...state,
				isModalOpen: false,
			};
		}
		default: {
			return state;
		}
	}
};
