<script setup lang="ts">
import { ref } from "vue";
/* import CVLogo from "../assets/spaggiari_logo.png"; */
import { postRequest } from "../services/corsProxyService";
import { useStudentInfoStore, type StudentInfo } from "../stores/studentInfo";
import { useRouter } from "vue-router";
import { setLocalStorage, setSessionStorage } from "@/services/storages";

const router = useRouter();
const userIdentifier = ref("");
const password = ref("");
const studentInfo = useStudentInfoStore();

defineProps({
	email: String,
	password: String
});

async function submit() {
	try {
		if (import.meta.env.DEV) {
			console.time("Login process");
		}
		const result = await postRequest("/auth/login", {
			ident: userIdentifier.value,
			uid: userIdentifier.value,
			pass: password.value
		});

		// store student information
		studentInfo.setStudentInfo(result.body as StudentInfo);

		// store student information in local storage
		setLocalStorage(
			result.body.firstName,
			result.body.lastName,
			userIdentifier.value,
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
		await router.push({ name: "overview" });
	} catch (error: any) {
		// TODO: handle error
		if (import.meta.env.DEV) {
			console.log("Failed to log in!");
			console.error(error);
		}
	}
}
</script>

<template>
	<div class="login-wrapper">
		<v-card class="login-card">
			<v-card-title class="login-card-title">
				<h3>ClasseViva</h3>
			</v-card-title>
			<!-- <img :src="CVLogo" width="550" /> -->
			<form @submit.prevent="submit">
				<v-text-field
					v-model="userIdentifier"
					label="Username / E-mail"
				></v-text-field>

				<v-text-field
					v-model="password"
					type="password"
					label="Password"
				></v-text-field>

				<v-btn
					prepend-icon="mdi-login"
					variant="tonal"
					color="blue"
					type="submit"
					size="large"
				>
					Login
				</v-btn>
			</form>
		</v-card>
	</div>
</template>

<style scoped>
@import "../assets/main.css";

h1 {
	font-size: 3.5rem;
	text-align: center;
}

.accent {
	background: var(--accent-color);
}

.login-wrapper {
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.login-card {
	background: #1c1c1c;
	padding: 20px;
	margin: auto;
	width: 30%;
	text-align: center;
}
</style>
