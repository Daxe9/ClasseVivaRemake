// TODO: more abstraction
import { defineStore } from "pinia";
import { getRequest } from "../services/corsProxyService";
import type {
	Lesson,
	Absence,
	Grade,
	Subject,
    Agenda
} from "@/types/studentInfoTypes";

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
    grades: null | Grade;
    absences: null | Absence;
    lessons: null | Lesson,
    notes: null | Record<string, any>;
    agenda: null | Agenda;
    didactics: null | any;
    subjects: null | Subject;
}

// rest/v1/students/{studentId}/agenda/all/{begin}/{end}
export const useStudentInfoStore = defineStore("studentInfo", {
	state: (): StudentInfo => ({
		firstName: "",
		lastName: "",
		ident: "",
		token: "",
		expire: "",
		release: "",
		studentId: "",
		showPwdChangeReminder: false,
		grades: null,
		absences: null,
		didactics: null,
		lessons: null,
		notes: null,
		agenda: null,
		subjects: null
	}),
	getters: {
		fullName(): string {
			return `${this.firstName} ${this.lastName}`;
		}
	},
	actions: {
		log() {
			console.log(this.grades);
			console.log(this.absences);
			console.log(this.lessons);
			console.log(this.notes);
			console.log(this.agenda);
			console.log(this.subjects);
		},
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
		},
		async fetchAllInfo() {
			// TODO: add date range handlering

			const today = new Date();
			const sevenDaysAgo = new Date(today);
			sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
			const nextSevenDays = new Date(today);
			nextSevenDays.setDate(nextSevenDays.getDate() + 2);
			const monthAgo = new Date(today);
			monthAgo.setMonth(monthAgo.getMonth() - 1);
			// get date of next month ago
			const nextMonthAgo = new Date(today);
			nextMonthAgo.setMonth(nextMonthAgo.getMonth() + 1);

			const getAbsences = async () => {
				this.absences = await this.getAbsences();
			};
			const getGrades = async () => {
				this.grades = await this.getGrades();
			};
			const getNotes = async () => {
				this.notes = await this.getNotes();
			};
			const getSubjects = async () => {
				this.subjects = await this.getSubjects();
			};
			const getLessons = async () => {
				this.lessons = await this.getLessons(
					sevenDaysAgo,
					nextSevenDays
				);
			};
			const getAgenda = async () => {
				this.agenda = await this.getAgenda(monthAgo, nextMonthAgo);
			};

			await Promise.all([
				getAbsences(),
				getGrades(),
				getNotes(),
				getLessons(),
				getAgenda(),
				getSubjects()
			]);
		},
		async getAbsences() {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}
			const result = await getRequest(
				`/students/${this.studentId}/absences/details`,
				{
					"z-auth-token": this.token
				}
			);
			return result.body;
		},
		async getGrades() {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}
			const result = await getRequest(
				`/students/${this.studentId}/grades`,
				{
					"z-auth-token": this.token
				}
			);

			return result.body;
		},
		// i dont know what are didactics
		async getDidactics() {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}
			return await getRequest(`/students/${this.studentId}/didactics`, {
				"z-auth-token": this.token
			});
		},
		async getLessons(start?: Date, end?: Date) {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}
			let uri = `/students/${this.studentId}/lessons/`;

			if (start) {
				uri += getDateString(start);
				uri += "/";
			}
			if (end) {
				uri += getDateString(end);
				uri += "/";
			}

			const result = await getRequest(uri, {
				"z-auth-token": this.token
			});
			return result.body;
		},
		async getNotes() {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}

			const result = await getRequest(
				`/students/${this.studentId}/notes/all`,
				{
					"z-auth-token": this.token
				}
			);
			return result.body;
		},
		async getAgenda(start: Date, end: Date) {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}
			let uri = `/students/${this.studentId}/agenda/all/`;

			// check whether start and end are set
			if (start) {
				uri += getDateString(start);
				uri += "/";
			}
			if (end) {
				uri += getDateString(end);
				uri += "/";
			}
			const result = await getRequest(uri, {
				"z-auth-token": this.token
			});
			return result.body;
		},
		async getSubjects() {
			if (!this.studentId || !this.token) {
				throw new Error("studentId or token is not set");
			}
			const result = await getRequest(
				`/students/${this.studentId}/subjects`,
				{
					"z-auth-token": this.token
				}
			);
			return result.body;
		}
	}
});

// this function returns YYYYMMDD form date
// e.g. 20210101
function getDateString(date: Date) {
	let dateString: string = date.getFullYear().toString();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	if (month < 10) {
		dateString += "0";
	}
	dateString += month;
	if (day < 10) {
		dateString += "0";
	}
	dateString += day;
	return dateString;
}
