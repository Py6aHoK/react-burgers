import { sendOrderRequest } from '@/utils/network';
import { TSendOrderDto, TSendOrderArgs, AppDispatch } from '@/utils/types';
import { RESET } from './composer';

export const SEND_ORDER_REQUEST: string = 'GET_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: string = 'GET_ORDER_SUCCESS';
export const SEND_ORDER_ERROR: string = 'SEND_ORDER_ERROR';
export const OPEN_ORDER_MODAL: string = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL: string = 'CLOSE_ORDER_MODAL';

export const sendOrder =
	(ingredients: TSendOrderArgs) => async (dispatch: AppDispatch) => {
		dispatch({ type: SEND_ORDER_REQUEST });

		try {
			const { order }: TSendOrderDto = await sendOrderRequest(ingredients);
			if (order) {
				dispatch({ type: SEND_ORDER_SUCCESS, order });
				dispatch({ type: OPEN_ORDER_MODAL });
				dispatch({ type: RESET });
			} else {
				dispatch({ type: SEND_ORDER_ERROR });
			}
		} catch {
			dispatch({ type: SEND_ORDER_ERROR });
		}
	};
