import { TOrderInfo, TWSocketActions } from '@/utils/types';
import {
	SOCKET_CONNECTION_START,
	SOCKET_CONNECTION_SUCCESS,
	SOCKET_CONNECTION_ERROR,
	SOCKET_GET_MESSAGE,
	SOCKET_SEND_MESSAGE,
	SOCKET_CONNECTION_CLOSED,
	SOCKET_CONNECTION_CLOSE,
} from '../actions/socket';

export type TSocketState = {
	connected: boolean;
	orders: TOrderInfo[];
	total: number;
	totalToday: number;
	error?: Event;
};

export const socketInitialState: TSocketState = {
	connected: false,
	orders: [],
	total: 0,
	totalToday: 0,
};

type TSocketConnectionStart = {
	readonly type: typeof SOCKET_CONNECTION_START;
};

type TSocketConnectionSuccessAction = {
	readonly type: typeof SOCKET_CONNECTION_SUCCESS;
};

type TSocketConnectionErrorAction = {
	readonly type: typeof SOCKET_CONNECTION_ERROR;
	readonly payload: Event;
};

type TSocketGetMessageAction = {
	readonly type: typeof SOCKET_GET_MESSAGE;
	readonly payload: {
		orders: TOrderInfo[];
		total: number;
		totalToday: number;
	};
};

type TSocketSendMessageAction = {
	readonly type: typeof SOCKET_SEND_MESSAGE;
	readonly payload: {
		message: string;
	};
};

type TSocketConnectionCloseAction = {
	readonly type: typeof SOCKET_CONNECTION_CLOSE;
};

type TSocketConnectionClosedAction = {
	readonly type: typeof SOCKET_CONNECTION_CLOSED;
};

export const SocketPublicActions: TWSocketActions = {
	wsInit: SOCKET_CONNECTION_START,
	wsClose: SOCKET_CONNECTION_CLOSE,
	onOpen: SOCKET_CONNECTION_SUCCESS,
	onClose: SOCKET_CONNECTION_CLOSED,
	onError: SOCKET_CONNECTION_ERROR,
	onMessage: SOCKET_GET_MESSAGE,
};

export type TSocketActions =
	| TSocketConnectionStart
	| TSocketConnectionSuccessAction
	| TSocketConnectionErrorAction
	| TSocketConnectionCloseAction
	| TSocketConnectionClosedAction
	| TSocketGetMessageAction
	| TSocketSendMessageAction;

export const socketReducer = (
	state = socketInitialState,
	action: TSocketActions
): TSocketState => {
	switch (action.type) {
		case SOCKET_CONNECTION_START:
			return {
				...state,
				connected: false,
			};
		case SOCKET_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				connected: true,
			};
		case SOCKET_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				connected: false,
			};
		case SOCKET_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				connected: false,
			};
		case SOCKET_CONNECTION_CLOSE:
			return {
				...state,
			};
		case SOCKET_GET_MESSAGE:
			return {
				...state,
				error: undefined,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};
		default:
			return state;
	}
};
