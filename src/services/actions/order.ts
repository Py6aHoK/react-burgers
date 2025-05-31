import { AppDispatch } from '@/main';
import { sendOrderRequest } from '@/utils/network';
import { TSendOrderDto, TSendOrderArgs } from '@/utils/types';

export const SEND_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const sendOrder =
	(ingredients: TSendOrderArgs) => async (dispatch: AppDispatch) => {
		dispatch({ type: SEND_ORDER_REQUEST });

		try {
			const { order, success }: TSendOrderDto =
				await sendOrderRequest(ingredients);
			if (success && order) {
				dispatch({ type: SEND_ORDER_SUCCESS, order });
				dispatch({ type: OPEN_ORDER_MODAL });
			} else {
				dispatch({ type: SEND_ORDER_ERROR });
			}
		} catch {
			dispatch({ type: SEND_ORDER_ERROR });
		}
	};
