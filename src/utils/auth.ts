import { Nullable } from './types';

type CookieProps = {
	[key: string]: string | number | boolean | Date | undefined;
	expires?: number | Date | string;
	path?: string;
	domain?: string;
	secure?: boolean;
	'max-age'?: number;
	samesite?: 'Strict' | 'Lax' | 'None';
};

export function getCookie(name: string): string | undefined {
	const matches: Nullable<RegExpMatchArray> = document.cookie.match(
		new RegExp(
			'(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + '=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
	name: string,
	value: Nullable<string | number | boolean>,
	props: CookieProps = {}
): void {
	let expires: number | Date | string | undefined = props.expires;
	if (typeof expires == 'number' && expires) {
		const now: Date = new Date();
		now.setTime(now.getTime() + expires * 1000);
		expires = props.expires = now;
	}
	if (expires instanceof Date) {
		props.expires = expires.toUTCString();
	}
	value = value !== null ? encodeURIComponent(value) : null;
	let updatedCookie: string = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue: Nullable<string | number | boolean | undefined | Date> =
			props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
	setCookie(name, null, { expires: -1 });
}

export function getToken(token: string = ''): string {
	return token.split('Bearer ')[1];
}
