import { postRequest } from "./corsProxyService";
import { useStudentInfoStore, type StudentInfo } from "@/stores/studentInfo";
import {
	setLocalStorage,
	setSessionStorage,
	getLocalStorage,
	clearLocalStorage,
	clearSessionStorage,
    isExpired,
	type CachedStudentInfo
} from "./storages";

export function relogin() {
    if (isExpired()) {
        clearSessionStorage();
        logout();
        return;
    }
	const studentInfo = useStudentInfoStore();
	const cachedStudentInfo: CachedStudentInfo | null = getLocalStorage();

	if (cachedStudentInfo) {
		studentInfo.$patch({
			ident: cachedStudentInfo.ident,
			token: cachedStudentInfo.token,
			firstName: cachedStudentInfo.firstName,
			lastName: cachedStudentInfo.lastName,
			studentId: cachedStudentInfo.ident.substring(
				1,
				cachedStudentInfo.ident.length - 1
			)
		});
		studentInfo.fetchAllInfo().then(() => ({}));
	}

    if (import.meta.env.DEV) {
        setTimeout(() => {
            studentInfo.log();
        }, 1000)
    }
}

export async function login(ident: string, pass: string) {
	const studentInfo = useStudentInfoStore();
	if (import.meta.env.DEV) {
		console.time("Login process");
	}
	const result = await postRequest("/auth/login", {
		ident,
		pass: pass,
		uid: ident
	});

	// store student information
	studentInfo.setStudentInfo(result.body as StudentInfo);

	// store student information in local storage
	setLocalStorage(
		result.body.firstName,
		result.body.lastName,
		ident,
		result.body.token
	);
	// store expire time in session storage
	setSessionStorage(result.body.expire);
	if (import.meta.env.DEV) {
		console.log("Logged in!");
		console.time("Fetch information time");
	}
	// fetch all information
	await studentInfo.fetchAllInfo();
	if (import.meta.env.DEV) {
		console.timeEnd("Fetch information time");
		console.timeEnd("Login process");
	}
}

export function logout() {
	const studentInfo = useStudentInfoStore();

	studentInfo.$reset();
	clearLocalStorage();
	clearSessionStorage();
}
