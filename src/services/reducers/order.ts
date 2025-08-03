import { TOrder, TOrderInfo } from '@/utils/types';
import {
	SEND_ORDER_ERROR,
	SEND_ORDER_REQUEST,
	SEND_ORDER_SUCCESS,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILED,
	OPEN_ORDER_DETAILS_MODAL,
	CLOSE_ORDER_DETAILS_MODAL,
} from '../actions/order';

const initialState: TOrderReducerState = {
	isModalOpen: false,
	orderRequest: false,
	orderRequestError: false,
	order: undefined,
	getOrderRequest: false,
	getOrderRequestError: false,
	orderInfo: undefined,
	modalObject: undefined,
};

type TOrderReducerState = {
	isModalOpen: boolean;
	orderRequest: boolean;
	orderRequestError: boolean;
	order?: TOrder;
	getOrderRequest: boolean;
	getOrderRequestError: boolean;
	orderInfo?: TOrderInfo;
	modalObject?: TOrderInfo;
};

type TSendOrderAction = {
	readonly type: typeof SEND_ORDER_REQUEST;
};

type TSendOrderSuccessAction = {
	readonly type: typeof SEND_ORDER_SUCCESS;
	readonly order: TOrder;
};

type TSendOrderErrorAction = {
	readonly type: typeof SEND_ORDER_ERROR;
};

type TOpenOrderModalAction = {
	readonly type: typeof OPEN_ORDER_MODAL;
};

type TCloseOrderModalAction = {
	readonly type: typeof CLOSE_ORDER_MODAL;
};

type TOpenOrderDetailsModalAction = {
	readonly type: typeof OPEN_ORDER_DETAILS_MODAL;
	readonly object: TOrderInfo;
};

type TCloseOrderDetailsModalAction = {
	readonly type: typeof CLOSE_ORDER_DETAILS_MODAL;
};

type TGetOrderAction = {
	readonly type: typeof GET_ORDER_REQUEST;
};

type TGetOrderSuccessAction = {
	readonly type: typeof GET_ORDER_SUCCESS;
	readonly order: TOrderInfo;
};

type TGetOrderErrorAction = {
	readonly type: typeof GET_ORDER_FAILED;
};

export type TOrderActions =
	| TSendOrderAction
	| TSendOrderSuccessAction
	| TSendOrderErrorAction
	| TOpenOrderModalAction
	| TCloseOrderModalAction
	| TOpenOrderDetailsModalAction
	| TCloseOrderDetailsModalAction
	| TGetOrderAction
	| TGetOrderSuccessAction
	| TGetOrderErrorAction;

export const orderReducer = (
	state = initialState,
	action: TOrderActions
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
		case OPEN_ORDER_DETAILS_MODAL: {
			return {
				...state,
				modalObject: action.object,
			};
		}
		case CLOSE_ORDER_DETAILS_MODAL: {
			return {
				...state,
				modalObject: undefined,
			};
		}
		case GET_ORDER_REQUEST: {
			return {
				...state,
				getOrderRequest: true,
				getOrderRequestError: false,
				orderInfo: undefined,
			};
		}
		case GET_ORDER_SUCCESS: {
			return {
				...state,
				getOrderRequest: false,
				getOrderRequestError: false,
				orderInfo: action.order,
			};
		}
		case GET_ORDER_FAILED: {
			return {
				...state,
				getOrderRequestError: true,
				getOrderRequest: false,
				orderInfo: undefined,
			};
		}
		default: {
			return state;
		}
	}
};
