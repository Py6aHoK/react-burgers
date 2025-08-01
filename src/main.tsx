import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { thunk } from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { SocketPublicActions } from './services/reducers/socket';
import { SocketPersonalActions } from './services/reducers/socketPersonal';
import { getCookie } from './utils/auth';
import { WEB_SOCKET_URL } from './utils/constants';

function getSocketUrl(isPersonal: boolean = false): string {
	if (isPersonal) {
		const token: string = getCookie('token') ?? '';
		return `${WEB_SOCKET_URL}/?token=${token}`;
	}
	return `${WEB_SOCKET_URL}/all`;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		socketMiddleware(getSocketUrl(), SocketPublicActions),
		socketMiddleware(getSocketUrl(true), SocketPersonalActions)
	)
);

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
