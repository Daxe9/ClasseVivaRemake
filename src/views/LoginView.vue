<script setup lang="ts">
import { ref } from "vue";
import CVLogo from "../assets/spaggiari_logo.png";
import { postRequest } from "../services/corsProxyService";

const userIdentifier = ref("");
const password = ref("");

defineProps({
	email: String,
	password: String,
	CVLogo: HTMLImageElement
});


async function submit() {
	try {
		await postRequest("/auth/login", {
			ident: userIdentifier.value,
			uid: userIdentifier.value,
			pass: password.value
		});
        // TODO: handle redirect
        if (import.meta.env.DEV) {
            console.log("Logged in!");
        }
	} catch (error: any) {
        // TODO: handle error
        if (import.meta.env.DEV) {
            console.log("Failed to log in!");
            console.error(error)
        }
	} 

}

</script>

<template>
	<div class="login-wrapper">
		<v-card class="login-card">
			<img :src="CVLogo" width="550" />
			<form @submit.prevent="submit">
				<v-text-field v-model="userIdentifier" label="Username / E-mail"></v-text-field>

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
