import { combineReducers } from 'redux';
import { composerReducer } from './composer';
import { ingredientInfoReducer } from './ingredientInfo';
import { appReducer } from './app';
import { orderReducer } from './order';
import { tabsReducer } from './tabs';

export const rootReducer = combineReducers({
	composer: composerReducer,
	ingredientInfo: ingredientInfoReducer,
	app: appReducer,
	order: orderReducer,
	tabs: tabsReducer,
});
