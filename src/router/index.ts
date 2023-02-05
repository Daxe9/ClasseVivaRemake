//@ts-nocheck
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/LoginView.vue")
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue")
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
		}
	]
});

export default router;
