import { RootState } from '@/main';
import {
	AppActions,
	AppDispatch,
	Nullable,
	TWSocketActions,
} from '@/utils/types';
import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = (
	url: string,
	actions: TWSocketActions
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = actions;
		let socket: Nullable<WebSocket> = null;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;

			if (action.type === wsInit) {
				socket = new WebSocket(url);
			}
			if (socket && action.type === wsClose) {
				socket.close();
			}
			if (socket) {
				socket.onopen = (event: Event) =>
					dispatch({ type: onOpen, payload: event });
				socket.onerror = (event: Event) =>
					dispatch({ type: onError, payload: event });
				socket.onclose = (event: Event) =>
					dispatch({ type: onClose, payload: event });
				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData; // eslint-disable-line @typescript-eslint/no-unused-vars
					dispatch({ type: onMessage, payload: { ...restParsedData } });
				};
			}
			next(action);
		};
	}) as Middleware;
};
