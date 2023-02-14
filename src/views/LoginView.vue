<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/auth";
import logo from "@/assets/spaggiari_logo.png"

const router = useRouter();
const userIdentifier = ref("");
const password = ref("");

async function submit() {
	try {
		await login(userIdentifier.value, password.value);
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
        <v-container>
            <h1 class="text-center">ClasseViva Studenti</h1>
        </v-container>
		<v-card class="login-card">
            <v-img :src="logo">
                
            </v-img>
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

.accent {
	background: var(--accent-color);
}

.login-wrapper {
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    color: white;
}

.login-card {
	background: #1c1c1c;
	padding: 20px;
	width: 50%;
    max-width: 500px;
	text-align: center;
}
</style>
