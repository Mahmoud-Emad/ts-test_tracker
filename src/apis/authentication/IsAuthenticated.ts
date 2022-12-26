import Authentication from "./Authentication";
import JWTPars from "./JWTPars";
import type { IAuthStore, TokensType } from "../../utils/types";


export default async function isAuthenticated() {
	/// This is a helper function that returns the tokens if the user is authenticated. refreshes the token if expired
	let EXP_access: number;
	let EXP_refresh: number;
	let authStore: IAuthStore;

	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");

	if (refreshToken) {
		EXP_access = accessToken ? JWTPars(accessToken).exp : null;
		EXP_refresh = JWTPars(refreshToken).exp;

		if (accessToken) {
			if (Date.now() >= EXP_access * 1000) {
				localStorage.removeItem("accessToken");
				return false;
			} else if (Date.now() < EXP_refresh * 1000) {
				return { accessToken: accessToken, refreshToken: refreshToken };
			}
		}

		if (Date.now() < EXP_refresh * 1000) {
			const refreshData: TokensType = await (await Authentication.refresh(refreshToken)).data;
			return (authStore = {
				access_token: refreshData.access_token,
				refresh_token: refreshData.refresh_token,
			});
		}

		localStorage.removeItem("refreshToken");
		return (authStore = { access_token: undefined, refresh_token: undefined });
	}
}