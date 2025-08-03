import { RootState } from '@/main';
import { getCookie } from '@/utils/auth';
import { WEB_SOCKET_URL } from '@/utils/constants';
import {
	AppActions,
	AppDispatch,
	Nullable,
	TWSocketActions,
} from '@/utils/types';
import { Middleware, MiddlewareAPI } from 'redux';
import { SOCKET_PERSONAL_CONNECTION_START } from '../actions/socketPersonal';
import { getUser } from '../actions/auth';

function getSocketUrl(isPersonal: boolean = false): string {
	if (isPersonal) {
		const token: string = getCookie('token') ?? '';
		return `${WEB_SOCKET_URL}?token=${token}`;
	}
	return `${WEB_SOCKET_URL}/all`;
}

export const socketMiddleware = (actions: TWSocketActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = actions;
		let socket: Nullable<WebSocket> = null;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;

			if (action.type === wsInit) {
				const url: string = getSocketUrl(
					wsInit === SOCKET_PERSONAL_CONNECTION_START
				);
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
					if (!success) {
						dispatch({ type: onError, payload: { ...restParsedData } });
						if (restParsedData.message === 'Invalid or missing token') {
							dispatch(getUser());
						}
					} else {
						dispatch({ type: onMessage, payload: { ...restParsedData } });
					}
				};
			}
			next(action);
		};
	}) as Middleware;
};
