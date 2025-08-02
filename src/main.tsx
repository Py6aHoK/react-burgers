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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		socketMiddleware(SocketPublicActions),
		socketMiddleware(SocketPersonalActions)
	)
);

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
