import { useSessionStore } from "../stores/session";
import axios from "axios";

export default class ClasseVivaAPI {
	apiUrl = "https://web.spaggiari.eu/rest/v1";
	devApiKey = "+zorro+";
	sessionStore = useSessionStore();

	constructor() {}

	async getProfile() {}

	async login(username: String, password: String): Promise<any> {
		try {
			const loginResult = await axios.post(
				`${this.apiUrl}/auth/login`,
				{
					ident: username,
					uid: username,
					pass: password
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Z-Dev-Apikey": this.devApiKey,
						"User-Agent": "zorro/1.0"
					}
				}
			);
			return loginResult;
		} catch (error: any) {
			return Promise.reject(error.response.data);
		}
	}

	getFinalGrades() {}

	getDocuments() {}

	getNotes() {}

	getLessons() {}

	getHomework() {}

	getGrades() {}

	getAbsences() {}

	logout() {
		this.sessionStore.logout();
	}
}
