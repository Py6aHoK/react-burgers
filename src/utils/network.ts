import {
	API_URL,
	HTTPMethods,
	INGREDIENTS_ENDPOINT,
	ORDERS_ENPOINT,
} from '@/utils/constants';
import { TGetIngredientsDto, TSendOrderArgs, TSendOrderDto } from './types';

async function sendRequest<T>(
	endpoint: string,
	method: HTTPMethods = HTTPMethods.GET,
	body?: string
): Promise<T> {
	const response: Response = await fetch(`${API_URL}${endpoint}`, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body,
	});
	if (response.ok) {
		return (await response.json()) as T;
	}
	throw new Error(response.status.toString());
}

export async function sendGetIngredientsRequest(): Promise<TGetIngredientsDto> {
	const url: string = INGREDIENTS_ENDPOINT;
	return sendRequest<TGetIngredientsDto>(url);
}

export async function sendOrderRequest(
	params: TSendOrderArgs
): Promise<TSendOrderDto> {
	const url: string = ORDERS_ENPOINT;
	const body: string = JSON.stringify(params);
	return sendRequest<TSendOrderDto>(url, HTTPMethods.POST, body);
}
