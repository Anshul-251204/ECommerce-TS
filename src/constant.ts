 export let accessTokenOptions = {
		expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
		httpOnly: true,
		secure: true,
 };
export let refreshTokenOptions = {
	expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
	httpOnly: true,
	secure: true,
};
