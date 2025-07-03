import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { thunk } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
