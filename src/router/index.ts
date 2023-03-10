//@ts-nocheck
import { createRouter, createWebHistory } from "vue-router";
import { useStudentInfoStore } from "@/stores/studentInfo";
import LoginView from "@/views/LoginView.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: LoginView
		},
		{
			path: "/",
			name: "register",
			component: Register,
			children: [
				{
					path: "/absences",
					name: "absences",
					component: () => import("../views/AbsencesView.vue")
				},
				{
					path: "/profile",
					name: "profile",
					component: () => import("../views/ProfileView.vue")
				},
				{
					path: "/grades",
					name: "grades",
					component: () => import("../views/GradesView.vue")
				},
				{
					path: "/homework",
					name: "homework",
					component: () => import("../views/HomeworkView.vue")
				},
				{
					path: "/documents",
					name: "documents",
					component: () => import("../views/DocumentsView.vue")
				},
				{
					path: "/events",
					name: "events",
					component: () => import("../views/EventsView.vue")
				},
				{
					path: "/lessons",
					name: "lessons",
					component: () => import("../views/LessonsView.vue")
				},
				{
					path: "/notes",
					name: "notes",
					component: () => import("../views/NotesView.vue")
				},
				{
					path: "/overview",
					name: "overview",
					component: () => import("../views/HomeView.vue")
				}
			]
		}
	]
});

router.beforeEach((to, _, next) => {
	const studentInfoStore = useStudentInfoStore();

	// if the user is logged in and tries to access the login page, redirect to overview page
	if (to.name === "login" && studentInfoStore.token) {
		return next({ name: "overview" });
	}

	// if the user is not logged in and tries to access a page other than login, redirect to login page
	if (to.name !== "login" && !studentInfoStore.token) {
		return next({ name: "login" });
	}
	next();
});

export default router;
