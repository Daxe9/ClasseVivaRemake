import { defineStore } from "pinia";

export interface StudentInfo {
	firstName: string;
	lastName: string;
	ident: string;
	token: string;
	expire: string;
	release: string;
	studentId: string;
	// what the hell is this?
	showPwdChangeReminder: boolean;
}

export const useStudentInfoStore = defineStore("studentInfo", {
	state: () => ({
		firstName: "",
		lastName: "",
		ident: "",
		token: "",
		expire: "",
		release: "",
		studentId: "",
		showPwdChangeReminder: false
	}),
	getters: {
		fullName(): string {
			return `${this.firstName} ${this.lastName}`;
		}
	},
	actions: {
		setStudentInfo(studentInfo: StudentInfo) {
			this.firstName = studentInfo.firstName;
			this.lastName = studentInfo.lastName;
			this.ident = studentInfo.ident;
			this.token = studentInfo.token;
			this.expire = studentInfo.expire;
			this.release = studentInfo.release;
			this.showPwdChangeReminder = studentInfo.showPwdChangeReminder;

			// process studentId by removing the first and last character of ident
			this.studentId = this.ident.substring(1, this.ident.length - 1);
		},
		setIdent(ident: string) {
			this.ident = ident;
			this.studentId = this.ident.substring(1, this.ident.length - 1);
		},
		setToken(token: string) {
			this.token = token;
		}
	}
});
