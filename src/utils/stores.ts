import { writable, get } from "svelte/store";
import isAuthenticated from "../apis/authentication/IsAuthenticated";
import type { AlertType, IAuthStore, NotifacationType, UserType } from "./types";
import User from "../apis/users"

function createAuthStore() {
	const store = writable<IAuthStore>({});
	const { subscribe, update } = store;

	isAuthenticated().then((res) => {
		if (res && res.accessToken && res.refreshToken) {
			updateTokens(res.accessToken, res.refreshToken);
		} else {
			return update((s) => {
				s.access_token = undefined;
				s.refresh_token = undefined;
				return s;
			});
		}
	});

	function removeSession(){
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");

		// return update((s) => {            
		// 	s.access_token = undefined;
		// 	s.refresh_token = undefined;
		// 	return s;
		// });
	};

	function updateTokens(accessToken: string, refreshToken: string): void {
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);

        if (accessToken) {
			if (get(userStore) === undefined) {
				User.profile().then((data) => {
                    userStore.set({
                        id: data.id,
						first_name: data.first_name,
						last_name: data.last_name,
						email: data.email,
						full_name: data.full_name,
                    })
                });
            };
        };

		return update((s) => {            
			s.access_token = accessToken;
			s.refresh_token = refreshToken;
			return s;
		});
	}

	return {
		subscribe,
		removeSession,
		updateTokens,
		isAuth(): boolean {
            const { access_token, refresh_token } = get(store);
			return !!access_token && !!refresh_token;
		}
	};
};

export const authStore = createAuthStore();
export const userStore = writable<UserType>({});
export const notifacationStore = writable<NotifacationType>({});
export const alertStore = writable<AlertType>({});
