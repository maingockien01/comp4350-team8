export function getUidFromCookie() {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith('uid=')) {
			return cookie.substring('uid='.length, cookie.length);
		}
	}
	return undefined;
}

export function getUsernameFromCookie() {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith('username=')) {
			return cookie.substring('username='.length, cookie.length);
		}
	}
	return undefined;
}

export function getTokenFromCookie() {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith('access_token=')) {
			return cookie.substring('access_token='.length, cookie.length);
		}
	}
	return undefined;
}
