import { sendGetOrderInfoRequest, sendOrderRequest } from '@/utils/network';
import {
	TSendOrderDto,
	TSendOrderArgs,
	AppDispatch,
	TSendGetOrderInfoDto,
} from '@/utils/types';
import { RESET } from './composer';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST' as const;
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS' as const;
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR' as const;
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL' as const;
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL' as const;
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST' as const;
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS' as const;
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED' as const;

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

export const getOrder = (id: string) => async (dispatch: AppDispatch) => {
	dispatch({ type: GET_ORDER_REQUEST });
	try {
		const { orders }: TSendGetOrderInfoDto = await sendGetOrderInfoRequest({
			id,
		});
		dispatch({
			type: GET_ORDER_SUCCESS,
			order: orders[0],
		});
	} catch {
		dispatch({
			type: GET_ORDER_FAILED,
		});
	}
};
