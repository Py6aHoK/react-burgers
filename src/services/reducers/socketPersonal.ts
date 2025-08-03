import { TOrderInfo, TWSocketActions } from '@/utils/types';
import {
	SOCKET_PERSONAL_CONNECTION_START,
	SOCKET_PERSONAL_CONNECTION_SUCCESS,
	SOCKET_PERSONAL_CONNECTION_ERROR,
	SOCKET_PERSONAL_GET_MESSAGE,
	SOCKET_PERSONAL_SEND_MESSAGE,
	SOCKET_PERSONAL_CONNECTION_CLOSED,
	SOCKET_PERSONAL_CONNECTION_CLOSE,
} from '../actions/socketPersonal';
import { initialState, TSocketState } from './socket';

type TSocketPersonalConnectionStart = {
	readonly type: typeof SOCKET_PERSONAL_CONNECTION_START;
};

type TSocketPersonalConnectionSuccessAction = {
	readonly type: typeof SOCKET_PERSONAL_CONNECTION_SUCCESS;
};

type TSocketPersonalConnectionErrorAction = {
	readonly type: typeof SOCKET_PERSONAL_CONNECTION_ERROR;
	readonly payload: Event;
};

type TSocketPersonalGetMessageAction = {
	readonly type: typeof SOCKET_PERSONAL_GET_MESSAGE;
	readonly payload: {
		orders: TOrderInfo[];
		total: number;
		totalToday: number;
	};
};

type TSocketPersonalSendMessageAction = {
	readonly type: typeof SOCKET_PERSONAL_SEND_MESSAGE;
	readonly payload: {
		message: string;
	};
};

type TSocketPersonalConnectionClosedAction = {
	readonly type: typeof SOCKET_PERSONAL_CONNECTION_CLOSED;
};

type TSocketPersonalConnectionCloseAction = {
	readonly type: typeof SOCKET_PERSONAL_CONNECTION_CLOSE;
};

export const SocketPersonalActions: TWSocketActions = {
	wsInit: SOCKET_PERSONAL_CONNECTION_START,
	wsClose: SOCKET_PERSONAL_CONNECTION_CLOSE,
	onOpen: SOCKET_PERSONAL_CONNECTION_SUCCESS,
	onClose: SOCKET_PERSONAL_CONNECTION_CLOSED,
	onError: SOCKET_PERSONAL_CONNECTION_ERROR,
	onMessage: SOCKET_PERSONAL_GET_MESSAGE,
};

export type TSocketPersonalActions =
	| TSocketPersonalConnectionStart
	| TSocketPersonalConnectionSuccessAction
	| TSocketPersonalConnectionErrorAction
	| TSocketPersonalConnectionClosedAction
	| TSocketPersonalConnectionCloseAction
	| TSocketPersonalGetMessageAction
	| TSocketPersonalSendMessageAction;

export const socketPersonalReducer = (
	state = initialState,
	action: TSocketPersonalActions
): TSocketState => {
	switch (action.type) {
		case SOCKET_PERSONAL_CONNECTION_START:
			return {
				...state,
				connected: false,
			};
		case SOCKET_PERSONAL_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				connected: true,
			};
		case SOCKET_PERSONAL_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				connected: false,
			};
		case SOCKET_PERSONAL_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				connected: false,
			};
		case SOCKET_PERSONAL_CONNECTION_CLOSE:
			return {
				...state,
			};
		case SOCKET_PERSONAL_GET_MESSAGE:
			return {
				...state,
				error: undefined,
				orders: action.payload.orders.sort((a, b) =>
					new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
				),
			};
		default:
			return state;
	}
};
