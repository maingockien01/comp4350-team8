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
