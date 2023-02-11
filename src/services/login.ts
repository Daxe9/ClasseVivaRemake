import { postRequest } from "./corsProxyService";
import { useStudentInfoStore, type StudentInfo } from "@/stores/studentInfo";
import { setLocalStorage, setSessionStorage } from "./storages";

export function relogin() {}

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
	await studentInfo.fetchAllInfo();
	if (import.meta.env.DEV) {
		console.timeEnd("Fetch information time");
		console.timeEnd("Login process");
	}
}
