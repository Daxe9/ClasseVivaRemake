export interface CachedStudentInfo {
	firstName: string;
	lastName: string;
	ident: string;
	token: string;
}
export function setLocalStorage(
	firstName: string,
	lastName: string,
	ident: string,
	token: string
) {
	const studentInfo = {
		firstName: firstName,
		lastName: lastName,
		ident: ident,
		token: token
	};

	localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
}

export function getLocalStorage(): CachedStudentInfo | null {
	const studentInfo: string | null = localStorage.getItem("studentInfo");
	if (studentInfo) {
		return JSON.parse(studentInfo);
	}
	return null;
}

export function clearLocalStorage() {
	localStorage.removeItem("studentInfo");
}

export function setSessionStorage(expire: string) {
	sessionStorage.setItem("expire", expire);
}

export function clearSessionStorage() {
	sessionStorage.removeItem("expire");
}

// check if the session is still valid
export function isExpired(): boolean {
	const expire: string | null = sessionStorage.getItem("expire");
	if (expire) {
		const result: boolean = Date.now() > new Date(expire).getTime();

		// if the session is expired, clear the session storage
		if (result) {
			sessionStorage.removeItem("expire");
		}

		return result;
	}
	return true;
}
