import { defineStore } from "pinia";

interface Session {
	isLoggedIn: boolean;
	devToken: string | null;
	userToken: string | null;
}

export const useSessionStore = defineStore("session", {
	state: () => ({
		session: {
			isLoggedIn: false,
			devToken: null,
			userToken: null
		} as Session
	}),
	actions: {
		logout(): void {
			this.session.isLoggedIn = false;
			this.session.devToken = null;
			this.session.userToken = null;
		}
	}
});
