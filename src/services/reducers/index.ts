import { combineReducers } from 'redux';
import { composerReducer } from './composer';
import { ingredientInfoReducer } from './ingredientInfo';
import { appReducer } from './app';
import { orderReducer } from './order';
import { tabsReducer } from './tabs';
import { authReducer } from './auth';
import { passwordResetReducer } from './passwordReset';
import { registrationReducer } from './register';
import { socketReducer } from './socket';
import { socketPersonalReducer } from './socketPersonal';

export const rootReducer = combineReducers({
	composer: composerReducer,
	ingredientInfo: ingredientInfoReducer,
	app: appReducer,
	order: orderReducer,
	tabs: tabsReducer,
	auth: authReducer,
	passwordReset: passwordResetReducer,
	registration: registrationReducer,
	socket: socketReducer,
	socketPersonal: socketPersonalReducer,
});
